import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import FileService from '../service/file-service';
import {Colors, maxEditorContentLength, globalState} from '../config';
import Dialog from 'react-native-dialog';
import {deserializeMelody} from '../service/device-service';

export default function OpenFileScreen({navigation}) {
  const [files, setFiles] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(false);
  React.useEffect(() => FileService.listLullabyFiles().then(setFiles), []);

  const openFile = async (file) => {
    const fileContent = await FileService.readFile(file);
    const {header, notes} = deserializeMelody(fileContent);

    console.log(JSON.stringify(fileContent.split(' ')));
    if (notes.length > maxEditorContentLength) {
      // The file is invalid, show a dialog error
      // XXX: more file validity check?
      setShowDialog(true);
    } else {
      console.log(JSON.stringify(notes));
      globalState.workingFile.set(file.name.slice(0, -4));
      globalState.notes.set(notes);
      globalState.bpm.set(header.bpm);
      globalState.beatUnit.set(header.beatUnit);
      globalState.dirtyEditor.set(false);
      navigation.goBack();
    }
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity onPress={() => openFile(item.item)} style={styles.item}>
        <Text>{item.item.name}</Text>
      </TouchableOpacity>
    );
  };

  const emptyListComponent = () => {
    return (
      <View style={styles.centerVertical}>
        <Text>No files found</Text>
      </View>
    );
  };

  const itemSeparatorComponent = () => {
    return <View style={styles.separator} />;
  };

  if (files == null) {
    return (
      <View style={styles.centerVertical}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text>Loading files...</Text>
      </View>
    );
  }

  const closeDialog = () => setShowDialog(false);

  return (
    <>
      <FlatList
        data={files}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={emptyListComponent()}
        ItemSeparatorComponent={itemSeparatorComponent}
      />
      <Dialog.Container visible={showDialog}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Description>The given file is invalid</Dialog.Description>
        <Dialog.Button label="OK" onPress={closeDialog} />
      </Dialog.Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  centerVertical: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  item: {
    flex: 1,
    padding: 20
  },
  separator: {
    borderBottomColor: '#AAA',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginRight: 5
  }
});
