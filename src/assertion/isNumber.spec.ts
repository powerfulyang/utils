import { describe, expect, it } from '@jest/globals';
import { isNumber, isNumeric } from './isNumber';

describe('isNumber or isNumeric', () => {
  /**
   * isNumber
   */
  it('isNumber', () => {
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber('')).toBe(false);
    expect(isNumber('0')).toBe(false);
    expect(isNumber(Number.NaN)).toBe(false);
    expect(isNumber(Number.POSITIVE_INFINITY)).toBe(false);

    expect(isNumber(0)).toBe(true);
    expect(isNumber(Number.MAX_VALUE)).toBe(true);
    expect(isNumber(Number.MAX_SAFE_INTEGER)).toBe(true);
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
    expect(isNumeric('-1')).toBe(true);
    expect(isNumeric('0.0.1')).toBe(false);
    expect(isNumeric('0.0')).toBe(true);
    expect(isNumeric('--0.0')).toBe(false);
    expect(isNumeric('-0.0')).toBe(true);
    expect(isNumeric('1e2')).toBe(true);
    expect(isNumeric(0)).toBe(true);
    expect(isNumeric(Number.MAX_VALUE)).toBe(true);
    expect(isNumeric(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isNumeric(Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(isNumeric(Number.NaN)).toBe(false);
    expect(isNumeric(Number.MIN_SAFE_INTEGER)).toBe(true);
  });
});
