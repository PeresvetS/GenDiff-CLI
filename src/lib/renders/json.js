import _ from 'lodash';

const getDiff = (comparedData) => {
  const result = comparedData.reduce((acc, elem) => {
    const { type, key, value, removed, added } = elem;
    switch (type) {
      case 'parent':
        return { ...acc, [key]: getDiff(value) };
      case 'changed':
        return { ...acc, [key]: { added, removed } };
      default :
        return !_.has(acc, [type]) ?
        { ...acc, [type]: { [key]: value } } :
        _.defaultsDeep(acc, { ...acc, [type]: { [key]: value } });
    }
  }, '');
  return result;
};

const toStr = comparedData => JSON.stringify(getDiff(comparedData), '', 2)
.replace(/{/, '\n{');

export default toStr;
