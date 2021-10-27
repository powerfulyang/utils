import ip from 'ip';

export const ipV4ToLong = (ipStr: string): number => ip.toLong(ipStr);

export const ipV4FromLong = (ipLong: number): string => ip.fromLong(ipLong);
