import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {globalState} from '../global-state';
import {useState} from '@hookstate/core';

export default function DevicePicker() {
  const navigation = useNavigation();
  const state = useState(globalState);
  const buttonText = state.connectedDevice?.name?.value ?? 'Not connected';
  console.log('RENDERING DEVICE PICKER');

  return (
    <TouchableOpacity onPress={() => navigation.navigate('ConnectDevice')}>
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 20
  }
});
