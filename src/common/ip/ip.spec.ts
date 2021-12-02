import { long2ip, ip2long } from './ipv4';

describe('ip convert test', () => {
  it('ip地址转long', () => {
    const ipLong = ip2long('127.0.0.1');
    expect(ipLong).toBe(2130706433);
    const ipAddress = long2ip(ipLong);
    expect(ipAddress).toBe('127.0.0.1');
  });
});
