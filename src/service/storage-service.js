import {AsyncStorage} from 'react-native';

const maxEditorLengthKey = 'maxEditorLength';
const solFaNotationKey = 'solFaNotation';

export const saveMaxEditorLength = (value) =>
  AsyncStorage.setItem(maxEditorLengthKey, value);

export const saveSolFaNotation = (value) =>
  AsyncStorage.setItem(solFaNotationKey, value.toString());

export const loadMaxEditorLength = (callback) => {
  AsyncStorage.getItem(maxEditorLengthKey).then(callback);
};

export const loadSolFaNotation = (callback) => {
  AsyncStorage.getItem(solFaNotationKey).then(callback);
};
