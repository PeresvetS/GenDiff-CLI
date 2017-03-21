import _ from 'lodash';
import fs from 'fs';


const comparison = (file1, file2) => {
  const allKeys = _.union(_.keys(file1), _.keys(file2));
  return allKeys.map((key) => {
    if (!file1[key]) {
      return { type: 'added', key, new: file2[key] };
    }
    if (!file2[key]) {
      return { type: 'removed', key, old: file1[key] };
    }
    if (file1[key] === file2[key]) {
      return { type: 'unchanged', key, old: file1[key] };
    }
    return { type: 'changed', key, old: file1[key], new: file2[key] };
  });
};

const parse = (diff) => {
  const output = _.keys(diff)
  .reduce((acc, key) => {
    const value = diff[key];
    if (value.type === 'added') {
      return `${acc}+ ${value.key}: ${value.new}\n`;
    }
    if (value.type === 'unchanged') {
      return `${acc}  ${value.key}: ${value.old}\n`;
    }
    if (value.type === 'removed') {
      return `${acc}- ${value.key}: ${value.old}\n`;
    }
    return `${acc}+ ${value.key}: ${value.new}\n- ${value.key}: ${value.old}\n`;
  }, '\n');
  return `\n{${output}}`;
};

const getDiff = (file1, file2) => {
  if (fs.exists(file1)) {
    throw new Error(`File ${file1} doesn't exists`);
  }
  if (fs.exists(file2)) {
    throw new Error(`File ${file2} doesn't exists`);
  }

  const file1Parse = JSON.parse(fs.readFileSync(file1));
  const file2Parse = JSON.parse(fs.readFileSync(file2));

  const finalOutput = parse(comparison(file1Parse, file2Parse));
  return finalOutput;
};


export default getDiff;
