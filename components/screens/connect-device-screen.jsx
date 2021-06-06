import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import {Colors} from './../../constants';
import BluetoothSerial from 'react-native-bluetooth-serial';
import {useState} from '@hookstate/core';
import {globalState} from '../../global-state';

export default function ConnectDeviceScreen({navigation}) {
  const [devices, setDevices] = React.useState();
  const state = useState(globalState);

  const connectDevice = async (device) => {
    try {
      const outcome = await BluetoothSerial.connect(device.id);
      ToastAndroid.show(outcome.message, ToastAndroid.SHORT);
      navigation.goBack();
      state.connectedDevice.set(device);
      console.log(outcome);
    } catch (error) {
      console.error(error);
      ToastAndroid.show(error);
    }
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => connectDevice(item.item)}
        style={styles.item}>
        <Text>{item.item.name}</Text>
      </TouchableOpacity>
    );
  };

  function uniqBy(array, keyFunction) {
    let seen = new Set();
    return array.filter((item) => {
      let k = keyFunction(item);
      return seen.has(k) ? false : seen.add(k);
    });
  }

  const startScanning = async () => {
    const isEnabled = await BluetoothSerial.isEnabled();
    if (!isEnabled) {
      await BluetoothSerial.enable();
    }
    const devicesFound = await BluetoothSerial.discoverUnpairedDevices();
    const deduplicatedDevices = uniqBy(devicesFound, (d) => d.id);
    setDevices(deduplicatedDevices);
    console.log(JSON.stringify(deduplicatedDevices));
    BluetoothSerial.cancelDiscovery();
    console.log('Fine');
  };

  if (devices === undefined) {
    startScanning();
    return (
      <View style={styles.centerVertical}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text>Scanning...</Text>
      </View>
    );
  }

  const emptyListComponent = () => {
    return (
      <View style={styles.centerVertical}>
        <Text>No nearby devices found</Text>
      </View>
    );
  };

  const itemSeparatorComponent = () => {
    return <View style={styles.separator} />;
  };

  return (
    <FlatList
      data={devices}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={emptyListComponent()}
      ItemSeparatorComponent={itemSeparatorComponent}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  centerVertical: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  item: {
    flex: 1,
    padding: 20
  },
  separator: {
    borderBottomColor: '#AAA',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginRight: 5
  }
});
