import { waitFor } from '@/utils/waitFor';

export const waitForPromise = async <T>(promise: Promise<T>, ms = 1000) => {
  const results = await Promise.allSettled([promise, waitFor(ms)]);
  return results[0];
};
