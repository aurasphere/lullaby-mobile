import DocumentPicker from 'react-native-document-picker';
import FileSystem from 'react-native-filesystem';
import {globalState} from '../global-state';

export async function saveFile(fileName) {
  const file = 'lullaby/' + fileName + '.lby';
  if (await FileSystem.fileExists(file)) {
    // TODO ask confirm
  }
  FileSystem.writeToFile(file, globalState.editorContent.value);
}

export async function loadFile() {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles]
    });
    console.log(
      res.uri,
      res.type, // mime type
      res.name,
      res.size
    );
    return await FileSystem.readFile('my-directory/my-file.txt');
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
}
