import { TrimStrPipe } from './trim-str.pipe';

describe('TrimStrPipe', () => {
  it('create an instance', () => {
    const pipe = new TrimStrPipe();
    expect(pipe).toBeTruthy();
  });
});
