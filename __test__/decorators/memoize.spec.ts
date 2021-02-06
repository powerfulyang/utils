import { Memoize } from '../../dist/main';

describe('test @memoize', function () {
  class Test {
    val = 1;
    @Memoize()
    testMemoize() {
      return this.val++;
    }
  }

  it('should cache', function () {
    const test = new Test();
    expect(test.testMemoize()).toBe(1);
    expect(test.testMemoize()).toBe(1);
  });
});
