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
