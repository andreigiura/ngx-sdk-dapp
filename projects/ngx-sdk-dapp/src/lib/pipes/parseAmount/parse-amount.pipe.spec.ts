import { ParseAmountPipe } from './parse-amount.pipe';

describe('ParseAmountPipe', () => {
  it('create an instance', () => {
    const pipe = new ParseAmountPipe();
    expect(pipe).toBeTruthy();
  });
});
