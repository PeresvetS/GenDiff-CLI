import getDiffFromPlain from './plain';
import getDiffFromExtended from './extended';

const rendering = (comparedData) => {
  const type = 'extended';
  switch (type) {
    case 'extended':
      return getDiffFromExtended(comparedData);
    case 'plain':
      return getDiffFromPlain(comparedData);
    default:
      throw new Error('Incorrect file contents.');
  }
};

export default rendering;
