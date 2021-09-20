/**
 * Shoegaurd App
 * https://github.com/shoeguard/shoeguard-app
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Onboarding} from 'screens/LoginStack';
import theme from 'styles/theme';

const RootStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();

const LoginNavigator = () => (
  <LoginStack.Navigator
    initialRouteName="Onboading"
    screenOptions={{
      headerShown: false,
    }}>
    <LoginStack.Screen name="Onboading" component={Onboarding} />
  </LoginStack.Navigator>
);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="LoginStack"
          screenOptions={{
            headerShown: false,
          }}>
          <RootStack.Screen name="LoginStack" component={LoginNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
