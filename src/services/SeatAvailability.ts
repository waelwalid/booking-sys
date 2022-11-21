import { Service } from 'typedi';
import {
  Between, FindManyOptions, In,
} from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import * as moment from 'moment';
import { SeatAvailability as SeatAvailabilityEntity } from '../entities/SeatAvailability';
import { AppDataSource } from '../utility/data-source';
// import { AppDataSource } from '../utility/data-source';

@Service()
export class SeatAvailability {
  private readonly seatAvailability: Repository<SeatAvailabilityEntity>;

  constructor() {
    this.seatAvailability = AppDataSource.getRepository(SeatAvailabilityEntity);
  }

  public async checkAvailability(seats: string[], bus_id:string) {
    const today = moment.default();
    // Check seat availability
    const seatCheck = await this.seatAvailability.find({
      where: {
        bus_id,
        seat_id: In(seats),
        created_at: Between(
          today.format('Y-M-D 00:00:00'),
          today.format('Y-M-D 23:59:59'),
        ),
      },
    } as FindManyOptions);
    if (seatCheck.length > 0) { throw new Error(`Seats of ${seatCheck.map((s) => s.seat_id)} not available`); }
    return true;
  }

  public async delete(order_id: string) {
    await this.seatAvailability.delete({ order_id });
  }
}
