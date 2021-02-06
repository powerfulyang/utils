import { ToEnUSNumberString } from '../../dist/main';

it('test', () => {
  class Test {
    @ToEnUSNumberString()
    testKey: number;
  }
  const test = new Test();
  test.testKey = 11111.222;
  expect(test.testKey).toBe('11,111.22');
});
