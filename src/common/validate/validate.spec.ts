import { describe, expect, it } from '@jest/globals';
import { isValidIdCard } from './index';

describe('validate', () => {
  /**
   * isValidIdCard
   */
  describe('isValidIdCard', () => {
    it('should return true when idCard is valid', () => {
      expect(isValidIdCard('235407195106112745')).toBeTruthy();
    });
    it('should return false when idCard is invalid', () => {
      expect(isValidIdCard('42010219900302700')).toBeFalsy();
    });
  });
});
