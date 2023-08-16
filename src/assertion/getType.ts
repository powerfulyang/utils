/**
 * @description 常用类型
 */
type Type =
  // 基础类型
  | 'Number'
  | 'String'
  | 'Boolean'
  | 'Symbol'
  | 'BigInt'
  | 'Null'
  | 'Undefined'
  // 常用引用类型
  | 'Array'
  | 'Object'
  | 'Function'
  | 'Blob'
  | 'Date'
  | 'RegExp'
  | 'Error'
  | 'Map'
  | 'Set'
  | 'WeakMap'
  | 'WeakSet'
  | 'Promise'
  | 'GeneratorFunction'
  | 'Generator'
  | 'AsyncFunction'
  | 'File'
  | 'FormData'
  | string;

/**
 * @description 获取检测值的类型
 * @param value - 要检测的值
 */
export const getType = (value: any): Type => {
  return Object.prototype.toString.call(value).slice(8, -1) as Type;
};
