/* eslint-disable import/no-cycle */
import {
  // BeforeInsert,
  Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { Service } from 'typedi';
import Model from './Model';
import { Location } from './Location';
import { Line } from './Line';
import { SeatAvailability } from './SeatAvailability';

export enum StatusType {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}
@Service()
@Entity('orders')
export class Order extends Model {
  @Column()
  public line_id: string;

  @ManyToOne(() => Line)
  @JoinColumn({ name: 'line_id' })
  public line?: Location;

  @OneToMany(() => SeatAvailability, (seat) => seat.order)
  public seat?: [];

  @Column()
  public customer_email: string;

  @Column({ type: 'enum', enum: StatusType, default: StatusType.PENDING })
  public status: StatusType;

  @Column()
  public voucher_amount: number;

  @Column()
  public amount: number;
}
