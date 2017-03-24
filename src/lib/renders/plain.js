import _ from 'lodash';

const action = {
  added: 'added with ',
  removed: 'removed',
  changed: 'updated. ',
};


const message = (elem) => {
  const { type, value, removed, added } = elem;
  let change;
  if (type === 'added') {
    change = _.isObject(value) ? 'complex value' : `value: ${value}`;
  } else {
    change = (type === 'changed') ? `From '${removed}' to '${added}'` : '';
  }
  return `${action[type]}${change}`;
};

const getDiff = (comparedData, parent) => {
  const path = parent ? `${parent}.` : '';
  const result = comparedData.reduce((acc, elem) => {
    const { type, key, value } = elem;
    switch (type) {
      case 'parent':
        return [...acc, getDiff(value, key)];
      case 'unchanged':
        return '';
      default:
        return [...acc, `\nProperty '${path}${key}' was ${message(elem)}`];
    }
  }, {});
  return result.join('');
};

export default getDiff;
