import { ChildEntity } from 'typeorm';
import { Payable } from './Payable.entity';
import { Status } from '../util/PayableStatus.enum';
import { dateFormatter } from './util/DateFormatter';

@ChildEntity()
export class CreditPayable extends Payable {
  constructor() {
    super();
    this.setFee();
    this.setStatus();
    this.setPaymentDate();
  }
  protected setFee(): void {
    this.fee = 5 / 100;
  }
  protected setStatus(): void {
    this.status = Status.WAITING_FUNDS;
  }
  protected setPaymentDate(): void {
    const paymentDate = new Date();
    paymentDate.setDate(paymentDate.getDate() + 30);
    this.paymentDate = paymentDate;
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
}
