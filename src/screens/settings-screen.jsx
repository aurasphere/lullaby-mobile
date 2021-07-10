import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {Colors, globalState, Notes} from '../config';
import {useState} from '@hookstate/core';
import {
  SettingsDividerShort,
  SettingsDividerLong,
  SettingsEditText,
  SettingsCategoryHeader,
  SettingsSwitch,
  SettingsPicker
} from 'react-native-settings-components';
import {
  saveSolFaNotation,
  saveMaxEditorLength
} from '../service/storage-service';

export default function SettingsScreen() {
  const state = useState(globalState);

  const onBpmChange = (bpm) => {
    if (bpm === '') {
      return;
    }
    state.bpm.set(parseInt(bpm.replace(/[+-,. ]/g, ''), 10));
    state.dirtyEditor.set(true);
  };
  const onMaxEditorContentLengthChange = (maxEditorContentLength) => {
    if (maxEditorContentLength === '') {
      return;
    }
    saveMaxEditorLength(maxEditorContentLength);
    state.maxEditorContentLength.set(
      parseInt(maxEditorContentLength.replace(/[+-,. ]/g, ''), 10)
    );
  };
  const onTimeSignaturePress = (value) => {
    state.beatUnit.set(value);
    state.dirtyEditor.set(true);
  };
  const onNotationChanged = (useSolFa) => {
    saveSolFaNotation(useSolFa);
    state.noteNames.set(useSolFa ? Notes.solfa : Notes.letters);
  };
  const timeSignatureOptions = Notes.signatures.map((s, i) => {
    return {label: s, value: i + 1};
  });
  const settingsSwitchEnabled =
    state.noteNames.value.toString() === Notes.solfa.toString();
  const isAndroid = Platform.OS === 'android';

  return (
    <View>
      <SettingsCategoryHeader
        title={'General'}
        titleStyle={Platform.OS === 'android' ? styles.header : null}
      />
      <SettingsDividerLong android={false} />
      <SettingsSwitch
        title={'Use Sol-fa Notation'}
        onValueChange={onNotationChanged}
        value={settingsSwitchEnabled}
        switchProps={{
          thumbColor: !isAndroid
            ? Colors.white
            : settingsSwitchEnabled
            ? Colors.primaryDark
            : Colors.white
        }}
        trackColor={{
          true: Colors.primary,
          false: isAndroid ? Colors.grayAndroid : Colors.grayIos
        }}
      />
      <SettingsEditText
        title="Max Melody Length"
        dialogDescription={
          'Enter the max melody length (melodies too long may cause issue when saved on remote device)'
        }
        valuePlaceholder="64"
        negativeButtonTitle={'Cancel'}
        positiveButtonTitle={'OK'}
        onValueChange={onMaxEditorContentLengthChange}
        value={state.maxEditorContentLength.value.toString()}
        androidDialogInputType={'numeric'}
      />
      <SettingsDividerShort />
      <SettingsCategoryHeader
        title={'Melody'}
        titleStyle={Platform.OS === 'android' ? styles.header : null}
      />
      <SettingsEditText
        title="BPM"
        dialogDescription={'Enter the melody BPM'}
        valuePlaceholder="120"
        negativeButtonTitle={'Cancel'}
        positiveButtonTitle={'OK'}
        onValueChange={onBpmChange}
        value={state.bpm.value.toString()}
        androidDialogInputType={'numeric'}
      />
      <SettingsPicker
        title="Time Signature"
        dialogDescription={
          'Choose the melody time signature (denominator only)'
        }
        options={timeSignatureOptions}
        onValueChange={onTimeSignaturePress}
        valueFormat={(i) => Notes.signatures[i - 1]}
        value={state.beatUnit.value}
        styleModalButtonsText={{color: Colors.primary}}
        modalStyle={{
          header: {
            wrapper: styles.pickerHeader
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: Colors.primary
  },
  pickerHeader: {
    backgroundColor: Colors.primary
  }
});
