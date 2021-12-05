import { Required, ToLocaleString, Validate } from './index';

/**
 * test decorators
 */
describe('test decorators', () => {
  class TestClass {
    @ToLocaleString()
    public money: string | undefined;

    @Validate()
    static testRequireParam(@Required() param: string) {
      return param;
    }

    getMoney() {
      return this.money;
    }
  }
  /**
   * test @Required
   */
  it('test Required', () => {
    const test = new TestClass();
    test.money = '123133.22222';
    expect(TestClass.testRequireParam('')).toBe('');
    try {
      TestClass.testRequireParam(undefined as any);
    } catch (e) {
      expect((e as Error).message).toBe('Missing required parameter at index 0');
    }
    expect(test.getMoney()).toBe('CN¥123,133.22');
  });
});
