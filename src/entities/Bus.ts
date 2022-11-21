import { Column, Entity } from 'typeorm';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import Model from './Model';

@Entity('buses')
export class Bus extends Model {
  @IsNotEmpty()
  @IsString()
  @Column()
  public name: string;

  @IsString()
  @Column()
  public model: string;

  @IsString()
  @Column()
  public brand: string;

  @IsString()
  @MaxLength(8)
  @Column()
  public plate_number: string;
}
