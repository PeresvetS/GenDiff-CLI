import _ from 'lodash';
import fs from 'fs';
import parser from './parsers/parser';


const compareOfFiles = (fileBefore, fileAfter) => {
  const allKeys = _.union(_.keys(fileBefore), _.keys(fileAfter));
  return allKeys.map((key) => {
    if (!fileBefore[key]) {
      return { type: 'added', key, new: fileAfter[key] };
    }
    if (!fileAfter[key]) {
      return { type: 'removed', key, old: fileBefore[key] };
    }
    if (fileBefore[key] === fileAfter[key]) {
      return { type: 'unchanged', key, old: fileBefore[key] };
    }
    return { type: 'changed', key, old: fileBefore[key], new: fileAfter[key] };
  });
};

const showDifference = (compare) => {
  const output = _.keys(compare)
  .reduce((acc, key) => {
    const file = compare[key];
    if (file.type === 'added') {
      return `${acc}+ ${file.key}: ${file.new}\n`;
    }
    if (file.type === 'unchanged') {
      return `${acc}  ${file.key}: ${file.old}\n`;
    }
    if (file.type === 'removed') {
      return `${acc}- ${file.key}: ${file.old}\n`;
    }
    return `${acc}+ ${file.key}: ${file.new}\n- ${file.key}: ${file.old}\n`;
  }, '\n');
  return `\n{${output}}`;
};

const getDiff = (fileBefore, fileAfter) => {
  const fileBeforeParsed = parser(fs.readFileSync(fileBefore, 'utf8'), fileBefore);
  const fileAfterParsed = parser(fs.readFileSync(fileAfter, 'utf8'), fileAfter);
  const compare = compareOfFiles(fileBeforeParsed, fileAfterParsed);
  const finalOutput = showDifference(compare);
  return finalOutput;
};


export default getDiff;
