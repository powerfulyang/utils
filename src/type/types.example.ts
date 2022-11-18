import type { VoidFunction } from '@/utils';

export class Test {
  constructor(public name: string) {
    this.name = name;
  }

  /**
   * greet
   */
  greet() {
    return `Hello ${this.name}`;
  }
}

type CParameters = ConstructorParameters<typeof Test>;
type FuncParameters = Parameters<typeof Test.prototype.greet>;

export const funcParameters: FuncParameters = [];

export const cParameters: CParameters = ['name'];

export function f1(this: ThisParameterType<string>, a: number, b: number, c: number) {
  return a + b + c + Number(this);
}

export type A = VoidFunction<[number, string]>;

/**
 * link to https://github.com/microsoft/TypeScript/wiki/FAQ#why-are-functions-returning-non-void-assignable-to-function-returning-void
 * void function 可以 declare return any 不会报错
 * 但是实际上使用返回值时 返回值的类型是 void 约等于 undefined
 * 场景类似于
 * const arr : number[] = [];
 * const arr2 : Array<number> = [1,2,3];
 * arr2.forEach(item => arr.push(item));
 * void function 重要的是 返回值忽略 即不使用返回值
 * @param a
 * @param b
 */
const funcA: A = (a, b) => {
  return `${a} ${b}`;
};

export const a = funcA(1, 'a');

const arr: number[] = [];
const arr2: Array<number> = [1, 2, 3];
arr2.forEach((item) => arr.push(item));
