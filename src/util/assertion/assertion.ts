import type { Dict, NonUndefined, Primitive, Falsy, Nil } from '@/util';

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
  | 'BigInt';

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

/**
 * Asserts that the value is Falsy. `false`, `0`, `''`, `null`, `undefined`
 * @param value
 */
export function isFalsy(value: any): value is Falsy {
  return value === false || value === '' || value === 0 || value === null || value === undefined;
}

export function isNil(value: any): value is Nil {
  return value === undefined || value === null;
}
export const isDefinedAndInitialize = <T>(value: T): value is NonNullable<T> => {
  return typeof value !== 'undefined' && value !== undefined && value !== null;
};

export const isNotNil = <T>(value: T) => isDefinedAndInitialize(value);

export const isUndefined = <T>(value: T | undefined): value is undefined => {
  return typeof value === 'undefined' || value === undefined;
};

export const isDefined = <T>(value: T): value is NonUndefined<T> => {
  return typeof value !== 'undefined' && value !== undefined;
};

export const isNull = (value: any): value is null => value === null;

export const isNotNull = <T>(value: T): value is NonNullable<T> => value !== null;

export const isEmptyArray = (value: any): value is [] =>
  isArray(value) && value.length === 0 && isUndefined(value[0]);

export const isEmptyArrayLike = <T>(value: any): value is ArrayLike<T> =>
  isArrayLike(value) && value.length === 0 && isUndefined(value[0]);

export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

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
  return value === undefined;
}

export const isDevProcess = process.env.NODE_ENV !== 'production';
export const isProdProcess = process.env.NODE_ENV === 'production';
export const isTestProcess = process.env.NODE_ENV === 'test';
export const isClient = typeof window === 'object';
