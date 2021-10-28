import { moveArrayItem, swapArrayItem } from './index';

/**
 * jest, test collection util
 */
describe('Collection', () => {
  /**
   * test moveArrayItem
   */
  test('moveArrayItem', () => {
    const array = [1, 2, 3, 4, 5];
    const result = moveArrayItem(array, 1, 3);
    expect(result).toEqual([1, 3, 4, 2, 5]);
  });
  /**
   * test swapArrayItem
   */
  test('swapArrayItem', () => {
    const array = [1, 2, 3, 4, 5];
    const result = swapArrayItem(array, 1, 3);
    expect(result).toEqual([1, 4, 3, 2, 5]);
  });
});
