import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../util/PayableStatus.enum';

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
  protected status: Status;
  @Column()
  protected paymentDate: Date;
  setAmount(amount: number): void {
    this.amount = amount * (1 - this.fee);
  }
  protected abstract setFee(): void;
  protected abstract setStatus(): void;
  protected abstract setPaymentDate(): void;
}
