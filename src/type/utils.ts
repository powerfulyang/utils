/**
 * @description parameters type - P;
 * @description return type - R;
 */
export type ReturnFunction<R = any, P extends unknown[] = any[]> = (...args: P) => R;

/**
 * @description parameters type - P
 */
export type VoidFunction<P extends unknown[] = any[]> = ReturnFunction<void, P>;

/**
 * @description constructor parameters type - P
 * @description instance type - I
 */
export type ConstructorFunction<I = any, P extends unknown[] = any[]> = new (...args: P) => I;

/**
 * @description 普通对象
 */
export type Dict<T = any> = Record<string, T>;

/**
 * @description Asserts that the value is Nil.
 * @example
 * `null` or `undefined`
 */
export type Nil = undefined | null;

export type NonUndefined<T> = Exclude<T, undefined>;

export type NonNil<T> = T extends Nil ? never : T;

export type NonNull<T> = T extends null ? never : T;

export type Undefinable<T> = T | undefined;

export type Optional<T> = Undefinable<T>;

export type Nullable<T> = T | null;

/**
 * @description Asserts that the value is a primitive.
 * @example
 * `string` or `number` or `boolean` or `symbol` or `bigint` or `null` or `undefined`
 */
export type Primitive = string | number | boolean | symbol | bigint | null | undefined;

/**
 * @example
 * `null` or `undefined` or `''` or `0` or `false`
 */
export type Falsy = Nil | '' | 0 | false;
