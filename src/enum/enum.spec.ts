import { describe, expect, test } from '@jest/globals';
import { getEnumKeys, getEnumValues } from './index';

/**
 * test enum
 */
enum TestEnum {
  /**
   * test enum value
   */
  TestEnumValue = 0,
}

/**
 * do a test for enum use jest
 */
describe('test enum', () => {
  /**
   * test getEnumKeys
   */
  test('test get enum keys', () => {
    expect(getEnumKeys(TestEnum)).toStrictEqual(['TestEnumValue']);
  });
  /**
   * test getEnumValues
   */
  test('test get enum values', () => {
    expect(getEnumValues(TestEnum)).toStrictEqual([0]);
  });
});
