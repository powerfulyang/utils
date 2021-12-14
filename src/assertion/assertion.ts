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

export const isEmptyArray = (value: any): value is [] => isArray(value) && value.length === 0;

export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

export const isDefined = <T>(value: T | undefined): value is T => {
  return typeof value !== 'undefined' && value !== undefined;
};

export const isUndefined = (value: any): value is undefined => {
  return typeof value === 'undefined' || value === undefined;
};

export const getPrototype = (value: object) => Object.getPrototypeOf(value);

export const getInstanceType = (value: any) => {
  const type = getType(value);
  return type === 'Object' ? getPrototype(value).constructor.name : type;
};

export const isObject = (value: any): value is object => {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
};

export function isObjectLike(value: any) {
  return typeof value === 'object' && value !== null;
}

export const isPlainObject = (value: any): value is Dict => {
  if (!isObjectLike(value) || getType(value) !== 'Object') {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
};

export const isEmptyObject = (value: any) => isObject(value) && Object.keys(value).length === 0;

export function isNotEmptyObject(value: any): value is object {
  return value && !isEmptyObject(value);
}

export const isNull = (value: any): value is null => value === null;

// String assertions
export function isString(value: any): value is string {
  return getType(value) === 'String';
}

// Blob assertions
export function isBlob(value: any): value is Blob {
  return getType(value) === 'Blob';
}

/**
 * value is `undefined or null or [] or {} or '' or 0`
 * @param value
 */
export function isEmpty(value: any): boolean {
  return (
    isUndefined(value) ||
    isNull(value) ||
    isEmptyArray(value) ||
    (isString(value) && value === '') ||
    isEmptyObject(value) ||
    value === 0
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
 * Asserts that the value is Truthy.
 * @param value
 */
export function isTruthy<T>(value: T): value is T {
  return !!value;
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
