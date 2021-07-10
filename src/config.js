import {createState} from '@hookstate/core';
import {
  loadMaxEditorLength,
  loadSolFaNotation
} from './service/storage-service';

export const Colors = {
  primary: '#4a148c',
  primaryDark: '#12005e',
  primaryLight: '#7c43bd',
  grayAndroid: '#d3d3d3',
  grayIos: '#fbfbfb',
  white: '#ffffff'
};

export const Notes = {
  solfa: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'],
  letters: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  rests: ['𝄾', '𝄽', '𝄼', '𝄻'],
  durations: ['♪', '♩', '𝅗𝅥', '𝅝'],
  signatures: ['½', '¼', '⅛'],
  minOctave: 1,
  maxOctave: 7,
  defaultBpm: 120
};

export const splashScreenDurationMillis = 3000;
export const fileExtension = '.lby';
export const fileEncoding = 'utf8';

export const globalState = createState({
  connectedDevice: null,
  playLive: true,
  octave: 4,
  dirtyEditor: false,
  workingFile: null,
  bpm: Notes.defaultBpm,
  beatUnit: 2,
  notes: [],
  noteNames: Notes.letters,
  maxEditorContentLength: 64
});

// Loads the user settings
loadMaxEditorLength((maxEditorLength) => {
  if (maxEditorLength == null) {
    return;
  }
  globalState.maxEditorContentLength.set(maxEditorLength);
});
loadSolFaNotation((useSolFa) => {
  if (useSolFa == null) {
    return;
  }
  globalState.noteNames.set(useSolFa === 'true' ? Notes.solfa : Notes.letters);
});
