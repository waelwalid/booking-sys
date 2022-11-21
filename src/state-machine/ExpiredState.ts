/* eslint-disable import/no-cycle */
import { StatusType } from '../entities/Order';
import { IOrderState } from './IOrderState';
import { OrderStateMachine } from './OrderStateMachine';

export class ExpiredState implements IOrderState {
  public orderStateMachine: OrderStateMachine;

  public STATUS = StatusType.EXPIRED;

  constructor(orderStateMachine: OrderStateMachine) {
    this.orderStateMachine = orderStateMachine;
  }
  // TODO: Any upcoming business needs product/data-team

  public cancelOrder() {
    throw new Error('Order cannot be Cancelled while it is Expired!');
  }

  public confirmPayment() {
    throw new Error('Order Expired!');
  }

  public expiredOrder() {
    throw new Error('Order Already expired!');
  }

  public pendingOrder() {
    throw new Error('Order cannot be Pending while it is Expired!');
  }

  public failedOrder() {
    throw new Error('Order cannot be Failed while it is Expired!');
  }
}
