// eslint-disable-next-line max-classes-per-file
import { describe, expect, it } from '@jest/globals';
import { Freeze, getMetadata, PropertyDecorator, Required, Validate } from '@/index';

describe('test decorators', () => {
  class TestClass {
    @PropertyDecorator('hello')
    desc: string | undefined;

    @Validate()
    static testRequireParam(@Required() param: string) {
      return param;
    }
  }

  @Freeze()
  class FreezeTestClass {
    property?: string;

    objectProperty?: object;

    constructor(property: string) {
      this.property = property;
      this.objectProperty = { a: 1 };
    }
  }

  const testClass = new TestClass();
  const freezeTestClass = new FreezeTestClass('test');

  it('test @Required and @Validate', () => {
    expect(TestClass.testRequireParam('param')).toBe('param');
    expect(TestClass.testRequireParam).toThrow('Missing required parameter at index 0');
  });

  it('test @PropertyDecorator', () => {
    const metadata = getMetadata(testClass, 'desc');
    expect(metadata).toBe('hello');
  });

  it('test @Freeze', () => {
    expect(Object.isExtensible(freezeTestClass)).toBe(false);
    expect(() => {
      delete freezeTestClass.property;
    }).toThrow(/^Cannot delete property 'property'/);
    expect(() => {
      // @ts-ignore
      freezeTestClass.newProperty = 'test';
    }).toThrow('Cannot add property newProperty, object is not extensible');
    expect(() => {
      freezeTestClass.property = 'test';
    }).toThrow(/^Cannot assign to read only property 'property' of object/);
    expect(
      Reflect.defineProperty(freezeTestClass, 'property', {
        value: 'test2',
      }),
    ).toBe(false);
    expect(freezeTestClass.property).toBe('test');
  });
});
