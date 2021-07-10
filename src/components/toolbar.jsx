import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Colors, globalState} from '../config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useState} from '@hookstate/core';
import {HiddenItem, OverflowMenu} from 'react-navigation-header-buttons';
import Dialog from 'react-native-dialog';
import FileService from '../service/file-service';
import {
  serializeMelody,
  saveMelody,
  playMelody,
  loadMelody
} from '../service/device-service';

export default function Toolbar({navigation}) {
  const state = useState(globalState);
  const [showFileNameDialog, setShowFileNameDialog] = React.useState(false);
  const [showOpenFileConfirmation, setShowOpenFileConfirmation] =
    React.useState(false);
  const [showOverwriteDialog, setShowOverwriteDialog] = React.useState(false);
  const [fileName, setFileName] = React.useState('');

  const toggleAudio = () => {
    state.playLive.set(!state.playLive.value);
  };

  const onPlayClick = () => {
    playMelody();
  };

  const onSaveClick = () => {
    saveFile(state.workingFile.value);
  };

  const saveFile = (file) => {
    const serializedMelody = serializeMelody(
      state.notes.value,
      state.bpm.value,
      state.beatUnit.value
    );
    FileService.saveFile(file, serializedMelody);
    state.dirtyEditor.set(false);
  };

  const onSaveAsClick = () => {
    setShowFileNameDialog(true);
  };

  const onExportClick = () => {
    saveMelody(state.notes.value, state.bpm.value, state.beatUnit.value);
  };

  const onOpenClick = () => {
    if (state.dirtyEditor.value) {
      setShowOpenFileConfirmation(true);
    } else {
      navigation.navigate('OpenFile');
    }
  };

  const confirmOpenFile = async () => {
    await setShowOpenFileConfirmation(false);
    navigation.navigate('OpenFile');
  };

  const onSettingsClick = () => {
    navigation.navigate('Settings');
  };

  const cancelOpenFile = () => setShowOpenFileConfirmation(false);

  const onImportClick = async () => {
    const {header, notes} = await loadMelody();

    if (notes.length > state.maxEditorContentLength.value) {
      // For this session, extends the maxEditorContentLength to match the melody.
      state.maxEditorContentLength.value = notes.length;
    }

    state.notes.set(notes);
    state.bpm.set(header.bpm);
    state.beatUnit.set(header.beatUnit);
    state.dirtyEditor.set(true);
  };

  const overflowIcon = () => (
    <MaterialIcons name="more-vert" style={styles.iconOverflow} />
  );

  const cancelFileNameDialog = () => {
    setShowFileNameDialog(false);
  };

  const confirmFileNameDialog = () => {
    if (FileService.fileExists(fileName)) {
      setShowOverwriteDialog(true);
      setShowFileNameDialog(false);
    } else {
      saveFile(fileName);
      setShowFileNameDialog(false);
      state.workingFile.set(fileName);
    }
  };

  const cancelOverwriteDialog = async () => {
    setShowOverwriteDialog(false);
    setShowFileNameDialog(true);
  };

  const confirmOverwriteDialog = () => {
    saveFile(fileName);
    setShowOverwriteDialog(false);
    state.workingFile.set(fileName);
  };

  return (
    <View style={styles.toolbar}>
      {state.connectedDevice.value != null && (
        <>
          <TouchableOpacity onPress={toggleAudio}>
            <MaterialIcons
              style={styles.icon}
              name={state.playLive.value ? 'volume-up' : 'volume-off'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPlayClick}>
            <MaterialIcons style={styles.icon} name="play-circle-outline" />
          </TouchableOpacity>
        </>
      )}

      <OverflowMenu OverflowIcon={overflowIcon}>
        {state.workingFile.value != null && (
          <HiddenItem title="Save" onPress={onSaveClick} />
        )}
        <HiddenItem title="Save as..." onPress={onSaveAsClick} />
        <HiddenItem title="Open..." onPress={onOpenClick} />
        {state.connectedDevice.value != null && (
          <>
            <HiddenItem title="Import from device" onPress={onImportClick} />
            <HiddenItem title="Export to device" onPress={onExportClick} />
          </>
        )}
        <HiddenItem title="Settings" onPress={onSettingsClick} />
      </OverflowMenu>

      <Dialog.Container visible={showOverwriteDialog}>
        <Dialog.Title>Confirm Overwrite</Dialog.Title>
        <Dialog.Description>
          A file with the same name exists already. Do you want to overwrite it?
        </Dialog.Description>
        <Dialog.Button label="Yes" onPress={confirmOverwriteDialog} />
        <Dialog.Button label="No" onPress={cancelOverwriteDialog} />
      </Dialog.Container>

      <Dialog.Container visible={showFileNameDialog}>
        <Dialog.Title>File Name</Dialog.Title>
        <Dialog.Description>Select the file name</Dialog.Description>
        <Dialog.Input value={fileName} onChangeText={setFileName} />
        <Dialog.Button label="OK" onPress={confirmFileNameDialog} />
        <Dialog.Button label="Cancel" onPress={cancelFileNameDialog} />
      </Dialog.Container>

      <Dialog.Container visible={showOpenFileConfirmation}>
        <Dialog.Title>Unsaved Changes</Dialog.Title>
        <Dialog.Description>
          There are unsaved changes that will be lost. Are you sure you want to
          proceed?
        </Dialog.Description>
        <Dialog.Button label="OK" onPress={confirmOpenFile} />
        <Dialog.Button label="Cancel" onPress={cancelOpenFile} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.primary
  },
  icon: {
    color: '#fff',
    flex: 1,
    fontSize: 30,
    textAlignVertical: 'center',
    padding: 10
  },
  iconOverflow: {
    color: '#fff',
    fontSize: 30
  }
});
