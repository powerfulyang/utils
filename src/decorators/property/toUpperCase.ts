import 'reflect-metadata';

const symbol = Symbol('ToLocaleString');

export const ToUpperCase = (): PropertyDecorator => (target, propertyKey) => {
  Reflect.defineProperty(target, propertyKey, {
    get: () => {
      const v = Reflect.getMetadata(symbol, target, propertyKey) as string;
      return v.toUpperCase();
    },
    set: (v: number) => {
      Reflect.defineMetadata(symbol, v, target, propertyKey);
    },
  });
};
