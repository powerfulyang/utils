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
