const symbol = Symbol('Default');
export const Required = (): ParameterDecorator => (target, propertyKey, parameterIndex) => {
    const existingRequiredParameters: number[] =
      Reflect.getOwnMetadata(symbol, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(symbol, existingRequiredParameters, target, propertyKey);
  };
