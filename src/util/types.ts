export type Merge<T, P> = P & Omit<T, keyof P>;

export type UnionStringArray<T extends Readonly<string[]>> = T[number];

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type LiteralUnion<T extends U, U extends any = string> = T | (U & { _?: never });

export type AnyFunction<T = any> = (...args: T[]) => any;

/**
 * P parameters type; R return type;
 */
export type ReturnTypedFunction<R = any, P = any> = (...args: P[]) => R;
/**
 * P constructor parameters type; I instance type;
 */
export type ConstructorFunction<I = any, P = any> = new (...args: P[]) => I;
/**
 * P parameters type;
 */
export type VoidFunction<P = any> = ReturnTypedFunction<void, P>;

export type FunctionArguments<T extends Function> = T extends (...args: infer R) => any ? R : never;

export type Dict<T = any> = Record<string, T>;

export type Booleanish = boolean | 'true' | 'false';

export type StringOrNumber = string | number;
