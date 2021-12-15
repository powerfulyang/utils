import type { Dict } from '../type/types';

type Type =
  | 'Number'
  | 'String'
  | 'Boolean'
  | 'Array'
  | 'Object'
  | 'Function'
  | 'Null'
  | 'Undefined'
  | 'Blob'
  | 'Date'
  | 'Uint8Array'
  | 'Uint8ClampedArray'
  | 'Uint16Array'
  | 'Uint32Array'
  | 'Int8Array'
  | 'Int16Array'
  | 'Int32Array'
  | 'Float32Array'
  | 'Float64Array'
  | 'ArrayBuffer'
  | 'DataView'
  | 'RegExp'
  | 'Map'
  | 'Set'
  | 'WeakMap'
  | 'WeakSet'
  | 'Promise'
  | 'Generator'
  | 'GeneratorFunction'
  | 'GeneratorObject'
  | 'AsyncFunction'
  | 'AsyncGenerator'
  | 'AsyncGeneratorFunction'
  | 'AsyncGeneratorObject'
  | 'Symbol'
  | 'BigInt'
  | 'BigInt64Array'
  | 'BigUint64Array'
  | 'ArrayBufferLike'
  | 'ArrayLike';

export const getType = (value: any): Type => {
  return Object.prototype.toString.call(value).slice(8, -1) as Type;
};

export function isNumber(value: any): value is number {
  return getType(value) === 'Number' && !Number.isNaN(value) && Number.isFinite(value);
}

export function isNumeric(value: any) {
  return value != null && value - parseFloat(value) + 1 >= 0;
}

export function isArray<T>(value: any): value is Array<T> {
  return Array.isArray(value);
}

export function isArrayLike<T>(value: any): value is ArrayLike<T> {
  return (
    value != null &&
    typeof value === 'object' &&
    isNumber(value.length) &&
    value.length >= 0 &&
    value.length % 1 === 0
  );
}

export type NonUndefined<T> = T extends undefined ? never : T;

export const isDefined = <T>(value: T): value is NonUndefined<T> => {
  return typeof value !== 'undefined' && value !== undefined;
};

export const isDefinedAndInitialize = <T>(value: T): value is NonNullable<T> => {
  return typeof value !== 'undefined' && value !== undefined && value !== null;
};

export const isUndefined = (value: any): value is undefined => {
  return typeof value === 'undefined' || value === undefined;
};

export const isEmptyArray = (value: any): value is [] =>
  isArray(value) && value.length === 0 && isUndefined(value[0]);

export const isEmptyArrayLike = <T>(value: any): value is ArrayLike<T> =>
  isArrayLike(value) && value.length === 0 && isUndefined(value[0]);

export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

export const isNull = (value: any): value is null => value === null;

export const getPrototype = (value: object) => Object.getPrototypeOf(value);

export const getInstanceType = (value: any) => {
  const type = getType(value);
  return type === 'Object' ? getPrototype(value).constructor.name : type;
};
/**
 * @description
 * Check if the value is Object
 * not null
 * @param value
 */
export const isObject = (value: any): value is object => {
  const type = getType(value);
  return type === 'Object' || type === 'Function';
};

export function isObjectLike(value: any): value is Dict {
  const type = getType(value);
  return type === 'Object';
}

export type Primitive = string | number | boolean | symbol | bigint | null | undefined;

export const isPrimitive = (value: any): value is Primitive => {
  const type = getType(value);
  return (
    type === 'String' ||
    type === 'Number' ||
    type === 'Boolean' ||
    type === 'Symbol' ||
    type === 'BigInt' ||
    type === 'Null' ||
    type === 'Undefined'
  );
};

export const isPlainObject = (value: any): value is Dict => {
  if (!isObjectLike(value)) {
    return false;
  }
  if (getPrototype(value) === null) {
    return true;
  }
  let proto = value;
  while (getPrototype(proto) !== null) {
    proto = getPrototype(proto);
  }
  return getPrototype(value) === proto;
};

export const isPrimitiveValuePlainObject = (value: any): value is Dict<Primitive> => {
  let result = true;
  if (isPlainObject(value)) {
    Object.values(value).forEach((v) => {
      if (!isPrimitive(v)) {
        result = false;
      }
    });
  }
  return result;
};

export const isEmptyObject = (value: any) => isObject(value) && Object.keys(value).length === 0;

export function isNotEmptyObject(value: any): value is object {
  return value && !isEmptyObject(value);
}

// String assertions
export function isString(value: any): value is string {
  return getType(value) === 'String';
}

export function isEmptyString(value: any): value is '' {
  return isString(value) && value.length === 0;
}

// Blob assertions
export function isBlob(value: any): value is Blob {
  return getType(value) === 'Blob';
}

export const isEmptyBlob = (value: any): value is Blob => isBlob(value) && value.size === 0;

export const isSet = (value: any): value is Set<any> => {
  return getType(value) === 'Set';
};

export const isEmptySet = (value: any): value is Set<any> => isSet(value) && value.size === 0;

export const isMap = (value: any): value is Map<any, any> => {
  return getType(value) === 'Map';
};

export const isEmptyMap = (value: any): value is Map<any, any> => isMap(value) && value.size === 0;

/**
 * value is `undefined or null or [] or {} or '' or 0` or EmptyBlob or EmptySet or EmptyMap
 * @param value
 */
export function isEmpty(value: any): boolean {
  return (
    isUndefined(value) ||
    isNull(value) ||
    isEmptyArray(value) ||
    isEmptyString(value) ||
    isEmptyObject(value) ||
    isEmptyArrayLike(value) ||
    value === 0 ||
    isEmptyBlob(value) ||
    isEmptySet(value) ||
    isEmptyMap(value)
  );
}

/**
 * Asserts that the value is void. `undefined`, `null`
 */
export function isVoid(value: any): value is void {
  return value === undefined || value === null;
}

export type Falsy = false | '' | 0 | null | undefined;

/**
 * Asserts that the value is Falsy. `false`, `0`, `''`, `null`, `undefined`
 * @param value
 */
export function isFalsy(value: any): value is Falsy {
  return value === false || value === '' || value === 0 || value === null || value === undefined;
}

/**
 * Asserts that the value is Nil. `null`, `undefined`
 */
export type Nil = undefined | null;

export function isNil(value: any): value is Nil {
  return value === undefined || value === null;
}

export const isDevProcess = process.env.NODE_ENV !== 'production';
export const isProdProcess = process.env.NODE_ENV === 'production';
export const isTestProcess = process.env.NODE_ENV === 'test';
export const isClient = typeof window === 'object';

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
