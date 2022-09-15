import { CreditPayable } from './CreditPayable.entity';

describe('class CreditPayable', () => {
  let creditPayable: CreditPayable;
  beforeAll(() => {
    creditPayable = new CreditPayable();
  });
  it('Should have fee property', () => {
    expect(creditPayable).toHaveProperty('fee');
  });
});
