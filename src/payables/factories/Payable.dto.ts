import { PaymentOption } from 'src/transaction/util/PayamentOption.enum';

export interface PayableDto {
  clientId: string;
  amount: number;
  paymentOption: PaymentOption;
}
