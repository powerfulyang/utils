export type BuiltIn =
  | Function
  | Error
  | Date
  | { readonly [Symbol.toStringTag]: string }
  | RegExp
  | Generator;

export type DeepReadonly<T> = {
  +readonly [K in keyof T]: T[K] extends BuiltIn ? T[K] : DeepReadonly<T[K]>;
};
