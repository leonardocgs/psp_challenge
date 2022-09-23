import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { PaymentOption } from '../util/PayamentOption.enum';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  clientId: string;
  @Column('real')
  amount: number;
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

  constructor(createTransaction?: CreateTransactionDto) {
    this.clientId = createTransaction?.clientId;
    this.amount = createTransaction?.amount;
    this.paymentOption = createTransaction?.paymentOption;
    this.cardHolderName = createTransaction?.cardHolderName;
    this.cardExpiration = createTransaction?.cardExpiration;
    this.cardVerificationCode = createTransaction?.cardVerificationCode;
    this.cardNumber = this.transformToSecureCardNumber(
      createTransaction?.cardNumber,
    );
    this.transactionDescription = createTransaction?.transactionDescription;
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
