import { Status } from '../util/PayableStatus.enum';
import { DebitPayable } from './DebitPayable.entity';
import { getTodayDate } from './util/DateFormatter';

describe('class DebitPayable', () => {
  let debitPayable: DebitPayable;
  beforeAll(() => {
    debitPayable = new DebitPayable();
  });
  it('Should have fee property', () => {
    expect(debitPayable).toHaveProperty('fee');
  });
  it('Should have status property', () => {
    expect(debitPayable).toHaveProperty('status');
  });
  it('Should have paymentDate property', () => {
    expect(debitPayable).toHaveProperty('paymentDate');
  });
  it('Should be initialized with the 3% fee', () => {
    const expectFee = 0.03;
    const fee = debitPayable.getFee();
    expect(fee).toBe(expectFee);
  });
  it('Should be initialized with the paid status', () => {
    const expectStatus = Status.PAID;
    const status = debitPayable.getStatus();
    expect(status).toBe(expectStatus);
  });
  it('Should be initialized with the d+0 paymentDate', () => {
    const expectDate = getTodayDate();
    const paymentDate = debitPayable.getPaymenteDate();
    expect(paymentDate).toBe(expectDate);
  });
  describe('setAmount()', () => {
    it('Should set the amount according to the 3% rate ', () => {
      const expectedAmount = 9.7;
      debitPayable.setAmount(10);
      const amount = debitPayable.getAmount();
      expect(amount).toBe(expectedAmount);
    });
  });
});
