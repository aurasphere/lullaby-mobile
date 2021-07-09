import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/home-screen';
import ConnectDeviceScreen from './src/screens/connect-device-screen';
import {StatusBar} from 'react-native';
import {Colors} from './src/config';
import DevicePicker from './src/components/device-picker';
import Toolbar from './src/components/toolbar';
import {OverflowMenuProvider} from 'react-navigation-header-buttons';
import SplashScreen from './src/screens/splash-screen';
import OpenFileScreen from './src/screens/open-file-screen';
import SettingsScreen from './src/screens/settings-screen';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <OverflowMenuProvider>
        <>
          <StatusBar backgroundColor={Colors.primary} />
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.primary
              },
              headerTintColor: '#fff'
            }}>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({navigation}) => ({
                headerTitle: (props) => <DevicePicker {...props} />,
                headerRight: (props) => (
                  <Toolbar {...props} navigation={navigation} />
                )
              })}
            />
            <Stack.Screen
              name="ConnectDevice"
              component={ConnectDeviceScreen}
              options={{title: 'Connect Device'}}
            />
            <Stack.Screen
              name="OpenFile"
              component={OpenFileScreen}
              options={{title: 'Select File'}}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{title: 'Settings'}}
            />
          </Stack.Navigator>
        </>
      </OverflowMenuProvider>
    </NavigationContainer>
  );
}
