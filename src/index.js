import fs from 'fs';
import path from 'path';
import parse from './lib/parsers';
import getDifference from './lib/renders';
import compareData from './lib/compare';

const getData = file => fs.readFileSync(file, 'utf8');
const getExtFile = file => path.extname(file);

const generateDiff = (oldFile, newFile, format = 'sjson') => {
  const rawDataOld = getData(oldFile);
  const rawDataNew = getData(newFile);

  const extenstionOld = getExtFile(oldFile);
  const extenstionNew = getExtFile(newFile);

  const processedDataOld = parse(rawDataOld, extenstionOld);
  const processedDataNew = parse(rawDataNew, extenstionNew);

  const comparedData = compareData(processedDataOld, processedDataNew);
  const result = getDifference(comparedData, format);
  return result;
};

export default generateDiff;
