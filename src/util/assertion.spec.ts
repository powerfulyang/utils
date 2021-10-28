/**
 * do a test for assertion.ts
 */
import {
  getInstanceType,
  getType,
  isArray,
  isBlob,
  isDefined,
  isEmpty,
  isEmptyArray,
  isEmptyObject,
  isFunction,
  isNumber,
  isNumeric,
  isObject,
  isPlainObject,
  isString,
  isUndefined,
} from './assertion';

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
   * isNumber
   */
  it('isNumber', () => {
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber('')).toBe(false);
    expect(isNumber('0')).toBe(false);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(Number.MAX_VALUE)).toBe(true);
    expect(isNumber(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isNumber(Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(isNumber(Number.NaN)).toBe(false);
    expect(isNumber(Number.MIN_SAFE_INTEGER)).toBe(true);
  });
  /**
   * isNumeric
   */
  it('isNumeric', () => {
    expect(isNumeric(undefined)).toBe(false);
    expect(isNumeric(null)).toBe(false);
    expect(isNumeric('')).toBe(false);
    expect(isNumeric('0')).toBe(true);
    expect(isNumeric('+0')).toBe(true);
    expect(isNumeric('+1')).toBe(true);
    expect(isNumeric('1+')).toBe(false);
    expect(isNumeric('1-')).toBe(false);
    expect(isNumeric('0.0.1')).toBe(false);
    expect(isNumeric('0.0')).toBe(true);
    expect(isNumeric('--0.0')).toBe(false);
    expect(isNumeric(0)).toBe(true);
    expect(isNumeric(Number.MAX_VALUE)).toBe(true);
    expect(isNumeric(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isNumeric(Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(isNumeric(Number.NaN)).toBe(false);
    expect(isNumeric(Number.MIN_SAFE_INTEGER)).toBe(true);
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
   * getType
   */
  it('getType', () => {
    expect(getType(undefined)).toBe('Undefined');
    expect(getType(null)).toBe('Null');
    expect(getType('')).toBe('String');
    expect(getType(Symbol('test'))).toBe('Symbol');
    expect(getType(0)).toBe('Number');
    expect(getType(Number.MAX_VALUE)).toBe('Number');
    expect(getType(Number.POSITIVE_INFINITY)).toBe('Number');
    expect(getType(Number.MAX_SAFE_INTEGER)).toBe('Number');
    expect(getType(Number.NaN)).toBe('Number');
    expect(getType(Number.MIN_SAFE_INTEGER)).toBe('Number');
    expect(getType(() => {})).toBe('Function');
    expect(getType(Test)).toBe('Function');
    expect(getType(t)).toBe('Object');
    expect(getType([])).toBe('Array');
    expect(getType({})).toBe('Object');
    expect(getType(Buffer.from(''))).toBe('Uint8Array');
    expect(getType(Buffer)).toBe('Function');
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
    expect(getInstanceType([])).toBe('Array');
    expect(getInstanceType({})).toBe('Object');
    expect(getInstanceType(Buffer.from(''))).toBe('Uint8Array');
    expect(getType(Buffer)).toBe('Function');
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
    expect(isEmptyObject({})).toBe(true);
    expect(isEmptyObject({ a: 1 })).toBe(false);
    expect(isEmptyObject(0)).toBe(false);
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
  it('isEmpty', () => {
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty(() => {})).toBe(true);
    expect(isEmpty(Test)).toBe(true);
    expect(isEmpty(t)).toBe(true);
    expect(isEmpty(Buffer.from(''))).toBe(true);
    expect(isEmpty(Buffer)).toBe(false);
    expect(isEmpty(new Blob())).toBe(true);
  });
});
