import { Collection, firstItem, lastItem, moveArrayItem, swapArrayItem } from './index';

/**
 * jest, test collection utils
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

  /**
   * unique primitive array
   */
  test('unique primitive array', () => {
    const array = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
    const result = Collection.unique(array);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  /**
   * unique dict array
   */
  test('unique dict array', () => {
    const array = [{ a: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4 }];
    const result = Collection.unique(array, 'a');
    expect(result).toEqual([{ a: 1 }, { a: 2, b: 3 }, { a: 3, b: 4 }]);
  });

  /**
   * firstItem & lastItem
   */
  test('firstItem & lastItem', () => {
    const array = [1, 2, 3, 4, 5];
    const result = firstItem(array);
    expect(result).toEqual(1);
    const result2 = lastItem(array);
    expect(result2).toEqual(5);
    const emptyArray: any[] = [];
    const result3 = firstItem(emptyArray);
    expect(result3).toEqual(undefined);
    const result4 = lastItem(emptyArray);
    expect(result4).toEqual(undefined);
  });
});
