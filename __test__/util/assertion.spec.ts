import {
  isArray,
  isDefined,
  isEmpty,
  isEmptyArray,
  isEmptyObject,
  isFunction,
  isNotEmptyObject,
  isNotNumber,
  isNull,
  isNumber,
  isNumeric,
  isObject,
  isString,
  isUndefined,
} from '../../dist/main';

describe('test assertion', () => {
  it('isNumber', () => {
    expect(isNumber(NaN)).toBeFalsy();
    expect(isNumber('我们')).toBeFalsy();
    expect(isNumber('1.1')).toBeFalsy();
    expect(isNumber(1 / 0)).toBeFalsy();

    expect(isNumber(1.1)).toBeTruthy();
  });

  it('isNumeric', function () {
    expect(isNumeric('1.1')).toBeTruthy();
    expect(isNumeric(1.1)).toBeTruthy();

    expect(isNumeric(undefined)).toBeFalsy();
    expect(isNumeric(1 / 0)).toBeFalsy();
  });

  test('is object', () => {
    expect(isObject([])).toBeTruthy();
    expect(isObject({})).toBeTruthy();
    expect(isObject(function () {})).toBeTruthy();
  });

  test('is empty', () => {
    expect(isEmpty([])).toBeTruthy();
    expect(isEmpty({})).toBeTruthy();
    expect(isEmpty('')).toBeTruthy();
    expect(isEmpty(null)).toBeTruthy();
    expect(isEmpty(undefined)).toBeTruthy();

    expect(isEmpty([1, 2])).toBeFalsy();
    expect(isEmpty({ a: 2 })).toBeFalsy();
    expect(isEmpty('df')).toBeFalsy();
  });

  test('is empty object', () => {
    expect(isEmptyObject({})).toBeTruthy();
    expect(isEmptyObject({ a: 3 })).toBeFalsy();
  });

  test('is not number', () => {
    expect(isNotNumber('1')).toBeTruthy();
    expect(isNotNumber(1)).toBeFalsy();
  });

  test('is array', () => {
    expect(isArray([1])).toBeTruthy();
  });

  test('is empty array', () => {
    expect(isEmptyArray([])).toBeTruthy();
  });

  test('is function', () => {
    expect(isFunction(() => {})).toBeTruthy();
  });

  test('is defined', () => {
    expect(isDefined('1')).toBeTruthy();
  });

  test('is undefined', () => {
    expect(isUndefined(undefined)).toBeTruthy();
  });

  test('is null', () => {
    expect(isNull(null)).toBeTruthy();
  });

  test('is string', () => {
    expect(isString('1')).toBeTruthy();
  });

  test('should check is object is not empty', () => {
    expect(isNotEmptyObject({})).toBeFalsy();
    expect(isNotEmptyObject({ size: 'sm' })).toBeTruthy();
  });
});
