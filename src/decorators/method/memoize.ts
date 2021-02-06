import { ReturnTypedFunction, VoidFunction } from '../../types';

export const Memoize = (hashFunction?: ReturnTypedFunction): MethodDecorator => {
  return (
    _target: Object,
    _propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    if (descriptor.value != null) {
      Reflect.set(descriptor, 'value', getNewFunction(descriptor.value, hashFunction));
    } else if (descriptor.get != null) {
      Reflect.set(descriptor, 'get', getNewFunction(descriptor.value, hashFunction));
    } else {
      throw new Error('Only put a Memoize() decorator on a method or get accessor.');
    }
  };
};

let counter = 0;
function getNewFunction(
  originalMethod: VoidFunction,
  hashFunction?: ReturnTypedFunction,
): ReturnTypedFunction {
  const identifier = ++counter;
  // The function returned here gets called instead of originalMethod.
  return function Func(this: any, ...args: string[]) {
    const propValName = `__memoized_value_${identifier}`;
    const propMapName = `__memoized_map_${identifier}`;

    let returnedValue;

    if (hashFunction || args.length > 0) {
      // Get or create map
      if (!this.hasOwnProperty(propMapName)) {
        Reflect.defineProperty(this, propMapName, {
          configurable: false,
          enumerable: false,
          writable: false,
          value: new Map<any, any>(),
        });
      }
      const myMap: Map<any, any> = Reflect.get(this, propMapName);

      let [hashKey] = args;

      if (hashFunction) {
        hashKey = hashFunction.apply(this, args);
      }

      if (myMap.has(hashKey)) {
        returnedValue = myMap.get(hashKey);
      } else {
        returnedValue = originalMethod.apply(this, args);
        myMap.set(hashKey, returnedValue);
      }
    } else if (this.hasOwnProperty(propValName)) {
      returnedValue = Reflect.get(this, propValName);
    } else {
      returnedValue = originalMethod.apply(this, args);
      Reflect.defineProperty(this, propValName, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: returnedValue,
      });
    }
    return returnedValue;
  };
}
