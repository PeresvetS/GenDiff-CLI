import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers/index';
import getDifference from './renders/index';


const compareData = (oldFile, newFile) => {
  const allKeys = _.union(_.keys(oldFile), _.keys(newFile))
  .map((key) => {
    if (!oldFile[key]) {
      return { type: 'added', key, value: newFile[key] };
    }
    if (!newFile[key]) {
      return { type: 'removed', key, value: oldFile[key] };
    }
    if (oldFile[key] === newFile[key]) {
      return { type: 'unchanged', key, value: oldFile[key] };
    }
    if (_.isObject(oldFile[key])) {
      return { type: 'parent', key, children: compareData(oldFile[key], newFile[key]) };
    }
    return { type: 'changed', key, old: oldFile[key], new: newFile[key] };
  });

  return _.flatten(allKeys);
};

const getData = file => fs.readFileSync(file, 'utf8');
const getExtFile = file => path.extname(file);

const generateDiff = (oldFile, newFile) => {
  const rawDataOld = getData(oldFile);
  const rawDataNew = getData(newFile);

  const extenstionOld = getExtFile(oldFile);
  const extenstionNew = getExtFile(newFile);

  const processedDataOld = parse(rawDataOld, extenstionOld);
  const processedDataNew = parse(rawDataNew, extenstionNew);

  const comparedData = compareData(processedDataOld, processedDataNew);
  const result = getDifference(comparedData);
  return result;
};


export default generateDiff;
