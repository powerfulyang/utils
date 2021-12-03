/**
 * P parameters type; R return type;
 */
export type ReturnTypedFunction<R = any, P extends unknown[] = any[]> = (...args: P) => R;
/**
 * P constructor parameters type; I instance type;
 */
export type ConstructorFunction<I = any, P extends unknown[] = any[]> = new (...args: P) => I;
/**
 * P parameters type;
 */
export type VoidFunction<P extends unknown[] = any[]> = ReturnTypedFunction<void, P>;

export type Dict<T = any> = Record<string, T>;
