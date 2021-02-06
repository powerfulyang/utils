const symbol = Symbol('ToEnUsNumberString');
export const ToEnUSNumberString = (): PropertyDecorator => {
  return (target: Object, propertyKey) => {
    Reflect.defineProperty(target, propertyKey, {
      get: () => {
        // check type

        return (<number>Reflect.getMetadata(symbol, target, propertyKey)).toLocaleString('en-US', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        });
      },
      set: (v: any) => {
        Reflect.defineMetadata(symbol, v, target, propertyKey);
      },
    });
  };
};
