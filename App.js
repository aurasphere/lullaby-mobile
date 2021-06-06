import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './components/screens/home-screen';
import ConnectDeviceScreen from './components/screens/connect-device-screen';
import {StatusBar} from 'react-native';
import {Colors} from './constants';
import DevicePicker from './components/device-picker';
import Toolbar from './components/toolbar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.primary} />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary
          },
          headerTintColor: '#fff'
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: (props) => <DevicePicker {...props} />,
            headerRight: (props) => <Toolbar {...props} />
          }}
        />
        <Stack.Screen
          name="ConnectDevice"
          component={ConnectDeviceScreen}
          options={{title: 'Connect Device'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
