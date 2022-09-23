import { ChildEntity } from 'typeorm';
import { Payable } from './Payable.entity';
import { Status } from '../util/PayableStatus.enum';

@ChildEntity()
export class DebitPayable extends Payable {
  constructor(clientId: string, amount: number) {
    super();
    this.clientId = clientId;
    this.setFee();
    this.setStatus();
    this.setPaymentDate();
    this.setAmount(amount);
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
