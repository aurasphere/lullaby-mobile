import {createState} from '@hookstate/core';

export const globalState = createState({
  connectedDevice: null,
  playLive: true,
  octave: 4,
  dirtyEditor: false,
  editorContent: '',
  swappedKeyboard: false
});
