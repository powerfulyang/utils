import { Freeze } from '../../dist/main';

it('test @freeze', function () {
  @Freeze()
  class Test {
    freezeName: string;
    writableName: string;
    constructor(val: string, val2: string) {
      this.freezeName = val;
      this.writableName = val2;
    }
  }
  const test = new Test('str', 'str2');
  test.freezeName = 'str2';
  expect(test.freezeName).toBe('str');
  test.writableName = 'str';
  expect(test.writableName).toBe('str2');
});
