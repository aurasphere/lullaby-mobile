import React, {useRef} from 'react';
import {StyleSheet, Switch, Text, View, Platform} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors, globalState, Notes} from '../config';
import Dialog from 'react-native-dialog';
import {Picker} from '@react-native-picker/picker';
import {useState} from '@hookstate/core';
import {
  SettingsDividerShort,
  SettingsDividerLong,
  SettingsEditText,
  SettingsCategoryHeader,
  SettingsSwitch,
  SettingsPicker
} from 'react-native-settings-components';

export default function SettingsScreen() {
  const [showBeatUnitDialog, setShowBeatUnitDialog] = React.useState(false);
  const [showBpmDialog, setShowBpmDialog] = React.useState(false);
  const [showNotationDialog, setShowNotationDialog] = React.useState(false);
  const [tmpBpm, setTmpBpm] = React.useState(globalState.bpm.value);
  const state = useState(globalState);

  const confirmBpmDialog = () => {
    setShowBpmDialog(false);
  };
  const cancelBpmDialog = () => {
    setShowBpmDialog(false);
  };
  const onBpmPress = () => {
    setShowBpmDialog(true);
  };
  const onTimeSignaturePress = (value) => {
    state.beatUnit.set(value);
  };
  const onNotationChanged = (useSolFa) => {
    state.noteNames.set(useSolFa ? Notes.solfa : Notes.letters);
  };

  const pickerRef = useRef();
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
        value={state.noteNames.value.toString() === Notes.solfa.toString()}
        trackColor={{
          true: Colors.primaryDark,
          false: Colors.primaryLight
        }}
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
        onValueChange={onBpmPress}
        value={state.bpm.value.toString()}
        androidDialogInputType={'numeric'}
      />
      <SettingsPicker
        title="Time Signature"
        dialogDescription={
          'Choose the melody time signature (denominator only)'
        }
        options={Notes.signatures.map((s, i) => {
          return {label: s, value: i + 1};
        })}
        onValueChange={onTimeSignaturePress}
        valueFormat={(i) => Notes.signatures[i]}
        value={state.beatUnit.value - 1}
        styleModalButtonsText={{color: Colors.primary}}
      />

      <Text style={styles.header}>{'General'}</Text>
      <Text style={styles.itemTitle}>{'Sol-fa Notation'}</Text>
      <Text style={styles.itemDescription}>
        {'Use Tonic Sol-Fa instead of letter notation'}
      </Text>
      <Switch
        trackColor={{false: Colors.primary, true: Colors.primaryDark}}
        thumbColor={Colors.primaryLight}
        ios_backgroundColor={Colors.primaryLight}
        onValueChange={onNotationChanged}
        value={state.noteNames.value === Notes.notes}
      />
      <Text style={styles.header}>{'Melody'}</Text>
      <TouchableOpacity onPress={onBpmPress} style={styles.item}>
        <Text style={styles.itemTitle}>{'BPM'}</Text>
        <Text style={styles.itemDescription}>{'Change the melody speed'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onTimeSignaturePress} style={styles.item}>
        <Text style={styles.itemTitle}>{'Time Signature'}</Text>
        <Text style={styles.itemDescription}>
          {'Change the melody time signature'}
        </Text>
      </TouchableOpacity>
      <Dialog.Container visible={showBpmDialog}>
        <Dialog.Title>File Name</Dialog.Title>
        <Dialog.Description>Select the file name</Dialog.Description>
        <Dialog.Input
          value={state.bpm.value}
          onChangeText={state.bpm.set}
          keyboardType="numeric"
        />
        <Dialog.Button label="OK" onPress={confirmBpmDialog} />
        <Dialog.Button label="Cancel" onPress={cancelBpmDialog} />
      </Dialog.Container>
      <Picker
        ref={pickerRef}
        selectedValue={state.beatUnit.value}
        onValueChange={state.beatUnit.set}>
        <Picker.Item label="*/2" value="1" />
        <Picker.Item label="*/4" value="2" />
        <Picker.Item label="*/8" value="3" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: Colors.primary
  },
  item: {padding: 10},
  itemTitle: {},
  itemDescription: {}
});
