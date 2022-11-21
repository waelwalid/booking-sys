import {
  IsNotEmpty, IsString, IsUUID,
} from 'class-validator';

export class OrderPaymentConfirm {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
    order_id: string;
}
