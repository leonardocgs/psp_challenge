import {
  IsEnum,
  IsNumber,
  IsNumberString,
  IsString,
  Matches,
} from 'class-validator';
import { PaymentOption } from '../util/payment-option.enum';

export class CreateTransactionDto {
  @IsNumber()
  value: number;
  @IsEnum(PaymentOption, {
    message:
      'paymentOption must be credit_card or debit_card conforming to the specified constraints',
  })
  paymentOption: PaymentOption;
  @IsString()
  cardHolderName: string;
  @Matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, {
    message: 'cardExpiration must be in the MM/YY format',
  })
  cardExpiration: string;

  @IsNumber()
  cardVerificationCode: number;

  @IsNumberString()
  cardNumber: string;
  @IsString()
  transactionDescription: string;
}
