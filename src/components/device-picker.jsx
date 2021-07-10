import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {globalState} from '../config';
import {useState} from '@hookstate/core';
import BluetoothSerial from 'react-native-bluetooth-serial';

export default function DevicePicker() {
  const navigation = useNavigation();
  const state = useState(globalState);
  const buttonText = state.connectedDevice?.name?.value ?? 'Not connected';
  const subText =
    state.connectedDevice.value == null
      ? 'Tap here to connect a device'
      : 'Long press to disconnect';

  const onButtonPress = () => navigation.navigate('ConnectDevice');
  const onButtonLongPress = () => {
    if (state.connectedDevice.value != null) {
      BluetoothSerial.disconnect();
      state.connectedDevice.set(null);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={onButtonPress} onLongPress={onButtonLongPress}>
        <Text style={styles.text}>{buttonText}</Text>
        <Text style={styles.subtext}>{subText}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 15
  },
  subtext: {
    color: 'white',
    fontSize: 10
  }
});
