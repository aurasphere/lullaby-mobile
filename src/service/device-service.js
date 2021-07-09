import BluetoothSerial from 'react-native-bluetooth-serial';

export function playMelody() {
  console.log('Playing melody on remote device');
  BluetoothSerial.write('p\n');
}

export function saveMelody(notes, bpm, beatUnit) {
  BluetoothSerial.write('s' + serializeMelody(notes, bpm, beatUnit) + '\n');
}

// Note values goes from 1 to 7. A note of 0 is a rest.
export function playNotes(notes, bpm, beatUnit) {
  BluetoothSerial.write('n' + serializeMelody(notes, bpm, beatUnit) + '\n');
}

export function loadMelody() {
  // e
  //BluetoothSerial.write(
}

export function serializeMelody(notes, bpm, beatUnit) {
  const header = serializeHeader(bpm, beatUnit);
  const lullabyNotes = notes.map(serializeNote).join('');
  console.log(header + lullabyNotes);
  return header + lullabyNotes;
}

export function deserializeMelody(melodyString) {
  const header = deserializeHeader(melodyString.substring(0, 3));
  const notes = melodyString.substring(3).match(/.{3}/g).map(deserializeNote);
  console.log(header + notes);
  return {header, notes};
}

/* 
3 char hex per note:
3 bits <- pitch
2 bits <- duration
3 bits <- octave
1 bit <- extended
1 bit <- altered 

duration:
 0 = whole note
 1 = half note
 2 = quarter note
 3 = eight note
*/
function serializeNote(note) {
  console.log(note.pitch);
  console.log(note.pitch << 5);
  console.log(note.duration << 3);
  console.log(note.octave);
  console.log((note.pitch << 5) + (note.duration << 3) + note.octave);
  const firstByteValue = (note.pitch << 5) + (note.duration << 3) + note.octave;
  const secondByteValue =
    (note.extended ? 1 << 3 : 0) + (note.altered ? 1 << 2 : 0);
  return firstByteValue.toString(16) + secondByteValue.toString(16);
}

function deserializeNote(noteString) {
  const firstByteValue = parseInt(noteString.substring(0, 2), 16);
  const secondByteValue = parseInt(noteString.substring(2), 16);
  return {
    pitch: (firstByteValue & (0b111 << 5)) >> 5,
    duration: (firstByteValue & (0b11 << 3)) >> 3,
    octave: firstByteValue & 0b111,
    extended: (secondByteValue & (1 << 3)) > 0,
    altered: (secondByteValue & (1 << 2)) > 0
  };
}

// Header
// 2 char hex => bpm
// 1 char dec => beat note
//        1 = */2 (half note)
//        2 = */4 (quarter note)
//        3 = */8 (eight note)
function serializeHeader(bpm, beatUnit) {
  console.log('bpm: ' + JSON.stringify({bpm, beatUnit}));
  return bpm.toString(16) + beatUnit;
}

function deserializeHeader(headerString) {
  return {
    bpm: parseInt(headerString.substring(0, 2), 16),
    beatUnit: headerString.charAt(2)
  };
}
