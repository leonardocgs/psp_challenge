import { ChildEntity } from 'typeorm';
import { Payable } from './Payable.entity';
import { Status } from '../util/PayableStatus.enum';

@ChildEntity()
export class DebitPayable extends Payable {
  constructor() {
    super();
    this.setFee();
    this.setStatus();
    this.setPaymentDate();
  }
  protected setFee(): void {
    this.fee = 3 / 100;
  }
  protected setStatus(): void {
    this.status = Status.PAID;
  }
  protected setPaymentDate(): void {
    const paymentDate = new Date();
    this.paymentDate = paymentDate;
  }
}
