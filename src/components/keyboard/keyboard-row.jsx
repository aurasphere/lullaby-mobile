import React from 'react';
import {StyleSheet, View} from 'react-native';
import KeyboardNoteButton from './keyboard-note-button';

export default function KeyboardRow(props) {
  console.log('Render keyboardRow');
  return (
    <View style={styles.keyboardRow}>
      <KeyboardNoteButton
        swappable={true}
        note={'Do'}
        duration={props.duration}
      />
      <KeyboardNoteButton
        swappable={true}
        note={'Re'}
        duration={props.duration}
      />
      <KeyboardNoteButton
        swappable={false}
        note={'Mi'}
        duration={props.duration}
      />
      <KeyboardNoteButton
        swappable={true}
        note={'Fa'}
        duration={props.duration}
      />
      <KeyboardNoteButton
        swappable={true}
        note={'Sol'}
        duration={props.duration}
      />
      <KeyboardNoteButton
        swappable={true}
        note={'La'}
        duration={props.duration}
      />
      <KeyboardNoteButton
        swappable={false}
        note={'Si'}
        duration={props.duration}
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
