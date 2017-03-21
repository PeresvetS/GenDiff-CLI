import jsonParser from './jsonParser';
import yamlParser from './yamlParser';
import iniParser from './iniParser';

const parser = (file, path) => {
  const format = path.split('.')[1];
  switch (format) {
    case 'json':
      return jsonParser(file);
    case 'yml':
      return yamlParser(file);
    case 'ini':
      return iniParser(file);
    default :
      return 'bad format';
  }
};
export default parser;
