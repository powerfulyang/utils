import type { ConstructorFunction } from '@/util';

export const Freeze =
  () =>
  <T extends ConstructorFunction>(constructor: T) =>
    class extends constructor {
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
