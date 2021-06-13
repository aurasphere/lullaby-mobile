import BluetoothSerial from 'react-native-bluetooth-serial';
import {Notes} from '../constants';

export function toNoteString(note, duration) {
  return note + ':' + duration / 10;
}

export function playMelody() {
  BluetoothSerial.write('p');
}

export function saveMelody() {
  // s
  // BluetoothSerial.write('p');
}

export function playNote(noteIndex, octave, durationIndex) {
  // n
  const lullabyNote = toLullabyNote(noteIndex, octave, durationIndex);
  BluetoothSerial.write('n ' + lullabyNote);
}

export function loadMelody() {
  // e
  //BluetoothSerial.write(
}

function toLullabyNote(noteIndex, octave, durationIndex) {
  return (
    1 +
    noteIndex +
    octave * Notes.unifiedNotes.length +
    ':' +
    25 * Math.pow(2, durationIndex)
  );
}
