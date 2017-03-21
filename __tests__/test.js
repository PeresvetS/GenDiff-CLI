import diffOfFiles from '../src';

const correct = `
{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
+ verbose: true
}`;

test('correct differences of json', () => {
  const file1 = '__tests__/testFiles/before.json';
  const file2 = '__tests__/testFiles/after.json';
  expect(diffOfFiles(file1, file2)).toBe(correct);
});

test('correct differences of yml', () => {
  const file1 = '__tests__/testFiles/before.yml';
  const file2 = '__tests__/testFiles/after.yml';
  expect(diffOfFiles(file1, file2)).toBe(correct);
});

test('correct differences of ini', () => {
  const file1 = '__tests__/testFiles/before.ini';
  const file2 = '__tests__/testFiles/after.ini';
  expect(diffOfFiles(file1, file2)).toBe(correct);
});
