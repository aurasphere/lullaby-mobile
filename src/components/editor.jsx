import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useState} from '@hookstate/core';
import {globalState} from '../global-state';

export default function Editor() {
  console.log('Render editor');
  const state = useState(globalState);
  return (
    <View style={styles.container}>
      <Text style={styles.editor}>{state.editorContent.value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 6
  }
});
