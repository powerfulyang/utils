import type { Dict, Primitive } from '@/utils';

export class Collection {
  static unique<T extends Primitive>(array: T[]): T[];
  static unique<T extends Dict>(array: T[], primaryKey: string): T[];
  /**
   * unique values
   * @param arr
   * @param primaryKey
   */
  static unique<T extends Dict>(arr: T[], primaryKey?: string) {
    return arr.filter((item, index, self) => {
      return (
        self.findIndex((t) => {
          if (primaryKey) {
            return t[primaryKey] === item[primaryKey];
          }
          return t === item;
        }) === index
      );
    });
  }

  static merge<T extends Primitive>(arr1: T[], arr2: T[]): T[];
  static merge<T extends Dict>(arr1: T[], arr2: T[], primaryKey: string): T[];

  /**
   * Merges the passed iterable into the current collection.
   *
   * @returns The merged array.
   * @param arr1
   * @param arr2
   * @param primaryKey
   */
  static merge<T extends Dict>(arr1: T[], arr2: T[], primaryKey?: string): T[] {
    const concat = arr1.concat(arr2);
    if (primaryKey) {
      return Collection.unique(concat, primaryKey);
    }
    return [...concat];
  }
}
