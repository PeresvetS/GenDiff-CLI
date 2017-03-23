import _ from 'lodash';


const signs = {
  added: '+',
  parent: '',
  removed: '-',
  unchanged: ' ',
};


const getDiff = (comparedData) => {
  const result = comparedData.reduce((acc, elem) => {
    if (_.isArray(elem.value)) {
      return { ...acc, [`${signs[elem.type]}${elem.key}`]: getDiff(elem.value) };
    }
    if (elem.type === 'changed') {
      return { ...acc, [`+ ${elem.key}`]: elem.new, [`- ${elem.key}`]: elem.old };
    }
    return { ...acc, [`${signs[elem.type]} ${elem.key}`]: elem.value };
  }, {});
  return result;
};

const toStr = comparedData => JSON.stringify(getDiff(comparedData), null, 4)
.replace(/("\+\s)/g, '+ "')
.replace(/("-\s)/g, '- "')
.replace(/(\s"\s\s)/g, '   "')
.replace(/{/, '\n{');


export default toStr;
