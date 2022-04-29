import type { Undefinable } from '@/util';

/**
 * fp
 * const array = [1, 2, 3, 4, 5];
 * const result = moveArrayItem(array, 1, 3);
 * expect(result).toEqual([1, 3, 4, 2, 5]);
 * @param arr
 * @param from
 * @param to
 */
export const moveArrayItem = <T>(arr: T[], from: number, to: number): T[] => {
  const newArr = arr.slice();
  newArr.splice(to < 0 ? newArr.length + to : to, 0, newArr.splice(from, 1)[0]);
  return newArr;
};

/**
 * fp
 * const array = [1, 2, 3, 4, 5];
 * const result = swapArrayItem(array, 1, 3);
 * expect(result).toEqual([1, 4, 3, 2, 5]);
 * @param arr
 * @param source
 * @param target
 */
export const swapArrayItem = <T>(arr: T[], source: number, target: number): T[] => {
  const newArr = arr.slice();
  const temp = newArr[source];
  newArr[source] = newArr[target];
  newArr[target] = temp;
  return newArr;
};

export const randomIndex = (length: number): number => Math.floor(Math.random() * length);
export const randomItem = <T>(arr: T[]) => arr[randomIndex(arr.length)];
export const randomItems = <T>(arr: T[], count: number): T[] => {
  const newArr = arr.slice();
  const result = [];
  for (let i = 0; i < count; i += 1) {
    result.push(randomItem(newArr));
  }
  return result;
};

export const lastItem = <T>(arr: T[]): Undefinable<T> => arr[arr.length - 1];
export const firstItem = <T>(arr: T[]): Undefinable<T> => arr[0];

/**
 * fp
 * @param arr
 * @param index
 */
export const removeItemWithIndex = <T>(arr: T[], index: number): T[] => {
  const newArr = arr.slice();
  newArr.splice(index, 1);
  return newArr;
};

export * from './utils';
