import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Colors, Notes} from '../../config';
import {writeEditorNote} from '../editor';

export default function KeyboardRestButton(props) {
  const restPressedCallback = () => {
    writeEditorNote({
      pitch: 0,
      octave: 0,
      duration: props.duration,
      extended: props.extended,
      altered: false
    });
  };

  // Hides rests if the keyboard is not altered.
  if (!props.altered) {
    return <View />;
  }

  return (
    <TouchableOpacity onPress={restPressedCallback} style={styles.button}>
      <Text style={styles.text}>
        {Notes.rests[props.duration] + (props.extended ? '.' : '')}
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
