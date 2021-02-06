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
