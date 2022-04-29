import { Required, ToUpperCase, Validate } from './index';

/**
 * test decorators
 */
describe('test decorators', () => {
  class TestClass {
    @ToUpperCase()
    public desc: string | undefined;

    @Validate()
    static testRequireParam(@Required() param: string) {
      return param;
    }
  }
  /**
   * test @Required
   */
  it('test Required', () => {
    const test = new TestClass();
    test.desc = 'description';
    expect(TestClass.testRequireParam('param')).toBe('param');
    try {
      TestClass.testRequireParam(undefined as unknown as string);
    } catch (e) {
      expect((e as Error).message).toBe('Missing required parameter at index 0');
    }
    expect(test.desc).toBe(test.desc.toUpperCase());
  });
});
