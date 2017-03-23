import _ from 'lodash';

const compareData = (oldFile, newFile) => {
  const allKeys = _.union(_.keys(oldFile), _.keys(newFile))
  .map((key) => {
    if (!oldFile[key]) {
      return { type: 'added', key, value: newFile[key] };
    }
    if (!newFile[key]) {
      return { type: 'removed', key, value: oldFile[key] };
    }
    if (oldFile[key] === newFile[key]) {
      return { type: 'unchanged', key, value: oldFile[key] };
    }
    if (_.isObject(oldFile[key])) {
      return { type: 'parent', key, value: compareData(oldFile[key], newFile[key]) };
    }
    return { type: 'changed', key, old: oldFile[key], new: newFile[key] };
  });
  return _.flatten(allKeys);
};

export default compareData;
