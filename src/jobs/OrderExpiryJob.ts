import { Container, Service } from 'typedi';
import { OrderService } from '../services/OrderService';
import { IJob } from './IJob';

@Service()
export class OrderExpiryJob implements IJob {
  private readonly orderService: OrderService;

  public readonly jobTime;

  constructor() {
    this.orderService = Container.get(OrderService);

    this.jobTime = process.env.ORDER_LIFE_JOB;
  }

  async execute() {
    this.orderService.handleOrderLifeSpan();
  }
}
