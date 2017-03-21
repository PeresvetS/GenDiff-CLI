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
  const file1 = '__tests__/fixtures/before.json';
  const file2 = '__tests__/fixtures/after.json';
  expect(diffOfFiles(file1, file2)).toBe(correct);
});

test('correct differences of yml', () => {
  const file1 = '__tests__/fixtures/before.yml';
  const file2 = '__tests__/fixtures/after.yml';
  expect(diffOfFiles(file1, file2)).toBe(correct);
});

test('correct differences of ini', () => {
  const file1 = '__tests__/fixtures/before.ini';
  const file2 = '__tests__/fixtures/after.ini';
  expect(diffOfFiles(file1, file2)).toBe(correct);
});
