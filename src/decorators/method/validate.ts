import { isUndefined } from '@/utils';
import 'reflect-metadata';
import { requiredMetadataKey } from '../parameter';

export const Validate =
  (): MethodDecorator => (target, propertyName, descriptor: TypedPropertyDescriptor<any>) => {
    const method = descriptor.value;
    Reflect.set(descriptor, 'value', function validate(this: any, ...args: any[]) {
      const requiredParameters = Reflect.getMetadata(requiredMetadataKey, target, propertyName);
      if (requiredParameters.length) {
        requiredParameters.forEach((parameterIndex: number) => {
          if (isUndefined(args[parameterIndex])) {
            throw new Error(`Missing required parameter at index ${parameterIndex}`);
          }
        });
      }
      return method.apply(this, args);
    });
  };
