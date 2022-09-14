import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentOption } from '../util/payment-option.enum';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  value: number;
  @Column({
    type: 'enum',
    enum: PaymentOption,
  })
  paymentOption: PaymentOption;
  @Column()
  cardHolderName: string;
  @Column()
  cardExpiration: string;
  @Column()
  cardVerificationCode: number;
  @Column()
  cardNumber: string;
  @Column()
  transactionDescription: string;

  constructor(
    value: number,
    paymentOption: PaymentOption,

    cardHolderName: string,
    cardExpiration: string,
    cardVerificationCode: number,
    cardNumber: string,
    transactionDescription: string,
  ) {
    this.value = value;
    this.paymentOption = paymentOption;
    this.cardHolderName = cardHolderName;
    this.cardExpiration = cardExpiration;
    this.cardVerificationCode = cardVerificationCode;
    this.cardNumber = this.transformToSecureCardNumber(cardNumber);
    this.transactionDescription = transactionDescription;
  }

  private transformToSecureCardNumber(cardNumber: string): string {
    let secureCardNumber: string;
    if (cardNumber) {
      const startIndex = cardNumber.length - 3 - 1;
      const lastIndex = cardNumber.length;
      secureCardNumber = cardNumber.slice(startIndex, lastIndex);
      return secureCardNumber;
    }
    return cardNumber;
  }
}
