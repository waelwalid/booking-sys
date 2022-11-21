/* eslint-disable import/no-cycle */
import { StatusType } from '../entities/Order';
import { IOrderState } from './IOrderState';
import { OrderStateMachine } from './OrderStateMachine';

export class FailedState implements IOrderState {
  public orderStateMachine: OrderStateMachine;

  public STATUS = StatusType.FAILED;

  constructor(orderStateMachine: OrderStateMachine) {
    this.orderStateMachine = orderStateMachine;
  }
  // TODO: Any upcoming business needs product/data-team

  public cancelOrder() {
    throw new Error('Order cannot be Cancelled while it is Failed!');
  }

  public confirmPayment() {
    throw new Error('Order cannot be Success/payment while it is Failed!');
  }

  public expiredOrder() {
    throw new Error('Order cannot be Expired while it is Failed!');
  }

  public pendingOrder() {
    throw new Error('Order cannot be Pending while it is Failed!');
  }

  public failedOrder() {
    throw new Error('Order already Failed!');
  }
}
