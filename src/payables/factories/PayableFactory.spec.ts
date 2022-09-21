import { PaymentOption } from '../../transaction/util/PayamentOption.enum';
import { CreditPayable } from '../entities/CreditPayable.entity';
import { DebitPayable } from '../entities/DebitPayable.entity';
import { PayableFactory } from './PayableFactory';

describe('class PayableFactory', () => {
  describe('getPayable()', () => {
    it('Should return a CreditPayable instance when CREDIT_CARD option is passed as a argument', () => {
      const payable = PayableFactory.getPayable(PaymentOption.CREDIT_CARD);
      expect(payable).toBeInstanceOf(CreditPayable);
    });
    it('Should return a DebitPayable instance when DEBIT_CARD option is passed as a argument', () => {
      const payable = PayableFactory.getPayable(PaymentOption.DEBIT_CARD);
      expect(payable).toBeInstanceOf(DebitPayable);
    });
  });
});
