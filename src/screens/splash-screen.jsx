import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {splashScreenDurationMillis, Colors} from '../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SplashScreen({navigation}) {
  setTimeout(() => navigation.navigate('Home'), splashScreenDurationMillis);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons style={styles.icon} name="music-clef-bass" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: '#fff',
    fontSize: 200
  }
});
