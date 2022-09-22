import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../util/PayableStatus.enum';
import { dateFormatter } from './util/DateFormatter';

@Entity()
export abstract class Payable {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('decimal')
  protected fee: number;
  @Column('decimal')
  protected amount: number;
  @Column({
    type: 'enum',
    enum: Status,
  })
  status: Status;
  @Column()
  protected paymentDate: Date;
  setAmount(amount: number): void {
    this.amount = amount * (1 - this.fee);
  }
  getFee(): number {
    return this.fee;
  }
  getStatus(): Status {
    return this.status;
  }
  getPaymenteDate(): string {
    return dateFormatter(this.paymentDate);
  }
  getAmount(): number {
    return this.amount;
  }
  protected abstract setPaymentDate(): void;
  protected abstract setFee(): void;
  protected abstract setStatus(): void;
}
