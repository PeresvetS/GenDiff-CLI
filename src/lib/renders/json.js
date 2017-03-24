const signs = {
  added: '(+)',
  removed: '(-)',
  unchanged: '',
};

const getDiff = (comparedData) => {
  const result = comparedData.reduce((acc, elem) => {
    const { type, key, value, rem, add } = elem;
    switch (type) {
      case 'parent':
        return { ...acc, [key]: getDiff(value) };
      case 'changed':
        return { ...acc, [`(+)${key}`]: add, [`(-)${key}`]: rem };
      default:
        return { ...acc, [`${signs[type]}${key}`]: value };
    }
  }, '');
  return result;
};

const toStr = comparedData => JSON.stringify(getDiff(comparedData), '', 2)
.replace(/{/, '\n{');

export default toStr;
