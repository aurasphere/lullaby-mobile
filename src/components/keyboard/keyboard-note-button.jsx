import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Colors, Notes, globalState} from '../../config';
import {playNotes} from '../../service/device-service';
import {writeEditorNote} from '../editor';
import {useState} from '@hookstate/core';

export default function KeyboardNoteButton(props) {
  const state = useState(globalState);
  const notePressedCallback = () => {
    const noteObj = {
      pitch: props.noteIndex + 1,
      octave: state.octave.value,
      duration: props.duration,
      extended: props.extended,
      altered: props.altered
    };
    const noteWritten = writeEditorNote(noteObj);

    // Plays the note if not muted.
    if (
      noteWritten &&
      state.playLive.value &&
      state.connectedDevice.value != null
    ) {
      console.log('Sending note');
      playNotes([noteObj], state.bpm.value, state.beatUnit.value);
    }
  };

  // If the button is not alterable hides it.
  if (!props.alterable && props.altered) {
    return <View />;
  }

  return (
    <TouchableOpacity onPress={notePressedCallback} style={styles.button}>
      <Text style={styles.text}>
        {state.noteNames.value[props.noteIndex] +
          (props.altered ? '♯' : '') +
          Notes.durations[props.duration] +
          (props.extended ? '.' : '')}
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
