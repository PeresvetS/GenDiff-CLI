import _ from 'lodash';

// there is function for flat file

const getDifference = (comparedData) => {
  const result = _.keys(comparedData)
  .slice()
  .reduce((acc, key) => {
    const elem = comparedData[key];
    switch (elem.type) {
      case 'added':
        return `${acc}+ ${elem.key}: ${elem.value}\n`;
      case 'unchanged':
        return `${acc}  ${elem.key}: ${elem.value}\n`;
      case 'removed':
        return `${acc}- ${elem.key}: ${elem.value}\n`;
      default:
        return `${acc}+ ${elem.key}: ${elem.new}\n- ${elem.key}: ${elem.old}\n`;
    }
  }, '\n');
  return `\n{${result}}`;
};

export default getDifference;
