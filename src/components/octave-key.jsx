import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Colors, Notes} from '../constants';
import {globalState} from '../global-state';
import {useState} from '@hookstate/core';

export default function OctaveKey() {
  console.log('Rendering octave key');
  const state = useState(globalState);

  const onOctaveControlPressed = async (increment) => {
    if (state.octave.value === Notes.minOctave && increment === -1)
      state.octave.set(Notes.maxOctave);
    else if (state.octave.value === Notes.maxOctave && increment === 1)
      state.octave.set(Notes.minOctave);
    else state.octave.set((octave) => octave + increment);
  };

  const toButton = (text, onPressed) => (
    <TouchableOpacity onPress={onPressed} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.octaveKey}>
      {toButton('<', () => onOctaveControlPressed(-1))}
      <Text style={styles.text}>Octave {state.octave.value}</Text>
      {toButton('>', () => onOctaveControlPressed(1))}
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
