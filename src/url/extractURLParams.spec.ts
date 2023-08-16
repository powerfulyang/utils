import { describe, expect, it } from '@jest/globals';
import { stringify } from 'qs';
import { extractURLParams } from './extractURLParams';

const mapToObj = (map: Map<string, string>) => {
  const obj: Record<string, string> = {};
  map.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};

describe('url', () => {
  it('extractURLParams', () => {
    const str = stringify({
      a: 1,
      b: stringify({
        c: 2,
        d: stringify({
          e: 3,
        }),
      }),
    });
    expect(str).toBe('a=1&b=c%3D2%26d%3De%253D3');
    const params = extractURLParams(str, {
      recursiveKeys: ['b', 'd'],
      favoriteKeys: ['e', 'c'],
    });
    expect(mapToObj(params)).toEqual({
      a: '1',
      b: 'c=2&d=e%3D3',
      c: '2',
      d: 'e=3',
      e: '3',
    });
    expect(Array.from(params.keys())).toEqual(['e', 'c', 'a', 'b', 'd']);
  });

  it('object key sort', () => {
    const obj: Record<any, any> = {};
    obj.a = 1;
    obj.b = 2;
    obj[1] = 3;
    obj[2] = 4;
    obj['1'] = 5;
    expect(obj['1']).toBe(5);
    expect(obj[1]).toBe(5);
    expect(Object.keys(obj)).toEqual(['1', '2', 'a', 'b']);
  });
});
