import {
  JsonController, Get, Res, Post, Patch, Body, Param,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { OrderService } from '../services/OrderService';
import { OrderCreate } from '../validation/OrderCreate';
import { OrderPaymentConfirm } from '../validation/OrderPaymentConfirm';

@JsonController('/api/v1/order')
@Service()
export class OrderController {
  constructor(@Inject() private orderService: OrderService) { }

  @Get('/')
  async index(@Res() response: any) {
    try {
      const orders = await this.orderService.find({});
      return response.send({ data: orders });
    } catch (e) {
      console.log(e);
      return response.send({ message: 'an error accrued!', error: `${e} | ${JSON.stringify(e)}` });
    }
  }

  @Get('/:id')
  async show(@Param('id') id: string, @Res() response: any) {
    try {
      const order = await this.orderService.findOne({ id });
      return response.send({ data: order });
    } catch (e) {
      console.log(e);
      return response.send({ message: 'an error accrued!', error: `${e} | ${JSON.stringify(e)}` });
    }
  }

  @Post('/')
  async store(@Body() body: OrderCreate, @Res() response: any): Promise<any> {
    try {
      const order = await this.orderService.store(body);
      return response.send({ data: order });
    } catch (e) {
      console.log(e);
      return response.send({ message: 'an error accrued!', error: `${e} | ${JSON.stringify(e)}` });
    }
  }

  @Patch('/')
  async update(@Body() body: OrderPaymentConfirm, @Res() response: any) {
    try {
      const order = await this.orderService.confirmPayment(body);
      return response.send({ data: order });
    } catch (e) {
      console.log(e);
      return response.send({ message: 'an error accoured!', error: `${e} | ${JSON.stringify(e)}` });
    }
  }
}
