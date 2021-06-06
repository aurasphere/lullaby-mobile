import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {globalState} from '../global-state';
import {useState} from '@hookstate/core';

export default function Toolbar() {
  const state = useState(globalState);

  const toggleAudio = () => {
    state.playLive.set(!state.playLive.value);
  };

  const play = () => {};

  const save = () => {};

  const load = () => {};

  return (
    <View style={styles.toolbar}>
      <TouchableOpacity onPress={toggleAudio}>
        <MaterialIcons
          style={styles.icon}
          name={state.playLive.value ? 'volume-up' : 'volume-off'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={save}>
        <MaterialIcons style={styles.icon} name="save" />
      </TouchableOpacity>
      <TouchableOpacity onPress={load}>
        <MaterialIcons style={styles.icon} name="upload-file" />
      </TouchableOpacity>
      <TouchableOpacity onPress={play}>
        <MaterialIcons style={styles.icon} name="play-circle-outline" />
      </TouchableOpacity>
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
    padding: 5
  }
});
