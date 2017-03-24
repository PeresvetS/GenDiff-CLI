import getDiffSjson from './sjson';
import getDiffPlain from './plain';
import getDiffJson from './json';

const rendering = (comparedData, format) => {
  switch (format) {
    case 'plain':
      return getDiffPlain(comparedData);
    case 'sjson':
      return getDiffSjson(comparedData);
    case 'json':
      return getDiffJson(comparedData);
    default:
      throw new Error(`Incorrect file format ${format}`);
  }
};

export default rendering;
