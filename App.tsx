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
import {
  GenerateQRCode,
  NameInput,
  Onboarding,
  PasswordInput,
  PhoneInput,
  SignUpSuccess,
  SmsAuthenticate,
  Terms,
} from 'screens/LoginStack';
import theme from 'styles/theme';

const RootStack = createNativeStackNavigator<RootStackType>();
const LoginStack = createNativeStackNavigator<LoginStackType>();

const LoginNavigator = () => (
  <LoginStack.Navigator
    initialRouteName="Onboarding"
    screenOptions={{
      headerShown: false,
    }}>
    <LoginStack.Screen name="Onboarding" component={Onboarding} />
    <LoginStack.Screen name="Terms" component={Terms} />
    <LoginStack.Screen name="PhoneInput" component={PhoneInput} />
    <LoginStack.Screen name="SmsAuthenticate" component={SmsAuthenticate} />
    <LoginStack.Screen name="PasswordInput" component={PasswordInput} />
    <LoginStack.Screen name="NameInput" component={NameInput} />
    <LoginStack.Screen name="SignUpSuccess" component={SignUpSuccess} />
    <LoginStack.Screen name="GenerateQRCode" component={GenerateQRCode} />
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
