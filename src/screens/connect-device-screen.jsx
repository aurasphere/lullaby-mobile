import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
  RefreshControl
} from 'react-native';
import {Colors, globalState} from '../config';
import BluetoothSerial from 'react-native-bluetooth-serial';
import {useState} from '@hookstate/core';

export default function ConnectDeviceScreen({navigation}) {
  const [devices, setDevices] = React.useState();
  const [scanning, setScanning] = React.useState(true);
  const state = useState(globalState);

  const connectDevice = async (device) => {
    try {
      const outcome = await BluetoothSerial.connect(device.id);
      ToastAndroid.show(outcome.message, ToastAndroid.SHORT);
      navigation.goBack();
      state.connectedDevice.set(device);
      BluetoothSerial.on('connectionLost', () => {
        state.connectedDevice.set(null);
        ToastAndroid.show('Connection lost with device', ToastAndroid.SHORT);
        BluetoothSerial.removeListener('connectionLost');
      });
      console.log(outcome);
    } catch (error) {
      console.error(error);
      ToastAndroid.show(
        error?.toString() ?? 'Error during connection',
        ToastAndroid.SHORT
      );
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

  async function startScan() {
    console.log('Starting Bluetooth scan');
    setScanning(true);

    const isEnabled = await BluetoothSerial.isEnabled();
    if (!isEnabled) {
      await BluetoothSerial.enable();
    }
    const devicesFound = await BluetoothSerial.discoverUnpairedDevices();
    const deduplicatedDevices = uniqBy(devicesFound, (d) => d.id).filter(
      (d) => d.name != null
    );
    if (scanning) {
      setDevices(deduplicatedDevices);
    }
    setScanning(false);
  }

  React.useEffect(() => {
    startScan();
    return function cleanup() {
      BluetoothSerial.cancelDiscovery();
      setScanning(false);
    };
  }, []);

  if (scanning) {
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

  const itemSeparatorComponent = () => <View style={styles.separator} />;

  const refreshControlComponent = (
    <RefreshControl refreshing={scanning} onRefresh={startScan} />
  );

  return (
    <FlatList
      data={devices}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={emptyListComponent()}
      ItemSeparatorComponent={itemSeparatorComponent}
      refreshControl={refreshControlComponent}
      contentContainerStyle={styles.contentContainerStyle}
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
  },
  contentContainerStyle: {
    flexGrow: 1
  }
});
