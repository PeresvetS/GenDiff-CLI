import jsonParse from './jsonParser';
import yamlParse from './yamlParser';
import iniParse from './iniParser';

const parse = (file, path) => {
  const format = path.split('.')[1];
  switch (format) {
    case 'json':
      return jsonParse(file);
    case 'yml':
      return yamlParse(file);
    case 'ini':
      return iniParse(file);
    default :
      throw new Error(`Format ${format} is not supported!`);
  }
};
export default parse;
