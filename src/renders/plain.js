import _ from 'lodash';

const getDifference = (comparedData) => {
  const result = _.keys(comparedData)
  .slice()
  .reduce((acc, key) => {
    const data = comparedData[key];
    switch (data.type) {
      case 'added':
        return `${acc}+ ${data.key}: ${data.value}\n`;
      case 'unchanged':
        return `${acc}  ${data.key}: ${data.value}\n`;
      case 'removed':
        return `${acc}- ${data.key}: ${data.value}\n`;
      default:
        return `${acc}+ ${data.key}: ${data.new}\n- ${data.key}: ${data.old}\n`;
    }
  }, '\n');
  return `\n{${result}}`;
};

export default getDifference;
