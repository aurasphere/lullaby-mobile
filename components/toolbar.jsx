import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Colors, Notes} from '../constants';
import DevicePicker from './device-picker';

export default function Toolbar(props) {
  return (
    <View style={styles.toolbar}>
      <DevicePicker style={styles.picker} />
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flex: 1,
    backgroundColor: Colors.primary
  },
  picker: {
    flex: 1
  }
});
