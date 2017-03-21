import jsonParser from './jsonParser';
import yamlParser from './yamlParser';

const parser = (file, path) => {
  const [other, format] = path.split('.');
  switch (format) {
    case 'json':
      return jsonParser(file);
    case 'yml':
      return yamlParser(file);
    default :
      return 'bad format';
  }
};
export default parser;
