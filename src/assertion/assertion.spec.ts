import { describe, expect, it } from '@jest/globals';
import { getType } from '@/assertion/getType';
import {
  getInstanceType,
  getPrototype,
  isArray,
  isBlob,
  isDefined,
  isEmpty,
  isEmptyArray,
  isFalsy,
  isFunction,
  isNil,
  isNotNil,
  isNotNull,
  isObject,
  isPlainObject,
  isPrimitive,
  isString,
  isUndefined,
  isVoid,
} from '@/assertion';

describe('assertion', () => {
  class Test {}
  const t = new Test();
  /**
   * isUndefined
   */
  it('isUndefined', () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined('')).toBe(false);
    expect(isUndefined({})).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined(() => {})).toBe(false);
    expect(isDefined(1)).toBe(true);
  });

  /**
   * isArray
   */
  it('isArray', () => {
    expect(isArray(undefined)).toBe(false);
    expect(isArray(null)).toBe(false);
    expect(isArray('')).toBe(false);
    expect(isArray(0)).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray([])).toBe(true);
    expect(isArray([22])).toBe(true);
    expect(isEmptyArray([])).toBe(true);
    expect(isEmptyArray([2])).toBe(false);
    expect(isArray(() => {})).toBe(false);
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(Test)).toBe(true);
  });

  it('is object', () => {
    expect(typeof null).toBe('object');
    expect(typeof undefined).toBe('undefined');
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });

  /**
   * getInstanceType
   */
  it('getInstanceType', () => {
    expect(getInstanceType(undefined)).toBe('Undefined');
    expect(getInstanceType(null)).toBe('Null');
    expect(getInstanceType('')).toBe('String');
    expect(getInstanceType(Symbol('test'))).toBe('Symbol');
    expect(getInstanceType(0)).toBe('Number');
    expect(getInstanceType(Number.MAX_VALUE)).toBe('Number');
    expect(getInstanceType(Number.POSITIVE_INFINITY)).toBe('Number');
    expect(getInstanceType(Number.MAX_SAFE_INTEGER)).toBe('Number');
    expect(getInstanceType(Number.NaN)).toBe('Number');
    expect(getInstanceType(Number.MIN_SAFE_INTEGER)).toBe('Number');
    expect(getInstanceType(() => {})).toBe('Function');
    expect(getInstanceType(Test)).toBe('Function');
    expect(getInstanceType(t)).toBe('Test');
    expect(getType(t)).toBe('Object');
    expect(getInstanceType([])).toBe('Array');
    expect(getInstanceType({})).toBe('Object');
    expect(getInstanceType(Buffer.from(''))).toBe('Uint8Array');
    expect(getType(Buffer)).toBe('Function');
    const a = { a: 1 };
    const b = Object.create(a);
    const c = Object.create(b);
    expect(getInstanceType(c)).toBe('Object');
    expect(getInstanceType(b)).toBe('Object');
    expect(getInstanceType(a)).toBe('Object');
    expect(getInstanceType(Object.prototype)).toBe(null);
    expect(getInstanceType(Object)).toBe('Function');
  });

  /**
   * isPlainObject
   */
  it('isPlainObject', () => {
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject('')).toBe(false);
    expect(isPlainObject(0)).toBe(false);
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: () => {} })).toBe(true);
    expect(isPlainObject({ a() {} })).toBe(true);
    const formData = new FormData();
    expect(isPlainObject(formData)).toBe(false);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(() => {})).toBe(false);
    expect(isPlainObject(Test)).toBe(false);
    expect(isPlainObject(t)).toBe(false);
    expect(isPlainObject(Buffer.from(''))).toBe(false);
    expect(isPlainObject(Buffer)).toBe(false);
  });

  /**
   * isString
   */
  it('isString', () => {
    expect(isString(undefined)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString('')).toBe(true);
    expect(isString(0)).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString(() => {})).toBe(false);
    expect(isString(Test)).toBe(false);
    expect(isString(t)).toBe(false);
    expect(isString(Buffer.from(''))).toBe(false);
    expect(isString(Buffer)).toBe(false);
  });

  /**
   * isBlob
   */
  it('isBlob', () => {
    expect(isBlob(undefined)).toBe(false);
    expect(isBlob(null)).toBe(false);
    expect(isBlob('')).toBe(false);
    expect(isBlob(0)).toBe(false);
    expect(isBlob({})).toBe(false);
    expect(isBlob([])).toBe(false);
    expect(isBlob(() => {})).toBe(false);
    expect(isBlob(Test)).toBe(false);
    expect(isBlob(t)).toBe(false);
    expect(isBlob(Buffer.from(''))).toBe(false);
    expect(isBlob(Buffer)).toBe(false);
    expect(isBlob(new Blob())).toBe(true);
  });

  /**
   * isEmpty
   */
  it('isEmpty', (done) => {
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty(() => {})).toBe(false);
    expect(isEmpty(Test)).toBe(false);
    expect(getType(t)).toBe('Object');
    expect(getInstanceType(t)).toBe('Test');
    expect(isEmpty(t)).toBe(true);
    const arrayLike = {
      length: 0,
      0: '1',
    };
    expect(isArray(arrayLike)).toBe(false);
    const arr = [1, { a: 1 }];
    expect(isArray(arr)).toBe(true);
    expect(isEmpty(arrayLike)).toBe(false);
    const buffer2 = Buffer.from('2');
    expect(isEmpty(buffer2)).toBe(false);
    expect(isEmpty(Buffer)).toBe(false);
    const blob = new Blob([''], { type: 'text/plain' });
    const fileReader = new FileReader();
    fileReader.readAsText(blob);
    const callback = (result: string) => {
      expect(isEmpty(result)).toBe(true);
      done();
    };
    fileReader.onloadend = () => {
      const { result } = fileReader;
      callback(result as string);
    };
    const emptyBlob = new Blob();
    expect(isEmpty(emptyBlob)).toBe(true);
    expect(isEmpty(new Blob(['1']))).toBe(false);
    expect(isEmpty(new Set())).toBe(true);
    expect(isEmpty(new Set([1]))).toBe(false);
    expect(isEmpty(new Map())).toBe(true);
    const map = new Map([['a', 1]]);
    expect(isEmpty(map)).toBe(false);
  });

  /**
   * isVoid
   */
  it('isVoid', () => {
    expect(isVoid(undefined)).toBe(true);
    expect(isVoid(null)).toBe(false);
    expect(isVoid('')).toBe(false);
    expect(isVoid((() => {})())).toBe(true);
  });

  it('others', () => {
    expect(isFalsy(undefined)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNotNil(undefined)).toBe(false);
    expect(isNotNull(undefined)).toBe(true);
    // isPrimitive
    expect(isPrimitive(undefined)).toBe(true);
    expect(isPrimitive(null)).toBe(true);
    expect(isPrimitive('')).toBe(true);
    expect(isPrimitive(false)).toBe(true);
    expect(isPrimitive(0)).toBe(true);
    expect(isPrimitive(10n)).toBe(true);
    expect(isPrimitive(Symbol(''))).toBe(true);
  });

  it('getPrototype', () => {
    expect(getPrototype('')).toBe(String.prototype);
    expect(getPrototype(false)).toBe(Boolean.prototype);
    expect(getPrototype(0)).toBe(Number.prototype);
    expect(getPrototype(10n)).toBe(BigInt.prototype);
    expect(getPrototype(Symbol(''))).toBe(Symbol.prototype);
    expect(getPrototype({})).toBe(Object.prototype);
    expect(getPrototype([])).toBe(Array.prototype);
    expect(getPrototype(() => {})).toBe(Function.prototype);
    expect(getPrototype(Test)).toBe(Function.prototype);
    expect(getPrototype(t)).toBe(Test.prototype);
    const a = { a: 1 };
    const b = Object.create(a);
    const c = Object.create(b);
    expect(getPrototype(c)).toBe(b);
    expect(getPrototype(b)).toBe(a);
    expect(getPrototype(a)).toBe(Object.prototype);
  });
});
