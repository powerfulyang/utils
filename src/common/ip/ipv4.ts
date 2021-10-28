import ip from 'ip';

/**
 * IPv4 address to long
 * @param ipAddress
 */
export const ip2long = (ipAddress: string): number => ip.toLong(ipAddress);

/**
 * Long to IPv4 address
 * @param ipLong
 */
export const long2ip = (ipLong: number): string => ip.fromLong(ipLong);
