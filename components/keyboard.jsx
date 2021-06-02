import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Colors, Notes} from '../constants';
import OctaveKey from './octave-key';

function Keyboard(props) {
  console.log('Render keyboard');
  const [swapped, setSwapped] = useState(false);

  let octave = Notes.minOctave;
  const onOctaveChanged = newOctave => {
    octave = newOctave;
  };
  const onSwapPressed = () => {
    setSwapped(!swapped);
  };

  const toButton = (text, onPressed, style) => (
    <TouchableOpacity onPress={onPressed} style={style} key={text}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );

  const noteButtons = durationIndex => {
    if (!swapped) {
      return Notes.notes.map((n, ni) =>
        toButton(
          n + Notes.durations[durationIndex],
          () => props.onNotePressed(ni, durationIndex, octave),
          styles.button
        )
      );
    } else {
      return Notes.alteredNotes.map((n, ni) =>
        toButton(
          n + Notes.durations[durationIndex],
          () => props.onNotePressed(ni, durationIndex, octave),
          styles.button
        )
      );
    }
  };
  const keyboard = (
    <View style={styles.keyboard}>
      <View style={styles.keyboardRow}>{noteButtons(0)}</View>
      <View style={styles.keyboardRow}>{noteButtons(1)}</View>
      <View style={styles.keyboardRow}>{noteButtons(2)}</View>
      <View style={styles.keyboardRow}>{noteButtons(3)}</View>
      <View style={styles.keyboardRow}>
        {toButton('♯/𝄽', onSwapPressed, styles.buttonBig)}
        <OctaveKey onOctaveChanged={onOctaveChanged} />
        {toButton('←', props.onDeletePressed, styles.buttonBig)}
      </View>
    </View>
  );
  console.log('Finish render keyboard');
  return keyboard;
}

export default React.memo(Keyboard);

const styles = StyleSheet.create({
  keyboard: {
    flex: 4,
    backgroundColor: Colors.primary
  },
  button: {
    flex: 1,
    backgroundColor: Colors.primaryDark,
    flexGrow: 1,
    justifyContent: 'center'
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
