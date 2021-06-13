import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Keyboard from '../components/keyboard/keyboard';
import Editor from '../components/editor';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Editor />
      <View style={styles.keyboardRow}>
        <Text style={styles.text}>32/32</Text>
      </View>
      <Keyboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});
