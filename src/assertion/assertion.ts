import type { Dict, NonUndefined, Primitive, Falsy, Nil } from '@/utils';

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
  | 'ArrayBuffer'
  | 'DataView'
  | 'RegExp'
  | 'Map'
  | 'Set'
  | 'WeakMap'
  | 'WeakSet'
  | 'Promise'
  | 'Generator'
  | 'AsyncFunction'
  | 'Symbol'
  | 'BigInt'
  | string;

export const getType = (value: any): Type => {
  return Object.prototype.toString.call(value).slice(8, -1) as Type;
};

/**
 * @description
 * Infinity、NaN 为 false
 *
 * 0、Number.MAX_VALUE、Number.MIN_VALUE 为 true
 */
export function isNumber(value: any): value is number {
  return getType(value) === 'Number' && !Number.isNaN(value) && Number.isFinite(value);
}

/**
 * @description
 * Infinity、NaN 为 false
 *
 * '+1.2'、'-0.0'、'1e2' 为 true
 */
export function isNumeric(value: any) {
  return value != null && value - parseFloat(value) + 1 >= 0;
}

/**
 * @description
 * 是否为数组
 */
export function isArray<T>(value: any): value is Array<T> {
  return Array.isArray(value);
}

/**
 * @description
 * Asserts that the value is Falsy.
 *
 * `false`, `0`, `''`, `null`, `undefined`
 */
export function isFalsy(value: any): value is Falsy {
  return value === false || value === '' || value === 0 || value === null || value === undefined;
}

/**
 * @description
 * Asserts that the value is Nil. `null`, `undefined`
 */
export function isNil(value: any): value is Nil {
  return value === undefined || value === null;
}

/**
 * @description
 * Asserts that the value is not `undefined` or `null`
 */
export const isDefinedAndInitialize = <T>(value: T | undefined | null): value is T => {
  return typeof value !== 'undefined' && value !== undefined && value !== null;
};

/**
 * @description
 * Asserts that the value is not `undefined` or `null`
 */
export const isNotNil = <T>(value: T | undefined | null): value is T => {
  return isDefinedAndInitialize(value);
};

/**
 * @description
 * Asserts that the value is undefined
 */
export const isUndefined = <T>(value: T | undefined): value is undefined => {
  return typeof value === 'undefined' || value === undefined;
};

/**
 * @description
 * Asserts that the value is not undefined
 */
export const isDefined = <T>(value: T): value is NonUndefined<T> => {
  return typeof value !== 'undefined' && value !== undefined;
};

/**
 * @description
 * Asserts that the value is null
 */
export const isNull = (value: any): value is null => value === null;

/**
 * @description
 * Asserts that the value is not null
 */
export const isNotNull = <T>(value: T): value is NonNullable<T> => value !== null;

/**
 * @description
 * Asserts that the value is []
 */
export const isEmptyArray = (value: any): value is [] =>
  isArray(value) && value.length === 0 && isUndefined(value[0]);

/**
 * @description
 * Asserts that the value is Function
 */
export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

/**
 * @description
 * 获取原型信息
 */
export const getPrototype = (value: object) => Object.getPrototypeOf(value);

/**
 * @description
 * 获取原型信息
 */
export const getInstanceType = (value: any) => {
  const type = getType(value);
  return type === 'Object' ? getPrototype(value).constructor.name : type;
};

/**
 * @description
 * Check if the value is Object
 *
 * object、function 类型为 true
 *
 * Primitive 类型为 false
 */
export const isObject = (value: any): value is object => {
  const type = getType(value);
  return type === 'Object' || type === 'Function';
};

/**
 * @description
 * Check if the value is Object
 *
 * 不包含 Function 类型
 */
export function isObjectLike(value: any): value is Dict {
  const type = getType(value);
  return type === 'Object';
}

/**
 * @description
 * Check if the value is Primitive
 */
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

/**
 * @description
 * Check if the value is Dict
 */
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

// String assertions
export function isString(value: any): value is string {
  return getType(value) === 'String';
}

export function isEmptyString(value: any): value is '' {
  return isString(value) && value.length === 0;
}

// Blob assertions
export function isBlob(value: any): value is Blob {
  return getInstanceType(value) === 'Blob';
}

export const isEmptyBlob = (value: any): value is Blob => isBlob(value) && value.size === 0;

export const isSet = <T>(value: any): value is Set<T> => {
  return getInstanceType(value) === 'Set';
};

export const isEmptySet = <T>(value: any): value is Set<T> => isSet(value) && value.size === 0;

export const isMap = (value: any): value is Map<any, any> => {
  return getType(value) === 'Map';
};

export const isEmptyMap = (value: any): value is Map<any, any> => isMap(value) && value.size === 0;

export const isEmptyObject = (value: any): value is {} => {
  return getType(value) === 'Object' && Reflect.ownKeys(value).length === 0;
};

export const isEmptyBuffer = (value: any): value is Buffer => {
  return Buffer.isBuffer(value) && value.length === 0;
};

/**
 * @description
 * value is `undefined or null or [] or {} or '' or 0` or EmptyBlob or EmptySet or EmptyMap
 * @example
 *  isEmpty(undefined) // true
 *  isEmpty(null) // true
 *  isEmpty([]) // true
 *  isEmpty({}) // true
 *  isEmpty('') // true
 *  isEmpty(0) // true
 *  isEmpty(new Blob()) // true
 *  isEmpty(new Set()) // true
 *  isEmpty(new Map()) // true
 *  isEmpty(function(){}) // false
 *  isEmpty(new Buffer()) // true
 */
export function isEmpty(value: any): boolean {
  return (
    isUndefined(value) ||
    isNull(value) ||
    isEmptyArray(value) ||
    isEmptyString(value) ||
    value === 0 ||
    isEmptyBlob(value) ||
    isEmptySet(value) ||
    isEmptyMap(value) ||
    isEmptyObject(value) ||
    isEmptyBuffer(value)
  );
}

/**
 * @description
 * Asserts that the value is void. `undefined`, `null`
 */
export function isVoid(value: any): value is void {
  return value === undefined;
}

export const isDevProcess = process.env.NODE_ENV !== 'production';
export const isProdProcess = process.env.NODE_ENV === 'production';
export const isTestProcess = process.env.NODE_ENV === 'test';
export const isClient = typeof window === 'object';
