/**
 * fp
 * const array = [1, 2, 3, 4, 5];
 * const result = moveArrayItem(array, 1, 3);
 * expect(result).toEqual([1, 3, 4, 2, 5]);
 * @param arr
 * @param from
 * @param to
 */
export const moveArrayItem = (arr: any[], from: number, to: number): any[] => {
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
export const swapArrayItem = (arr: any[], source: number, target: number): any[] => {
  const newArr = arr.slice();
  const temp = newArr[source];
  newArr[source] = newArr[target];
  newArr[target] = temp;
  return newArr;
};

export const randomIndex = (length: number): number => Math.floor(Math.random() * length);
export const randomItem = (arr: any[]): any => arr[randomIndex(arr.length)];
export const randomItems = (arr: any[], count: number): any[] => {
  const newArr = arr.slice();
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(randomItem(newArr));
  }
  return result;
};

export const lastItem = (arr: any[]): any => arr[arr.length - 1];
export const firstItem = (arr: any[]): any => arr[0];
/**
 * fp
 * @param arr
 * @param index
 */
export const removeItemWithIndex = (arr: any[], index: number): any[] => {
  const newArr = arr.slice();
  newArr.splice(index, 1);
  return newArr;
};
