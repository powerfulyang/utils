const symbol = Symbol('ToUpperCase');

export const PropertyDecorator =
  (params: string): PropertyDecorator =>
  (target, propertyKey) => {
    // target is the prototype of the class
    // propertyKey is the name of the property
    Reflect.defineMetadata(symbol, params, target, propertyKey);
  };

export const getMetadata = (target: any, propertyKey: string | symbol) => {
  return Reflect.getMetadata(symbol, target, propertyKey);
};
