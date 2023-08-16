import { describe, expect, it } from '@jest/globals';
import { getType } from './getType';

describe('getType', () => {
  it('Primitive Type', () => {
    expect(getType(undefined)).toBe('Undefined');
    expect(getType(null)).toBe('Null');
    expect(getType(true)).toBe('Boolean');
    expect(getType(1)).toBe('Number');
    expect(getType('string')).toBe('String');
    expect(getType(Symbol('symbol'))).toBe('Symbol');
    expect(getType(BigInt(1))).toBe('BigInt');
  });

  it('Object Type', () => {
    expect(getType([])).toBe('Array');
    expect(getType({})).toBe('Object');
    expect(getType(() => {})).toBe('Function');
    expect(getType(new Blob())).toBe('Blob');
    expect(getType(new Date())).toBe('Date');
    expect(getType(/regexp/)).toBe('RegExp');
    expect(getType(new Error())).toBe('Error');
    expect(getType(new Map())).toBe('Map');
    expect(getType(new Set())).toBe('Set');
    expect(getType(new WeakMap())).toBe('WeakMap');
    expect(getType(new WeakSet())).toBe('WeakSet');
    expect(getType(new Promise(() => {}))).toBe('Promise');
    expect(
      getType(function* y() {
        yield 1;
      }),
    ).toBe('GeneratorFunction');
    expect(
      getType(
        function* y() {
          yield 1;
        }.call(this),
      ),
    ).toBe('Generator');
    expect(getType(async () => {})).toBe('AsyncFunction');
    expect(getType(new File([], 'test.txt', { type: 'text/plain' }))).toBe('File');
    expect(getType(new FormData())).toBe('FormData');
  });
});
