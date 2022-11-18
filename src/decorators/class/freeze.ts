import type { ConstructorFunction } from '@/utils';

export const Freeze =
  () =>
  <T extends ConstructorFunction>(constructor: T) =>
    class extends constructor {
      constructor(...rest: any[]) {
        super(...rest);
        Object.freeze(this);
      }
    };
