const symbol = Symbol('ToEnUsNumberString');
export const ToEnUSNumberString = (): PropertyDecorator => (target: Object, propertyKey) => {
  Reflect.defineProperty(target, propertyKey, {
    get: () =>
      Reflect.getMetadata(symbol, target, propertyKey).toLocaleString('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }),
    set: (v: number) => {
      Reflect.defineMetadata(symbol, v, target, propertyKey);
    },
  });
};
