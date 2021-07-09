import {fileExtension, fileEncoding} from '../config';

var RNFS = require('react-native-fs');

const fileDir = RNFS.ExternalDirectoryPath;
export default class FileService {
  static async saveFile(fileName, content) {
    const path = fileDir + '/' + fileName + fileExtension;
    try {
      await RNFS.writeFile(path, content, fileEncoding);
      console.log('File written to ' + path);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async readFile(file) {
    return await RNFS.readFile(file.path, fileEncoding);
  }

  static async fileExists(fileName) {
    const path = fileDir + '/' + fileName + fileExtension;
    return await RNFS.exists(path);
  }

  static async listLullabyFiles() {
    const files = await RNFS.readDir(fileDir);
    return files
      .filter((f) => f.isFile())
      .filter((f) => f.name.endsWith(fileExtension));
  }
}
