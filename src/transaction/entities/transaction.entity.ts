import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentOption } from '../util/payment-option.enum';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  value: number;
  @Column({
    type: 'enum',
    enum: PaymentOption,
  })
  paymentOption: PaymentOption;
  @Column()
  cardHolderNamer: string;
  @Column()
  cardExpiration: Date;
  @Column()
  cardVerificationCode: number;
}
