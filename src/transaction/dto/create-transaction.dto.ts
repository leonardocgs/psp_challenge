import { IsEnum, IsNumber } from 'class-validator';
import { PaymentOption } from '../util/payment-option.enum';

export class CreateTransactionDto {
  @IsNumber()
  value: number;
  @IsEnum(PaymentOption)
  paymentOption: PaymentOption;

  cardHolderName: string;

  cardExpiration: Date;

  cardVerificationCode: number;

  cardNumber: string;
}
