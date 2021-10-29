/**
 * isChinese
 */
export function isChinese(str: string): boolean {
  return /^[\u4e00-\u9fa5]+$/.test(str);
}

/**
 * isEnglish
 */
export function isEnglish(str: string): boolean {
  return /^[A-Za-z]+$/.test(str);
}

export { isValidIdCard } from './isValidIdCard';
