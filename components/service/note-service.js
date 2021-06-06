import BluetoothSerial from 'react-native-bluetooth-serial';
import {Notes} from '../../constants';

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

export function playNote(note, duration) {
  // n
  //BluetoothSerial.write(
}

export function loadMelody() {
  // e
  //BluetoothSerial.write(
}

function toLullabyNote(noteIndex, octave) {
  return 1 + noteIndex + octave * Notes.unifiedNotes.length;
}
