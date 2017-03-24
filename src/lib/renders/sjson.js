const signs = {
  added: '+',
  removed: '-',
  unchanged: ' ',
};

const getDiff = (comparedData) => {
  const result = comparedData.reduce((acc, elem) => {
    const { type, key, value, removed, added } = elem;
    switch (type) {
      case 'parent':
        return { ...acc, [key]: getDiff(value) };
      case 'changed':
        return { ...acc, [`+ ${key}`]: added, [`- ${key}`]: removed };
      default:
        return { ...acc, [`${signs[type]} ${key}`]: value };
    }
  }, '');
  return result;
};

const toStr = comparedData => JSON.stringify(getDiff(comparedData), null, 4)
.replace(/"|,/g, '')
.replace(/{/, '\n{');

export default toStr;
