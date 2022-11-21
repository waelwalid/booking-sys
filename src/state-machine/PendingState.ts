/* eslint-disable import/no-cycle */
import { StatusType } from '../entities/Order';
import { IOrderState } from './IOrderState';
import { OrderStateMachine } from './OrderStateMachine';

export class PendingState implements IOrderState {
  public orderStateMachine: OrderStateMachine;

  public STATUS = StatusType.PENDING;

  constructor(orderStateMachine: OrderStateMachine) {
    this.orderStateMachine = orderStateMachine;
  }

  public cancelOrder() {
    console.log('Order transition from PENDING -> CANCELLED');
    this.orderStateMachine.setState(this.orderStateMachine.cancelledOrderState);
  }

  public confirmPayment() {
    console.log(`Order transition from PENDING -> SUCCESS ${JSON.stringify(this.orderStateMachine.order.id)}`);
    this.orderStateMachine.setState(this.orderStateMachine.successOrderState);
  }

  public expiredOrder() {
    console.log('Order transition from PENDING -> EXPIRED');
    this.orderStateMachine.setState(this.orderStateMachine.expiredOrderState);
  }

  public pendingOrder() {
    throw new Error('Order is already pending!');
  }

  public failedOrder() {
    throw new Error('Order cannot be failed while it is Pending');
  }
}
