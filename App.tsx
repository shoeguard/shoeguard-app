/**
 * Shoegaurd App
 * https://github.com/shoeguard/shoeguard-app
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
    </SafeAreaView>
  );
};

export default App;
