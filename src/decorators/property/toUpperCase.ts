import 'reflect-metadata';
import { toUpperCase } from '@/format';

const symbol = Symbol('ToLocaleString');
export const ToUpperCase = (): PropertyDecorator => (target, propertyKey) => {
  Reflect.defineProperty(target, propertyKey, {
    get: () => {
      const v = Reflect.getMetadata(symbol, target, propertyKey) as string;
      return toUpperCase(v);
    },
    set: (v: number) => {
      Reflect.defineMetadata(symbol, v, target, propertyKey);
    },
  });
};
