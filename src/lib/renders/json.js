const getDiff = comparedData => comparedData.reduce((acc, elem) => {
  const { type, key, value } = elem;
  switch (type) {
    case 'parent':
      return { ...acc, [key]: getDiff(value) };
    case 'changed':
      return { ...acc, [key]: { added: elem.added, removed: elem.removed } };
    case 'added':
      return { ...acc, [key]: { added: value } };
    case 'removed':
      return { ...acc, [key]: { removed: value } };
    case 'unchanged':
      return { ...acc, [key]: value };
    default :
      return { key: 'undefined' };
  }
}, '');

const toStr = comparedData => JSON.stringify(getDiff(comparedData), '', 2);

export default toStr;
