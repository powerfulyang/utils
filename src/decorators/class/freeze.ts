import { ConstructorFunction } from '../../types';

export const Freeze = () => {
  return <T extends ConstructorFunction>(constructor: T) => {
    return class extends constructor {
      constructor(...rest: any[]) {
        super(...rest);
        Reflect.ownKeys(this).forEach((item) => {
          const val = Reflect.get(this, item);
          Reflect.defineProperty(this, item, {
            set: () => {},
            get: () => val,
          });
        });
        Reflect.preventExtensions(this);
      }
    };
  };
};
