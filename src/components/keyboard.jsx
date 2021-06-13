import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Colors, Notes} from '../constants';
import OctaveKey from './octave-key';
import {insertText, backSpace} from 'react-native-custom-keyboard-kit';
import {useState} from '@hookstate/core';
import {globalState} from '../global-state';
import {playNote} from '../service/device-service';

export default function Keyboard(props) {
  console.log('Render keyboard');
  const [swapped, setSwapped] = React.useState(false);
  const state = useState(globalState);

  const onSwapPressed = () => {
    setSwapped(!swapped);
  };

  const toButton = (text, onPressed, style) => (
    <TouchableOpacity onPress={onPressed} style={style} key={text}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );

  const notePressedCallback = (note, durationIndex) => () => {
    // props.onNotePressed(Notes.unifiedNotes.indexOf(note), durationIndex);
    const noteString =
      note +
      state.octave.value.toString() +
      Notes.durations[durationIndex] +
      ' ';
    insertText(props.tag, noteString);

    // Plays the note if not muted.
    if (state.playLive.value && state.connectedDevice.value != null) {
      console.log('Sending note');
      playNote(
        Notes.unifiedNotes.indexOf(note),
        state.octave.value,
        durationIndex
      );
    }
  };

  const onBackspace = () => {
    backSpace(props.tag);
  };

  const noteButtons = (durationIndex) => {
    const notes = swapped ? Notes.alteredNotes : Notes.notes;
    return notes.map((n) =>
      toButton(
        n + Notes.durations[durationIndex],
        notePressedCallback(n, durationIndex),
        styles.button
      )
    );
  };

  const keyboard = (
    <View style={styles.keyboard}>
      <View style={styles.keyboardRow}>{noteButtons(0)}</View>
      <View style={styles.keyboardRow}>{noteButtons(1)}</View>
      <View style={styles.keyboardRow}>{noteButtons(2)}</View>
      <View style={styles.keyboardRow}>{noteButtons(3)}</View>
      <View style={styles.keyboardRow}>
        {toButton('♯/𝄽', onSwapPressed, styles.buttonBig)}
        <OctaveKey />
        {toButton('←', onBackspace, styles.buttonBig)}
      </View>
    </View>
  );
  console.log('Finish render keyboard');
  return keyboard;
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 12
  },
  button: {
    flex: 1,
    backgroundColor: Colors.primaryDark,
    flexGrow: 1,
    justifyContent: 'center'
  },
  buttonBig: {
    flex: 2,
    flexGrow: 2,
    backgroundColor: Colors.primaryDark,
    justifyContent: 'center'
  },
  keyboardRow: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1
  },
  text: {
    color: '#fff',
    textAlign: 'center'
  }
});
