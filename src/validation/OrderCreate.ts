import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty, IsString,
} from 'class-validator';

export class OrderCreate {
  @IsNotEmpty()
  @IsString()
    line_id: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
    customer_email: string;

  @Transform(({ value }) => {
    const transformed: any[] = [];
    value.forEach((element: string) => {
      /** Validation
      * Duplicates
      * Format (A)
      * Format (number)
      * */
      const seatNumber = parseInt(element.substring(1), 10);
      const seatCode = element.charAt(0);
      if (seatNumber < 1 || seatNumber > 20) throw new Error('Sorry we only have 20 seats! | seat number must be 1-20');
      if (seatCode !== 'A') throw new Error('Seat Code must be: A{num(1-20)}');
      if (transformed.includes(element)) throw new Error('Duplicated seat entries');
      transformed.push(`${seatCode}${seatNumber}`);
    });
    return transformed;
  })
  @IsNotEmpty()
    seats: string[];
}
