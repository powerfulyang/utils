import ip from 'ip';

export const ipV4ToLong = (ipStr: string): number => {
  return ip.toLong(ipStr);
};

export const ipV4FromLong = (ipLong: number): string => {
  return ip.fromLong(ipLong);
};
