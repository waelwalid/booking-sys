/* eslint-disable import/no-cycle */
import { StatusType } from '../entities/Order';
import { IOrderState } from './IOrderState';
import { OrderStateMachine } from './OrderStateMachine';

export class CancelledState implements IOrderState {
  public orderStateMachine: OrderStateMachine;

  public STATUS = StatusType.CANCELLED;

  constructor(orderStateMachine: OrderStateMachine) {
    this.orderStateMachine = orderStateMachine;
  }
  // TODO: Any upcoming business needs product/data-team

  public cancelOrder() {
    throw new Error('Order Already cancelled!');
  }

  public confirmPayment() {
    throw new Error('Order cannot be Success/Payment while it is Cancelled!');
  }

  public expiredOrder() {
    throw new Error('Order cannot be Expired while it is Cancelled!');
  }

  public pendingOrder() {
    throw new Error('Order cannot be Pending while it is Cancelled!');
  }

  public failedOrder() {
    throw new Error('Order cannot be Failed while it is Cancelled!');
  }
}
