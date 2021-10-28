/**
 * this is a jest test file for index.ts
 */
import { isValidIdCard } from './index';

describe('validate', () => {
  /**
   * isValidIdCard
   */
  describe('isValidIdCard', () => {
    it('should return true when idCard is valid', () => {
      expect(isValidIdCard('150921198806138798')).toBeTruthy();
    });
    it('should return false when idCard is invalid', () => {
      expect(isValidIdCard('42010219900302700')).toBeFalsy();
    });
  });
});
