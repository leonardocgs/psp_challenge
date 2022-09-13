export class CreateTransactionDto {
  value: number;
  paymentOption: string;
  cardHolderNamer: number;
  cardExpiration: Date;
  cardVerificationCode: number;
}
