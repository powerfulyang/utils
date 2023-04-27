import 'reflect-metadata';

export const requiredMetadataKey = Symbol('required');

/**
 * Decorator: Indicates that a parameter is required.
 * 需要配合 @Validate 注解使用
 */
export const Required = (): ParameterDecorator => (target, propertyKey, parameterIndex) => {
  if (propertyKey) {
    const existingRequiredParameters =
      Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
  }
};
