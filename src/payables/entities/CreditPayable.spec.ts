import { Status } from '../util/PayableStatus.enum';
import { CreditPayable } from './CreditPayable.entity';
import { dateFormatter } from './util/DateFormatter';

describe('class CreditPayable', () => {
  let creditPayable: CreditPayable;
  beforeAll(() => {
    creditPayable = new CreditPayable();
  });
  it('Should have fee property', () => {
    expect(creditPayable).toHaveProperty('fee');
  });
  it('Should have status property', () => {
    expect(creditPayable).toHaveProperty('status');
  });
  it('Should have paymentDate property', () => {
    expect(creditPayable).toHaveProperty('paymentDate');
  });
  it('Should be initialized with the 5% fee', () => {
    const expectFee = 0.05;
    const fee = creditPayable.getFee();
    expect(fee).toBe(expectFee);
  });
  it('Should be initialized with the waiting_funds status', () => {
    const expectStatus = Status.WAITING_FUNDS;
    const status = creditPayable.getStatus();
    expect(status).toBe(expectStatus);
  });
  it('Should be initialized with the d+30 paymentDate', () => {
    const rawExpectedDate = new Date();
    rawExpectedDate.setDate(rawExpectedDate.getDate() + 30);
    const expectDate = dateFormatter(rawExpectedDate);
    const paymentDate = creditPayable.getPaymenteDate();
    expect(paymentDate).toBe(expectDate);
  });
  describe('setAmount()', () => {
    it('Should set the amount according to the 5% rate ', () => {
      const expectedAmount = 9.5;
      creditPayable.setAmount(10);
      const amount = creditPayable.getAmount();
      expect(amount).toBe(expectedAmount);
    });
  });
});
