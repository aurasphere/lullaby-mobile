import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../constants';
import OctaveKey from './octave-key';
import {globalState} from '../global-state';
import KeyboardRow from './keyboard-row';

const state = globalState;
export default function Keyboard() {
  console.log('Render keyboard');
  const onSwapPressed = () => {
    state.swappedKeyboard.set((swapped) => !swapped);
  };

  const onBackspace = () => {
    // If a character is deleted, deletes the whole note.
    state.editorContent.set((text) => {
      if (text === '') {
        return text;
      }
      text = text.slice(0, -1);
      while (text !== '' && text.charAt(text.length - 1) !== ' ') {
        text = text.slice(0, -1);
      }
      return text;
    });
  };

  return (
    <View style={styles.keyboard}>
      <KeyboardRow duration={0} />
      <KeyboardRow duration={1} />
      <KeyboardRow duration={2} />
      <KeyboardRow duration={3} />
      <View style={styles.keyboardRow}>
        <TouchableOpacity onPress={onSwapPressed} style={styles.buttonBig}>
          <Text style={styles.text}>{'♯/𝄽'}</Text>
        </TouchableOpacity>
        <OctaveKey />
        <TouchableOpacity onPress={onBackspace} style={styles.buttonBig}>
          <Text style={styles.text}>{'←'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 4
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
