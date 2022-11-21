import {
  BeforeInsert,
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import config from 'config';
import {
  IsNotEmpty, IsNumber, IsString, Max, Min,
} from 'class-validator';
import Model from './Model';
import { Location } from './Location';
import { Bus } from './Bus';

export enum LineType {
  SHORT_TRIP = 'SHORT_TRIP',
  LONG_TRIP = 'LONG_TRIP',
}

@Entity('lines')
export class Line extends Model {
  @IsNotEmpty()
  @IsString()
  @Column()
  public origin_id: string;

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'origin_id' })
  public origin?: Location;

  @IsNotEmpty()
  @IsString()
  @Column()
  public destination_id: string;

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'destination_id' })
  public destination?: Location;

  @IsNotEmpty()
  @IsString()
  @Column()
  public bus_id: string;

  @ManyToOne(() => Bus)
  @JoinColumn({ name: 'bus_id' })
  public bus?: Bus;

  @IsNotEmpty()
  @IsNumber()
  @Min(90)
  @Max(150)
  @Column()
  public distance: number;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'enum', enum: LineType })
  public type: LineType;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  public price: number;

  @BeforeInsert()
  async distanceCheck() {
    this.type = this.distance < parseInt(config.get('long_trip_distance'), 10)
      ? LineType.SHORT_TRIP : LineType.LONG_TRIP;
  }
}
