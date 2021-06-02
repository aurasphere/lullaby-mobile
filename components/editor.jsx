import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Colors, Notes} from '../constants';
import OctaveKey from './octave-key';

export default function Editor(props) {
  const [notes, setNotes] = useState([]);

  props.setNotePressedEditorCallback((note, duration, octave) => {
    console.log('Callback!');
    setNotes(
      notes.concat([note + octave.toString() + Notes.durations[duration]])
    );
  });

  const editorContent = () => {
    console.log('Reduce!');
    return notes.reduce((p, v) => p + ' ' + v, '');
  };
  return (
    <View style={styles.textEditor}>
      <Text>{editorContent()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textEditor: {
    flex: 7,
    backgroundColor: '#fff'
  }
});
