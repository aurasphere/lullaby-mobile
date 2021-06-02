import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Colors, Bluetooth} from '../constants';
import {Picker} from '@react-native-picker/picker';
import ModalDropdown from 'react-native-modal-dropdown';
import BluetoothSerial from 'react-native-bluetooth-serial';
export default function DevicePicker(props) {
  const [selectedDevice, setSelectedDevice] = useState();
  const [scanning, setScanning] = useState(false);
  let [deviceNames, setDeviceNames] = useState();
  let devices = null;
  let placeHolderText = 'Tap to connect';

  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
  const onDeviceSelected = (index, value) => {
    return false;
  };
  const onPickerOpened = async () => {
    setScanning(true);
    const isEnabled = await BluetoothSerial.isEnabled();
    if (!isEnabled) {
      await BluetoothSerial.enable();
    }
    devices = await BluetoothSerial.discoverUnpairedDevices();
    devices.map(JSON.stringify).forEach(console.log);
    await setDeviceNames(devices.map(d => d.name));
    await BluetoothSerial.cancelDiscovery();
    setScanning(false);
    deviceNames.forEach(console.log);
    console.log('Fine');
  };

  const renderRow = (option, index, isSelected) => {
    if (index == 0) {
      return <Text>{option}</Text>;
    }
    return (
      <TouchableOpacity
        onPress={onOptionSelected}
        style={styles.dropdownList}
        key={index}>
        <Text style={styles.dropdownText}>{option}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.toolbar}>
      <ModalDropdown
        options={deviceNames}
        style={styles.dropdownButton}
        textStyle={styles.text}
        dropdownStyle={styles.dropdownList}
        dropdownTextStyle={styles.dropdownText}
        defaultValue={scanning ? 'Scanning' : placeHolderText}
        onSelect={onDeviceSelected}
        onDropdownWillShow={onPickerOpened}
        animated={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flex: 1,
    backgroundColor: Colors.primaryDark
  },
  dropdownButton: {
    flex: 1,
    backgroundColor: Colors.primaryLight
  },
  text: {
    color: 'white',
    fontSize: 20
  },
  dropdownList: {
    width: 200
  },
  dropdownText: {
    fontSize: 20
  }
});
