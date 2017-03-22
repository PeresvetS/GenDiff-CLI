import _ from 'lodash';


const signs = {
  added: '+ ',
  parent: ' ',
  removed: '- ',
  unchanged: '  ' };


const getDiff = (comparedData) => {
  const result = comparedData.reduce((acc, data) => {
    if (_.isArray(data.value)) {
      return { ...acc, [`${signs[data.type]}${data.key}`]: getDiff(data.value) };
    }
    if (data.type === 'changed') {
      return { ...acc, [`+ ${data.key}`]: data.new, [`- ${data.key}`]: data.old };
    }
    return { ...acc, [`${signs[data.type]}${data.key}`]: data.value };
  }, {});
  console.log(result);
  const toStr = JSON.stringify(result, null, 2).replace(/"|,/g, '');
  return `\n${toStr}`;
};

export default getDiff;
