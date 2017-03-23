import diffOfFiles from '../src';

const correctSimple = `
{
      host: hexlet.io
    + timeout: 20
    - timeout: 50
    - proxy: 123.234.53.22
    + verbose: true
}`;

const correctAttach = `
{
    common: {
          setting1: Value 1
        - setting2: 200
          setting3: true
        - setting6: {
            key: value
        }
        + setting4: blah blah
        + setting5: {
            key5: value5
        }
    }
    group1: {
        + baz: bars
        - baz: bas
          foo: bar
    }
    - group2: {
        abc: 12345
    }
    + group3: {
        fee: 100500
    }
}`;

const correctPlain = `
Property 'timeout' was updated. From '50' to '20'
Property 'proxy' was removed
Property 'common.setting4' was removed
Property 'common.setting5' was removed
Property 'common.setting2' was added with value: 200
Property 'common.setting6' was added with complex value
Property 'group1.baz' was updated. From 'bars' to 'bas'
Property 'group3' was removed
Property 'verbose' was added with value: true
Property 'group2' was added with complex value`;

test('correct differences of json', () => {
  const fileBefore = '__tests__/fixtures/json/before.json';
  const fileAfter = '__tests__/fixtures/json/after.json';
  expect(diffOfFiles(fileBefore, fileAfter)).toBe(correctSimple);
});

test('correct differences of yml', () => {
  const fileBefore = '__tests__/fixtures/yaml/before.yml';
  const fileAfter = '__tests__/fixtures/yaml/after.yml';
  expect(diffOfFiles(fileBefore, fileAfter)).toBe(correctSimple);
});

test('correct differences of ini', () => {
  const fileBefore = '__tests__/fixtures/ini/before.ini';
  const fileAfter = '__tests__/fixtures/ini/after.ini';
  expect(diffOfFiles(fileBefore, fileAfter)).toBe(correctSimple);
});

test('correct differences of json', () => {
  const fileBefore = '__tests__/fixtures/json/beforeAttach.json';
  const fileAfter = '__tests__/fixtures/json/afterAttach.json';
  expect(diffOfFiles(fileBefore, fileAfter)).toBe(correctAttach);
});

test('correct differences of yml', () => {
  const fileBefore = '__tests__/fixtures/yaml/beforeAttach.yml';
  const fileAfter = '__tests__/fixtures/yaml/afterAttach.yml';
  expect(diffOfFiles(fileBefore, fileAfter)).toBe(correctAttach);
});

test('correct differences of ini', () => {
  const fileBefore = '__tests__/fixtures/ini/beforeAttach.ini';
  const fileAfter = '__tests__/fixtures/ini/afterAttach.ini';
  expect(diffOfFiles(fileBefore, fileAfter)).toBe(correctAttach);
});

test('correct differences of json', () => {
  const fileBefore = '__tests__/fixtures/json/beforePlain.json';
  const fileAfter = '__tests__/fixtures/json/afterPlain.json';
  expect(diffOfFiles(fileBefore, fileAfter, 'plain')).toBe(correctPlain);
});

test('correct differences of yml', () => {
  const fileBefore = '__tests__/fixtures/yaml/beforePlain.yml';
  const fileAfter = '__tests__/fixtures/yaml/afterPlain.yml';
  expect(diffOfFiles(fileBefore, fileAfter, 'plain')).toBe(correctPlain);
});

test('correct differences of ini', () => {
  const fileBefore = '__tests__/fixtures/ini/beforePlain.ini';
  const fileAfter = '__tests__/fixtures/ini/afterPlain.ini';
  expect(diffOfFiles(fileBefore, fileAfter, 'plain')).toBe(correctPlain);
});
