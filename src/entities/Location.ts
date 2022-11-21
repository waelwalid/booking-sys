import { Column, Entity } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import Model from './Model';

@Entity('locations')
export class Location extends Model {
  @IsNotEmpty()
  @IsString()
  @Column()
  public name: string;

  @IsString()
  @Column()
  public description: string;
}
