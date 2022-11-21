import { StatusType } from '../entities/Order';

export interface IOrderState {
  orderStateMachine: any;
  STATUS: StatusType;
  pendingOrder();
  cancelOrder();
  confirmPayment();
  expiredOrder();
  failedOrder();
}
