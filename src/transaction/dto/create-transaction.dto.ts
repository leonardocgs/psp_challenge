import { IsEnum, IsNumber, isNumber } from 'class-validator';
import { PaymentOption } from '../util/payment-option.enum';

export class CreateTransactionDto {
  @IsNumber()
  value: number;
  @IsEnum(PaymentOption)
  paymentOption: PaymentOption;
  cardHolderNamer: number;
  cardExpiration: Date;
  cardVerificationCode: number;
}
