/* eslint-disable import/no-cycle */
import { Service } from 'typedi';
import { IOrderState } from './IOrderState';
import { SuccessState } from './SuccessState';
import { PendingState } from './PendingState';
import { ExpiredState } from './ExpiredState';
import { FailedState } from './FailedState';
import { CancelledState } from './CancelledState';
import { Order, StatusType } from '../entities/Order';

@Service()
export class OrderStateMachine {
  public currentState: IOrderState;

  public pendingOrderState: IOrderState;

  public successOrderState: IOrderState;

  public expiredOrderState: IOrderState;

  public failedOrderState: IOrderState;

  public cancelledOrderState: IOrderState;

  public order: Order;

  public statusMapping;

  constructor(order: Order) {
    this.pendingOrderState = new PendingState(this);
    this.successOrderState = new SuccessState(this);
    this.expiredOrderState = new ExpiredState(this);
    this.failedOrderState = new FailedState(this);
    this.cancelledOrderState = new CancelledState(this);
    this.order = order;
    this.statusMapping = {
      [StatusType.PENDING]: this.pendingOrderState,
      [StatusType.SUCCESS]: this.successOrderState,
      [StatusType.EXPIRED]: this.expiredOrderState,
      [StatusType.FAILED]: this.failedOrderState,
      [StatusType.CANCELLED]: this.cancelledOrderState,
    };
    // Order default status: PENDING
    const orderStatus = this.statusMapping[this.order.status] ?? this.pendingOrderState;
    this.setState(orderStatus);
  }

  public async setState(state: IOrderState) {
    this.currentState = state;
  }

  public getState(): IOrderState {
    return this.currentState;
  }

  public async saveState() {
    this.order.status = this.getState().STATUS;
    const order = await this.order.save();
    return order;
  }
}
