import { getType } from '@/assertion/getType';

/**
 * @description 是否为数字类型
 * @example
 * isNumber(NaN) // false
 * isNumber(Infinity) // false
 * isNumber(1) // true
 * isNumber(Number.MAX_VALUE) // true
 * isNumber(Number.MIN_VALUE) // true
 */
export function isNumber(value: any): value is number {
  return getType(value) === 'Number' && !Number.isNaN(value) && Number.isFinite(value);
}

/**
 * @description 是否为数字类型或数字字符串
 * @example
 * isNumeric(NaN) // false
 * isNumeric(Infinity) // false
 * isNumeric(1) // true
 * isNumeric('+1.2') // true
 * isNumeric('-0.0') // true
 * isNumeric('1e2') // true
 */
export function isNumeric(value: any) {
  return value != null && value - parseFloat(value) + 1 >= 0;
}
