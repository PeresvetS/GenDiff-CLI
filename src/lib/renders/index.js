import getDiffSjson from './sjson';
import getDiffPlain from './plain';

const rendering = (comparedData, format) => {
  switch (format) {
    case 'plain':
      return getDiffPlain(comparedData);
    case 'sjson':
      return getDiffSjson(comparedData);
    default:
      throw new Error(`Incorrect file ${format}`);
  }
};

export default rendering;
