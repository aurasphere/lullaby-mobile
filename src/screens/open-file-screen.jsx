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
import {Colors, globalState} from '../config';
import {deserializeMelody} from '../service/device-service';

export default function OpenFileScreen({navigation}) {
  const [files, setFiles] = React.useState(null);
  React.useEffect(() => FileService.listLullabyFiles().then(setFiles), []);

  const openFile = async (file) => {
    const fileContent = await FileService.readFile(file);
    const {header, notes} = deserializeMelody(fileContent);

    if (notes.length > globalState.maxEditorContentLength.value) {
      // For this session, extends the maxEditorContentLength to match the melody.
      globalState.maxEditorContentLength.set(notes.length);
    }

    globalState.workingFile.set(file.name.slice(0, -4));
    globalState.notes.set(notes);
    globalState.bpm.set(header.bpm);
    globalState.beatUnit.set(header.beatUnit);
    globalState.dirtyEditor.set(false);
    navigation.goBack();
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

  return (
    <FlatList
      data={files}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
      ListEmptyComponent={emptyListComponent()}
      ItemSeparatorComponent={itemSeparatorComponent}
      contentContainerStyle={styles.contentContainerStyle}
    />
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
  },
  contentContainerStyle: {
    flexGrow: 1
  }
});
