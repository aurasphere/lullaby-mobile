import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  ToastAndroid
} from 'react-native';
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

  const askPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    // Prints a message
    if (granted === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Lullaby needs Bluetooth permissions to find nearby music boxes',
        ToastAndroid.SHORT
      );
    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Lullaby needs Bluetooth permissions to find nearby music boxes. You can enable them from your phone settings.',
        ToastAndroid.SHORT
      );
    }
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const onButtonPress = async () => {
    // Checks that the permissions are granted.
    const permissionAlreadyGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (!permissionAlreadyGranted && !(await askPermission())) {
      console.log('Bluetooth permission denied');
      navigation.goBack();
      return;
    }
    navigation.navigate('ConnectDevice');
  };
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
