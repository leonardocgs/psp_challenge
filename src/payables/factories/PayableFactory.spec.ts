import { PaymentOption } from '../../transaction/util/PayamentOption.enum';
import { CreditPayable } from '../entities/CreditPayable.entity';
import { DebitPayable } from '../entities/DebitPayable.entity';
import { PayableDto } from './Payable.dto';
import { PayableFactory } from './PayableFactory';

describe('class PayableFactory', () => {
  describe('getPayable()', () => {
    it('Should return a CreditPayable instance when CREDIT_CARD option is passed as a argument', () => {
      const payableDto: PayableDto = {
        clientId: '12345',
        paymentOption: PaymentOption.CREDIT_CARD,
        amount: 20,
      };
      const payable = PayableFactory.getPayable(payableDto);
      expect(payable).toBeInstanceOf(CreditPayable);
    });
    it('Should return a DebitPayable instance when DEBIT_CARD option is passed as a argument', () => {
      const payableDto: PayableDto = {
        clientId: '12345',
        paymentOption: PaymentOption.DEBIT_CARD,
        amount: 20,
      };
      const payable = PayableFactory.getPayable(payableDto);
      expect(payable).toBeInstanceOf(DebitPayable);
    });
  });
});
