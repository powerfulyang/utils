/**
 * do a test for assertion.ts
 */
import {
  getInstanceType,
  getType,
  isArray,
  isArrayLike,
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
  isPrimitiveValuePlainObject,
  isString,
  isUndefined,
  isVoid,
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
    expect(getType(new Date())).toBe('Date');
    expect(getType(/test/)).toBe('RegExp');
    expect(getType(new Error())).toBe('Error');
    expect(getType(new Map())).toBe('Map');
    expect(getType(new Set())).toBe('Set');
    expect(getType(new WeakMap())).toBe('WeakMap');
    expect(getType(new WeakSet())).toBe('WeakSet');
    expect(getType(new Promise(() => {}))).toBe('Promise');
    expect(getType(new Int8Array())).toBe('Int8Array');
    expect(getType(new Uint8Array())).toBe('Uint8Array');
    expect(getType(new Uint8ClampedArray())).toBe('Uint8ClampedArray');
    expect(getType(new Int16Array())).toBe('Int16Array');
    expect(getType(new Uint16Array())).toBe('Uint16Array');
    expect(getType(new Int32Array())).toBe('Int32Array');
    expect(getType(new Uint32Array())).toBe('Uint32Array');
    expect(getType(new Float32Array())).toBe('Float32Array');
    expect(getType(new Float64Array())).toBe('Float64Array');
    expect(getType(new BigInt64Array())).toBe('BigInt64Array');
    expect(getType(new BigUint64Array())).toBe('BigUint64Array');
    expect(getType(new ArrayBuffer(4))).toBe('ArrayBuffer');
    expect(getType(new SharedArrayBuffer(4))).toBe('SharedArrayBuffer');
    expect(getType(new DataView(new ArrayBuffer(4)))).toBe('DataView');
    expect(getType(new URL('https://www.baidu.com'))).toBe('URL');
    expect(getType(new URLSearchParams('a=1'))).toBe('URLSearchParams');
    const searchParams = new URLSearchParams('??a=1');
    expect(searchParams.toString()).toBeDefined();
    expect(getType(searchParams)).toBe('URLSearchParams');
    expect(getType(new EventTarget())).toBe('EventTarget');
    expect(
      getType(
        new Event('test', {
          bubbles: true,
          cancelable: true,
          composed: true,
        }),
      ),
    ).toBe('Event');
    expect(
      getType(
        new CustomEvent('test', {
          bubbles: true,
          cancelable: true,
          composed: true,
        }),
      ),
    ).toBe('CustomEvent');
    expect(getType(new Blob(['test'], { type: 'text/plain' }))).toBe('Blob');
    expect(getType(new File([], 'test.txt', { type: 'text/plain' }))).toBe('File');
    expect(getType(new FormData())).toBe('FormData');
    expect(getType(new Headers())).toBe('Headers');
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
    expect(isEmptyObject({})).toBe(true);
    expect(isEmptyObject({ a: 1 })).toBe(false);
    expect(isEmptyObject(0)).toBe(false);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(() => {})).toBe(false);
    expect(isPlainObject(Test)).toBe(false);
    expect(isPlainObject(t)).toBe(false);
    expect(isPlainObject(Buffer.from(''))).toBe(false);
    expect(isPlainObject(Buffer)).toBe(false);

    const obj = {} as { a: 1 } | { a: 1; b: () => void };
    if (isPrimitiveValuePlainObject(obj)) {
      obj.a;
    } else {
      obj.b();
    }
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
    expect(isEmpty(() => {})).toBe(true);
    expect(isEmpty(Test)).toBe(true);
    expect(isEmpty(t)).toBe(true);
    const arrayLike = {
      length: 0,
      0: '1',
    };
    expect(isArray(arrayLike)).toBe(false);
    const arr = [1, { a: 1 }];
    expect(isArray(arr)).toBe(true);
    expect(isArrayLike(arr)).toBe(true);
    expect(isArrayLike(arrayLike)).toBe(true);
    expect(isEmpty(arrayLike)).toBe(false);
    const buffer = Buffer.from('');
    expect(isEmpty(buffer)).toBe(true);
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
});
