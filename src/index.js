import _ from 'lodash';
import fs from 'fs';
import parser from './parsers/parser';


const compareOfFiles = (fileBefore, fileAfter) => {
  const allKeys = _.union(_.keys(fileBefore), _.keys(fileAfter))
  .map((key) => {
    if (!fileBefore[key]) {
      return { type: 'added', key, new: fileAfter[key] };
    }
    if (!fileAfter[key]) {
      return { type: 'removed', key, old: fileBefore[key] };
    }
    if (fileBefore[key] === fileAfter[key]) {
      return { type: 'unchanged', key, old: fileBefore[key] };
    }
    if (_.isObject(fileBefore[key]) && _.isObject(fileAfter[key])) {
      return { type: 'unchanged', key, child: [...compareOfFiles(fileBefore[key], fileAfter[key])] };
    }
    return { type: 'changed', key, old: fileBefore[key], new: fileAfter[key] };
  });

  return _.flatten(allKeys);
};

const showDifference = (compare) => {
  const output = _.keys(compare)
  .reduce((acc, key) => {
    const file = compare[key];
    switch (file.type) {
      case 'added':
        return `${acc}+ ${file.key}: ${file.new}\n`;
      case 'unchanged':
        return `${acc}  ${file.key}: ${file.old}\n`;
      case 'removed':
        return `${acc}- ${file.key}: ${file.old}\n`;
      default:
        return `${acc}+ ${file.key}: ${file.new}\n- ${file.key}: ${file.old}\n`;
    }
  }, '\n');
  return `\n{${output}}`;
};

const getData = file => fs.readFileSync(file, 'utf8');

const getDiff = (fileBefore, fileAfter) => {
  const fileBeforeParsed = parser(getData(fileBefore), fileBefore);
  const fileAfterParsed = parser(getData(fileAfter), fileAfter);
  const compare = compareOfFiles(fileBeforeParsed, fileAfterParsed);
  const finalOutput = showDifference(compare);
  return finalOutput;
};


export default getDiff;
