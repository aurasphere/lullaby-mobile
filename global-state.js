import {createState} from '@hookstate/core';

export const globalState = createState({
  connectedDevice: null,
  playLive: true
});
