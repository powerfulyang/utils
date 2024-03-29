import { getType } from '@/assertion/getType';
import type { Dict, Falsy, Nil, NonUndefined, Primitive } from '@/type';

export { getType };

export * from './isNumber';

/**
 * @description 是否为数组
 */
export function isArray<T>(value: any): value is Array<T> {
  return Array.isArray(value);
}

/**
 * @description Asserts that the value is Falsy.
 * @example
 * isFalsy(false) === true
 * isFalsy(0) === true
 * isFalsy('') === true
 * isFalsy(null) === true
 * isFalsy(undefined) === true
 */
export function isFalsy(value: any): value is Falsy {
  return value === false || value === '' || value === 0 || value === null || value === undefined;
}

/**
 * @description Asserts that the value is Nil. `null`, `undefined`
 * @example
 * isNil(null) === true
 * isNil(undefined) === true
 */
export function isNil(value: any): value is Nil {
  return value === undefined || value === null;
}

/**
 * @description Asserts that the value is not `undefined` or `null`
 */
export const isDefinedAndInitialize = <T>(value: T | undefined | null): value is T => {
  return typeof value !== 'undefined' && value !== undefined && value !== null;
};

/**
 * @description Asserts that the value is not `undefined` or `null`
 */
export const isNotNil = <T>(value: T | undefined | null): value is T => {
  return isDefinedAndInitialize(value);
};

/**
 * @description Asserts that the value is undefined
 */
export const isUndefined = <T>(value: T | undefined): value is undefined => {
  return typeof value === 'undefined' || value === undefined;
};

/**
 * @description Asserts that the value is not undefined
 */
export const isDefined = <T>(value: T): value is NonUndefined<T> => {
  return typeof value !== 'undefined' && value !== undefined;
};

/**
 * @description Asserts that the value is null
 */
export const isNull = (value: any): value is null => value === null;

/**
 * @description Asserts that the value is not null
 */
export const isNotNull = <T>(value: T): value is NonNullable<T> => value !== null;

/**
 * @description Asserts that the value is []
 */
export const isEmptyArray = (value: any): value is [] =>
  isArray(value) && value.length === 0 && isUndefined(value[0]);

/**
 * @description Asserts that the value is Function
 */
export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

/**
 * @description 获取原型
 * @example
 * const a = { a: 1 };
 * const b = Object.create(a);
 * const c = Object.create(b);
 * getPrototype(c) === b;
 * getPrototype(b) === a;
 * getPrototype(a) === Object.prototype;
 * getPrototype(Object.prototype) === null;
 */
export const getPrototype = (value: any) => Object.getPrototypeOf(value);

/**
 * @description 获取实例类型
 * @example
 * const a = { a: 1 };
 * const b = Object.create(a);
 * const c = Object.create(b);
 * getInstanceType(c) === 'Object';
 * getInstanceType(b) === 'Object';
 * getInstanceType(a) === 'Object';
 * getInstanceType(Object.prototype) === 'Object';
 * getInstanceType(Object) === 'Function';
 * getInstanceType(Function) === 'Function';
 */
export const getInstanceType = (value: any) => {
  const type = getType(value);
  if (type === 'Object') {
    if (getPrototype(value)) {
      return getPrototype(value).constructor.name;
    }
    return getPrototype(value);
  }
  return type;
};

/**
 * @description Check if the value is Object
 * @description object、function 类型为 true
 * @description Primitive 类型为 false
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
    isEmptyObject(value)
  );
}

/**
 * @description Asserts that the value is void. `undefined`, `null`
 */
export function isVoid(value: any): value is void {
  return value === undefined;
}

/**
 * @description 判断是不是 dev 环境
 */
export const isDevProcess = process.env.NODE_ENV === 'development';
/**
 * @description 判断是不是 prod 环境
 */
export const isProdProcess = process.env.NODE_ENV === 'production';
/**
 * @description 判断是不是非 prod 环境
 */
export const isNotProdProcess = process.env.NODE_ENV !== 'production';
/**
 * @description 判断是不是 test 环境
 */
export const isTestProcess = process.env.NODE_ENV === 'test';
export const isClient = typeof window === 'object';
export const isServer = typeof window === 'undefined';
