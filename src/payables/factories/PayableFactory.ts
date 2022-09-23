import { PaymentOption } from 'src/transaction/util/PayamentOption.enum';
import { CreditPayable } from '../entities/CreditPayable.entity';
import { DebitPayable } from '../entities/DebitPayable.entity';
import { PayableDto } from './Payable.dto';

export class PayableFactory {
  private static payableFactory: PayableFactory;

  private constructor() {}
  getPayableFactory() {
    if (!PayableFactory.payableFactory) {
      PayableFactory.payableFactory = new PayableFactory();
    }
    return PayableFactory.payableFactory;
  }
  static getPayable({ clientId, amount, paymentOption }: PayableDto) {
    if (paymentOption == PaymentOption.CREDIT_CARD) {
      const creditPayable = new CreditPayable(clientId, amount);
      return creditPayable;
    } else if (paymentOption == PaymentOption.DEBIT_CARD) {
      const debitPayable = new DebitPayable(clientId, amount);
      return debitPayable;
    }
  }
}
