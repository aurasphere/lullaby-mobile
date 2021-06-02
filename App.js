import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Keyboard from './components/keyboard';
import Editor from './components/editor';
import {Notes, Colors, Frequencies} from './constants';
import Toolbar from './components/toolbar';
import {StatusBar} from 'react-native';

export default function App() {
  let notePressedEditorCallback;

  const setNotePressedEditorCallback = callback => {
    notePressedEditorCallback = callback;
  };
  const onNotePressed = (note, duration, octave) => {
    console.log(note + octave.toString() + Notes.durations[duration]);
    var tone = Frequencies.get(Notes.notesEnglish[note])[octave];
    console.log(tone);
    notePressedEditorCallback(Notes.notes[note], duration, octave);
  };
  const onDeletePressed = () => {};
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      <Toolbar />
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
