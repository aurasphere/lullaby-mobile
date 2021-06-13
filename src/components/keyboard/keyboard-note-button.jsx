import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Colors, Notes} from '../constants';
import {globalState} from '../global-state';
import {playNote} from '../service/device-service';
import {useState} from '@hookstate/core';

export default function KeyboardNoteButton(props) {
  const state = useState(globalState);

  const notePressedCallback = () => {
    const noteString =
      props.note +
      (props.swapped ? '♯' : '') +
      state.octave.value.toString() +
      Notes.durations[props.duration] +
      ' ';
    state.editorContent.set((c) => c + noteString);

    // Plays the note if not muted.
    if (state.playLive.value && state.connectedDevice.value != null) {
      console.log('Sending note');
      playNote(
        Notes.unifiedNotes.indexOf(props.note),
        state.octave.value,
        props.duration
      );
    }
  };

  // If the button is not swappable hides it.
  if (!props.swappable && state.swappedKeyboard.value) {
    return <View />;
  }

  return (
    <TouchableOpacity onPress={notePressedCallback} style={styles.button}>
      <Text style={styles.text}>
        {props.note +
          (state.swappedKeyboard.value ? '♯' : '') +
          Notes.durations[props.duration]}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: Colors.primaryDark,
    flexGrow: 1,
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    textAlign: 'center'
  }
});
