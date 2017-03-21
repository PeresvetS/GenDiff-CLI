import diffOfFiles from '../src';

test('correct differences of json', () => {
  const correct = `
{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
+ verbose: true
}`;

  const file1 = '__tests__/testFiles/before.json';
  const file2 = '__tests__/testFiles/after.json';
  expect(diffOfFiles(file1, file2)).toBe(correct);
});
