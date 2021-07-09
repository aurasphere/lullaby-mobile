import React, {useRef} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {useState} from '@hookstate/core';
import {maxEditorContentLength, Notes, globalState} from '../config';

export default function Editor() {
  const state = useState(globalState);

  const noteCounterTextStyle = {
    ...styles.noteCounterText,
    color: state.notes.value.length === maxEditorContentLength ? 'red' : 'black'
  };

  const noteToString = (note) => {
    console.log(JSON.stringify(note));
    const toNoteString = () =>
      state.noteNames.value[note.pitch - 1] +
      (note.altered ? '♯' : '') +
      note.octave.toString() +
      Notes.durations[note.duration] +
      (note.extended ? '.' : '') +
      ' ';

    const toRestString = () =>
      Notes.rests[note.duration] + (note.extended ? '.' : '');

    return note.pitch === 0 ? toRestString(note) : toNoteString(note);
  };

  const scrollViewRef = useRef();
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }>
        <Text style={styles.editor}>
          {state.notes.value
            ? state.notes.value.map(noteToString).join(' ')
            : ''}
        </Text>
      </ScrollView>
      <View style={styles.editorFooter}>
        <View style={styles.filler} />
        {state.workingFile.value && (
          <Text style={styles.fileName}>
            {state.workingFile.value + (state.dirtyEditor.value ? '*' : '')}
          </Text>
        )}
        <Text style={noteCounterTextStyle}>
          {state.notes.value.length}/{maxEditorContentLength}
        </Text>
      </View>
    </View>
  );
}

export function writeEditorNote(note) {
  if (globalState.notes.value.length === maxEditorContentLength) {
    return false;
  }
  globalState.notes.set((n) => {
    n.push(note);
    return n;
  });
  globalState.dirtyEditor.set(true);
  return true;
}

export function deleteEditorLastElement() {
  // If a character is deleted, deletes the whole note.
  globalState.notes.set((n) => {
    n.pop();
    return n;
  });
  globalState.dirtyEditor.set(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 6
  },
  editor: {
    flex: 1,
    padding: 10,
    fontSize: 25
  },
  editorFooter: {
    padding: 10,
    flexDirection: 'row',
    alignContent: 'space-between'
  },
  noteCounterText: {
    flex: 1,
    textAlign: 'right'
  },
  fileName: {
    flex: 1,
    textAlign: 'center'
  },
  filler: {
    flex: 1
  }
});
