import { Service } from 'typedi';
import {
  Between,
  FindManyOptions,
  In,
} from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import moment from 'moment/moment';
import _ from 'lodash';
import { Order, StatusType } from '../entities/Order';
import { AppDataSource } from '../utility/data-source';
import { OrderCreate } from '../validation/OrderCreate';
import { LineService } from './LineService';
import { SeatAvailability } from './SeatAvailability';
import { SeatAvailability as SeatAvailabilityEntity } from '../entities/SeatAvailability';
import { OrderPaymentConfirm } from '../validation/OrderPaymentConfirm';
import { OrderStateMachine } from '../state-machine/OrderStateMachine';

@Service()
export class OrderService {
  private readonly repo: Repository<Order>;

  constructor(
    private readonly seatAvailability: SeatAvailability,
    private readonly lineService: LineService,
    private readonly stateMachine: OrderStateMachine,
  ) {
    this.repo = AppDataSource.getRepository(Order);
  }

  public async find(criteria: object) {
    return this.repo.find(criteria as FindManyOptions);
  }

  public async findOne(criteria: object) {
    const options = {
      where: criteria,
      relations: { line: true, seat: true },
    } as FindManyOptions;
    return this.repo.find(options);
  }

  public async store(payload: OrderCreate) {
    // FIND LINE
    const line = await this.lineService.findOne({ where: { id: payload.line_id } });
    if (!line) throw Error('Requested line does not exist!');

    // Check seat availability | it should throw error if there are any unavailable seat.
    await this.seatAvailability.checkAvailability(payload.seats, line.bus_id);

    // All Good!
    // Create DB Transaction (Order/Seats)
    // Create An Order
    const order = new Order();
    const discount = (this.hasVoucher(payload.seats)) ? line.price * 0.20 : 0;
    order.line_id = payload.line_id;
    order.customer_email = payload.customer_email;
    order.voucher_amount = discount;
    order.amount = line.price - discount;

    // Using OrderStateMachine
    const stateMachine = new OrderStateMachine(order);

    // SeatsAvailability
    const orderSeats:SeatAvailabilityEntity[] = [];

    let savedOrder :any;
    // Create Order/Seats
    // Start Database Transaction
    const queryRunner = AppDataSource.createQueryRunner();
    try {
      queryRunner.startTransaction();
      savedOrder = await stateMachine.saveState();
      payload.seats.forEach((seat_code) => {
        orderSeats.push(
          SeatAvailabilityEntity.create({
            seat_id: seat_code,
            bus_id: line.bus_id,
            order_id: savedOrder.id,
          }),
        );
      });
      await queryRunner.manager.save(orderSeats);

      // commit transaction now:
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
    const result = this.repo.findOne({ where: { id: savedOrder.id }, relations: ['line', 'seat'] });
    return result;
  }

  async confirmPayment(payload: OrderPaymentConfirm) {
    /** Should be responsible for Payment validation over the statemachine in the real systems! */
    const order = await this.repo.findOne({
      where: {
        id: payload.order_id,
      },
      relations: {
        line: true,
        seat: true,
      },
    });

    if (!order) throw new Error('Order Not Found');

    // Init OrderStateMachine
    const stateMachine = new OrderStateMachine(order);

    // Check If Expired
    await this.expiredOrder(stateMachine);

    // State Machine confirm Payment
    stateMachine.getState().confirmPayment();
    const confirmedOrder = await stateMachine.saveState();

    return confirmedOrder;
  }

  hasVoucher(seats: string[]) {
    if (seats.length >= 5) return true;
    return false;
  }

  async expiredOrder(stateMachine: OrderStateMachine): Promise<void> {
    const orderDateTime = moment(stateMachine.order.created_at);
    const currentDateTime = moment();
    const { order } = stateMachine;
    const diff = currentDateTime.diff(orderDateTime, 'minutes');

    // TRANSACTION To expire and release seats
    if (diff > 2) {
      // Set order status to expired
      stateMachine.getState().expiredOrder();

      const queryRunner = AppDataSource.createQueryRunner();
      try {
        queryRunner.startTransaction();
        await stateMachine.saveState();
        await this.seatAvailability.delete(order.id);
        // commit transaction now:
        await queryRunner.commitTransaction();
      } catch (err) {
        // since we have errors let's rollback changes we made
        await queryRunner.rollbackTransaction();
      } finally {
        // you need to release query runner which is manually created:
        await queryRunner.release();
      }
    }
  }

  async handleOrderLifeSpan() {
    const format = 'Y-M-D H:m:s';
    const currentTime = moment().format(format);
    const beforeCurrent = moment().subtract(process.env.ORDER_LIFE_SPAN, 'minutes').format(format);

    const orders = await this.repo.find({
      where: {
        created_at: Between(
          beforeCurrent,
          currentTime,
        ),
      },
    } as FindManyOptions);

    const orderIds = _.map(orders, 'id');

    const queryRunner = AppDataSource.createQueryRunner();
    const queryBuilder = AppDataSource.createQueryBuilder();
    try {
      queryRunner.startTransaction();

      // Set order expired status
      queryBuilder.update(Order).set({
        status: StatusType.EXPIRED,
      }).where({
        created_at: Between(
          beforeCurrent,
          currentTime,
        ),
      }).execute();

      // Release Seats
      queryBuilder
        .from(SeatAvailabilityEntity, 'seat_availability')
        // .leftJoin('orders', 'order', 'seat_availability.order_id = order.id')
        // .where(`order.status = '${StatusType.EXPIRED}'`)
        .delete()
        .where({
          order_id: In(orderIds),
        })
        .execute();

      // commit transaction now:
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  }
}
