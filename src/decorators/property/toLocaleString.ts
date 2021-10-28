import { formatMoney } from '../../format';

const symbol = Symbol('ToLocaleString');
export const ToLocaleString = (): PropertyDecorator => (target: Object, propertyKey) => {
  Reflect.defineProperty(target, propertyKey, {
    get: () => {
      const v = Reflect.getMetadata(symbol, target, propertyKey);
      return formatMoney(v);
    },
    set: (v: number) => {
      Reflect.defineMetadata(symbol, v, target, propertyKey);
    },
  });
};
