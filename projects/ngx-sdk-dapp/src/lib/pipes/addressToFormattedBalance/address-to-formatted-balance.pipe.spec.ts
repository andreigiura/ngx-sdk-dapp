import { AddressToFormattedBalancePipe } from './address-to-formatted-balance.pipe';

describe('AddressToFormattedBalancePipe', () => {
  it('create an instance', () => {
    const pipe = new AddressToFormattedBalancePipe();
    expect(pipe).toBeTruthy();
  });
});
