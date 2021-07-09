import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../config';
import OctaveKey from './octave-key';
import KeyboardRow from './keyboard-row';
import {deleteEditorLastElement} from '../editor';

export default function Keyboard() {
  const [altered, setAltered] = React.useState(false);
  const [extended, setExtended] = React.useState(false);

  const onAlterPressed = () => {
    setAltered(!altered);
  };

  const onExtendPressed = () => {
    setExtended(!extended);
  };

  return (
    <View style={styles.keyboard}>
      <KeyboardRow duration={0} altered={altered} extended={extended} />
      <KeyboardRow duration={1} altered={altered} extended={extended} />
      <KeyboardRow duration={2} altered={altered} extended={extended} />
      <KeyboardRow duration={3} altered={altered} extended={extended} />
      <View style={styles.keyboardRow}>
        <TouchableOpacity onPress={onAlterPressed} style={styles.buttonSmall}>
          <Text style={styles.text}>{'♯/𝄽'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onExtendPressed} style={styles.buttonSmall}>
          <Text style={styles.text}>{'.'}</Text>
        </TouchableOpacity>
        <OctaveKey />
        <TouchableOpacity
          onPress={deleteEditorLastElement}
          style={styles.buttonBig}>
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
  buttonSmall: {
    flex: 1,
    flexGrow: 1,
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
