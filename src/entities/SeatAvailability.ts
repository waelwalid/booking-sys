/* eslint-disable import/no-cycle */
import {
  Column, Entity, JoinColumn, ManyToOne, Relation,
} from 'typeorm';
import Model from './Model';
import { Bus } from './Bus';
import { Order } from './Order';

@Entity('seat_availability')
export class SeatAvailability extends Model {
  @Column()
  public seat_id: string;

  @Column()
  public bus_id: string;

  @ManyToOne(() => Bus)
  @JoinColumn({ name: 'bus_id' })
  public bus?: Relation<Bus>;

  @Column()
  public order_id: string;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  public order?: Relation<Order>;
}
