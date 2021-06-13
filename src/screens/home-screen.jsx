import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {globalState} from '../global-state';
import {useState} from '@hookstate/core';
import {CustomTextInput} from 'react-native-custom-keyboard-kit';

export default function HomeScreen() {
  const state = useState(globalState);
  const [selection, setSelection] = React.useState({start: 0, end: 0});

  const onSelectionChange = () => {
    //   const textLength = state.editorContent.value.length;
    //   setSelection({start: textLength, end: textLength});
    return false;
  };

  const onChangeText = (text) => {
    // If a character is deleted, deletes the whole note.
    while (text !== '' && text.charAt(text.length - 1) !== ' ') {
      text = text.slice(0, -1);
    }
    state.editorContent.set(text);
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        customKeyboardType="notes"
        value={state.editorContent.value}
        onChangeText={onChangeText}
        style={styles.textEditor}
        multiline={true}
        autoFocus={true}
        contextMenuHidden={true}
        autoCorrect={false}
        autoCompleteType="off"
        spellCheck={false}
        selection={selection}
        onSelectionChange={onSelectionChange}
      />
      <View style={styles.keyboardRow}>
        <Text style={styles.text}>32/32</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});
