/**
 * @description
 * <P> parameters type;
 *
 * <R> return type;
 */
export type ReturnFunction<R = any, P extends unknown[] = any[]> = (...args: P) => R;

/**
 * @description
 * <P> parameters type;
 */
export type VoidFunction<P extends unknown[] = any[]> = ReturnFunction<void, P>;

/**
 * @description
 * <P> constructor parameters type;
 *
 * <I> instance type;
 */
export type ConstructorFunction<I = any, P extends unknown[] = any[]> = new (...args: P) => I;

/**
 * @description
 * 普通对象
 */
export type Dict<T = any> = Record<string, T>;

/**
 * @description
 * Asserts that the value is Nil.
 *
 * `null` or `undefined`
 */
export type Nil = undefined | null;

export type NonUndefined<T> = Exclude<T, undefined>;

export type NonNil<T> = T extends Nil ? never : T;

export type NonNull<T> = T extends null ? never : T;

export type Undefinable<T> = T | undefined;

export type Optional<T> = Undefinable<T>;

export type Nullable<T> = T | null;

export type Primitive = string | number | boolean | symbol | bigint | null | undefined;

export type Falsy = false | '' | 0 | null | undefined;

/**
 * FunctionKeys
 * @desc Get union type of keys that are functions in object type `T`
 * @example
 *  type MixedProps = {name: string; setName: (name: string) => void; someKeys?: string; someFn?: (...args: any) => any;};
 *
 *   // Expect: "setName | someFn"
 *   type Keys = FunctionKeys<MixedProps>;
 */
export type FunctionKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? K : never;
}[keyof T];

/**
 * NonFunctionKeys
 * @desc Get union type of keys that are non-functions in object type `T`
 * @example
 *   type MixedProps = {name: string; setName: (name: string) => void; someKeys?: string; someFn?: (...args: any) => any;};
 *
 *   // Expect: "name | someKey"
 *   type Keys = NonFunctionKeys<MixedProps>;
 */
export type NonFunctionKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? never : K;
}[keyof T];

/**
 * PickByValue
 * @desc From `T` pick a set of properties by value matching `ValueType`.
 * Credit: [Piotr Lewandowski](https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c)
 * @example
 *   type Props = { req: number; reqUndef: number | undefined; opt?: string; };
 *
 *   // Expect: { req: number }
 *   type Props = PickByValue<Props, number>;
 *   // Expect: { req: number; reqUndef: number | undefined; }
 *   type Props = PickByValue<Props, number | undefined>;
 */
export type PickByValue<T, ValueType> = Pick<
  T,
  { [Key in keyof T]-?: T[Key] extends ValueType ? Key : never }[keyof T]
>;

/**
 * OmitByValue
 * @desc From `T` remove a set of properties by value matching `ValueType`.
 * Credit: [Piotr Lewandowski](https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c)
 * @example
 *   type Props = { req: number; reqUndef: number | undefined; opt?: string; };
 *
 *   // Expect: { reqUndef: number | undefined; opt?: string; }
 *   type Props = OmitByValue<Props, number>;
 *   // Expect: { opt?: string; }
 *   type Props = OmitByValue<Props, number | undefined>;
 */
export type OmitByValue<T, ValueType> = Pick<
  T,
  { [Key in keyof T]-?: T[Key] extends ValueType ? never : Key }[keyof T]
>;

/**
 * PromiseType
 * @desc Obtain Promise resolve type
 * @example
 *   // Expect: string;
 *   type Response = PromiseType<Promise<string>>;
 */
export type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never;

/**
 * ValuesType
 * @desc Get the union type of all the values in an object, array or array-like type `T`
 * @example
 *    type Props = { name: string; age: number; visible: boolean };
 *    // Expect: string | number | boolean
 *    type PropsValues = ValuesType<Props>;
 *
 *    type NumberArray = number[];
 *    // Expect: number
 *    type NumberItems = ValuesType<NumberArray>;
 *
 *    type ReadonlySymbolArray = readonly symbol[];
 *    // Expect: symbol
 *    type SymbolItems = ValuesType<ReadonlySymbolArray>;
 *
 *    type NumberTuple = [1, 2];
 *    // Expect: 1 | 2
 *    type NumberUnion = ValuesType<NumberTuple>;
 *
 *    type ReadonlyNumberTuple = readonly [1, 2];
 *    // Expect: 1 | 2
 *    type AnotherNumberUnion = ValuesType<NumberTuple>;
 *
 *    type BinaryArray = Uint8Array;
 *    // Expect: number
 *    type BinaryItems = ValuesType<BinaryArray>;
 */
export type ValuesType<T extends ReadonlyArray<any> | ArrayLike<any> | Record<string, any>> =
  T extends ReadonlyArray<any>
    ? T[number]
    : T extends ArrayLike<any>
    ? T[number]
    : T extends object
    ? T[keyof T]
    : never;
