import _ from 'lodash';

const action = {
  added: 'added with ',
  removed: 'removed',
  changed: 'updated. ',
};

const message = (elem) => {
  let change;
  if (elem.type === 'added') {
    change = _.isObject(elem.value) ? 'complex value' : `value: ${elem.value}`;
  } else {
    change = (elem.type === 'changed') ? `From '${elem.old}' to '${elem.new}'` : '';
  }
  return `${action[elem.type]}${change}`;
};

const getDiff = (comparedData, parent) => {
  const path = parent ? `${parent}.` : '';
  const result = comparedData.reduce((acc, elem) => {
    switch (elem.type) {
      case 'parent':
        return [...acc, getDiff(elem.value, elem.key)];
      case 'unchanged':
        return '';
      default:
        return [...acc, `\nProperty '${path}${elem.key}' was ${message(elem)}`];
    }
  }, {});
  return _.join(result, '');
};

export default getDiff;
