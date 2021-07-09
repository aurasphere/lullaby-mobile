import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Colors, Notes, globalState} from '../../config';
import {useState} from '@hookstate/core';

export default function OctaveKey() {
  const state = useState(globalState);

  const incrementOctave = () =>
    state.octave.set((octave) =>
      octave === Notes.maxOctave ? Notes.minOctave : octave + 1
    );

  const decrementOctave = () =>
    state.octave.set((octave) =>
      octave === Notes.minOctave ? Notes.maxOctave : octave - 1
    );

  return (
    <View style={styles.octaveKey}>
      <TouchableOpacity onPress={decrementOctave} style={styles.button}>
        <Text style={styles.text}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Octave {state.octave.value}</Text>
      <TouchableOpacity onPress={incrementOctave} style={styles.button}>
        <Text style={styles.text}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primaryDark,
    flexGrow: 1,
    flex: 1
  },
  octaveKey: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryLight,
    flexGrow: 4,
    flex: 4
  },
  text: {
    flex: 3,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
