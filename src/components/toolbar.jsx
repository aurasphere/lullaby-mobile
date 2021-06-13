import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Colors} from '../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {globalState} from '../global-state';
import {useState} from '@hookstate/core';
import {HiddenItem, OverflowMenu} from 'react-navigation-header-buttons';
import {loadFile, saveFile} from '../service/file-service';
import Dialog from 'react-native-dialog';

export default function Toolbar() {
  const state = useState(globalState);
  const [showFileNameDialog, setShowFileNameDialog] = React.useState(false);
  const [fileName, setFileName] = React.useState('');

  const toggleAudio = () => {
    state.playLive.set(!state.playLive.value);
  };

  const onPlayClick = () => {};

  const onSaveClick = () => {
    setShowFileNameDialog(true);
  };

  const onExportClick = () => {};

  const onLoadClick = () => {
    loadFile();
  };

  const onImportClick = () => {};

  const onSettingsClick = () => {};

  const overflowIcon = () => (
    <MaterialIcons name="more-vert" style={styles.iconOverflow} />
  );

  const cancelFileNameDialog = () => {
    setShowFileNameDialog(false);
  };

  const confirmFileNameDialog = () => {
    saveFile(fileName);
    setShowFileNameDialog(false);
  };

  return (
    <View style={styles.toolbar}>
      <TouchableOpacity onPress={toggleAudio}>
        <MaterialIcons
          style={styles.icon}
          name={state.playLive.value ? 'volume-up' : 'volume-off'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPlayClick}>
        <MaterialIcons style={styles.icon} name="play-circle-outline" />
      </TouchableOpacity>
      <OverflowMenu OverflowIcon={overflowIcon}>
        <HiddenItem title="Save to file" onPress={onSaveClick} />
        <HiddenItem title="Save to file as..." onPress={onSaveClick} />
        <HiddenItem
          title="Export to connected device"
          onPress={onExportClick}
        />
        <HiddenItem title="Load from file" onPress={onLoadClick} />
        <HiddenItem
          title="Import from connected device"
          onPress={onImportClick}
        />
      </OverflowMenu>

      <Dialog.Container visible={showFileNameDialog}>
        <Dialog.Title>File Name</Dialog.Title>
        <Dialog.Description>Select the file name.</Dialog.Description>
        <Dialog.Input value={fileName} onChangeText={setFileName} />
        <Dialog.Button label="OK" onPress={confirmFileNameDialog} />
        <Dialog.Button label="Cancel" onPress={cancelFileNameDialog} />
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
