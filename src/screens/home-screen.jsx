import React from 'react';
import {StyleSheet, View} from 'react-native';
import Keyboard from '../components/keyboard/keyboard';
import Editor from '../components/editor';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Editor />
      <Keyboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  scrollView: {
    flex: 6,
    flexGrow: 6
  }
});
