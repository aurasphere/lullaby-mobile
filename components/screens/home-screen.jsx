import React from 'react';
import {StyleSheet, View} from 'react-native';
import Keyboard from './../keyboard';
import Editor from './../editor';
import {Notes, Frequencies} from './../../constants';
import {globalState} from '../../global-state';
import {useState} from '@hookstate/core';

export default function HomeScreen() {
  const state = useState(globalState);
  let notePressedEditorCallback;

  const setNotePressedEditorCallback = (callback) => {
    notePressedEditorCallback = callback;
  };
  const onNotePressed = (note, duration, octave) => {
    console.log(note + octave.toString() + Notes.durations[duration]);
    var tone = Frequencies.get(Notes.notesEnglish[note])[octave];
    console.log(tone);
    notePressedEditorCallback(Notes.notes[note], duration, octave);

    // Plays the note if not muted.
    if (state.playLive.value) {
      console.log('Sending note');

      //   BluetoothSerial.write('p ' + note + ':' + duration / 10);
    }
  };
  const onDeletePressed = () => {};
  return (
    <View style={styles.container}>
      <Editor
        style={styles.textEditor}
        setNotePressedEditorCallback={setNotePressedEditorCallback}
      />
      <Keyboard
        style={styles.keyboard}
        onNotePressed={onNotePressed}
        onDeletePressed={onDeletePressed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});
