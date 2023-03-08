export const noop = () => {};

export const iife = <T>(fn: () => T) => {
  return fn();
};
