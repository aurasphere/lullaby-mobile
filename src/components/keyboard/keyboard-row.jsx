import React from 'react';
import {StyleSheet, View} from 'react-native';
import KeyboardNoteButton from './keyboard-note-button';
import KeyboardRestButton from './keyboard-rest-button';

export default function KeyboardRow(props) {
  return (
    <View style={styles.keyboardRow}>
      <KeyboardNoteButton
        alterable={true}
        altered={props.altered}
        noteIndex={0}
        duration={props.duration}
        extended={props.extended}
      />
      <KeyboardNoteButton
        alterable={true}
        altered={props.altered}
        noteIndex={1}
        duration={props.duration}
        extended={props.extended}
      />
      <KeyboardNoteButton
        alterable={false}
        altered={props.altered}
        noteIndex={2}
        duration={props.duration}
        extended={props.extended}
      />
      <KeyboardNoteButton
        alterable={true}
        altered={props.altered}
        noteIndex={3}
        duration={props.duration}
        extended={props.extended}
      />
      <KeyboardNoteButton
        alterable={true}
        altered={props.altered}
        noteIndex={4}
        duration={props.duration}
        extended={props.extended}
      />
      <KeyboardNoteButton
        alterable={true}
        altered={props.altered}
        noteIndex={5}
        duration={props.duration}
        extended={props.extended}
      />
      <KeyboardNoteButton
        alterable={false}
        altered={props.altered}
        noteIndex={6}
        duration={props.duration}
        extended={props.extended}
      />
      <KeyboardRestButton
        altered={props.altered}
        duration={props.duration}
        extended={props.extended}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardRow: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1
  }
});
