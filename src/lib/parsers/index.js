import jsonParse from './jsonParser';
import yamlParse from './yamlParser';
import iniParse from './iniParser';

const parse = (file, extension) => {
  switch (extension) {
    case '.json':
      return jsonParse(file);
    case '.yml' || '.yaml':
      return yamlParse(file);
    case '.ini':
      return iniParse(file);
    default :
      throw new Error(`Format ${extension} is not supported!`);
  }
};
export default parse;
