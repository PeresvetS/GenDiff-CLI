import _ from 'lodash';
import fs from 'fs';
import parse from './parsers/parser';


const compareData = (oldFile, newFile) => {
  const allKeys = _.union(_.keys(oldFile), _.keys(newFile))
  .map((key) => {
    if (!oldFile[key]) {
      return { type: 'added', key, new: newFile[key] };
    }
    if (!oldFile[key]) {
      return { type: 'removed', key, old: oldFile[key] };
    }
    if (oldFile[key] === newFile[key]) {
      return { type: 'unchanged', key, old: oldFile[key] };
    }
    if (_.isObject(oldFile[key]) && _.isObject(newFile[key])) {
      return { type: 'unchanged', key, child: [...compareData(oldFile[key], newFile[key])] };
    }
    return { type: 'changed', key, old: oldFile[key], new: newFile[key] };
  });

  return _.flatten(allKeys);
};

const getDifference = (comparedData) => {
  const result = _.keys(comparedData)
  .reduce((acc, key) => {
    const file = comparedData[key];
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
  return `\n{${result}}`;
};

const getData = file => fs.readFileSync(file, 'utf8');

const differenceOfFiles = (oldFile, newFile) => {
  const rawDataOld = getData(oldFile);
  const rawDataNew = getData(newFile);

  const processedDataOld = parse(rawDataOld, oldFile);
  const processedDataNew = parse(rawDataNew, newFile);

  const comparedData = compareData(processedDataOld, processedDataNew);
  const result = getDifference(comparedData);
  return result;
};


export default differenceOfFiles;
