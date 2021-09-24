/**
 * Shoegaurd App
 * https://github.com/shoeguard/shoeguard-app
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import SplashScreen from 'react-native-splash-screen';
import codePush from 'react-native-code-push';
import Geolocation, {
  GeolocationConfiguration,
} from '@react-native-community/geolocation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  GenerateQRCode,
  NameInput,
  Onboarding,
  PasswordInput,
  PhoneInput,
  ScanQRCode,
  SignUpSuccess,
  SmsAuthenticate,
  Terms,
} from 'screens/LoginStack';
import theme from 'styles/theme';
import {DeviceChild, DeviceParent, AddDeviceParent} from 'screens/DeviceTab';
import store from 'modules/store';
import {ReportActiveChild, ReportChild, ReportParent} from 'screens/ReportTab';
import {History, HistoryDetail} from 'screens/HistoryTab';
import {Menu} from 'screens/MenuTab';
import TabBar from 'components/TabBar';

const RootStack = createNativeStackNavigator<RootStackType>();
const LoginStack = createNativeStackNavigator<LoginStackType>();
const MainParentTab = createBottomTabNavigator<MainParentTabType>();
const MainChildTab = createBottomTabNavigator<MainChildTabType>();
const DeviceParentStack = createNativeStackNavigator<DeviceParentStackType>();
const DeviceChildStack = createNativeStackNavigator<DeviceChildStackType>();
const ReportParentStack = createNativeStackNavigator<ReportParentStackType>();
const ReportChildStack = createNativeStackNavigator<ReportChildStackType>();
const HistoryStack = createNativeStackNavigator<HistoryStackType>();
const MenuStack = createNativeStackNavigator<MenuStackType>();

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
    <LoginStack.Screen name="ScanQRCode" component={ScanQRCode} />
  </LoginStack.Navigator>
);

const MainParentNavigator = () => {
  return (
    <MainParentTab.Navigator
      initialRouteName="DeviceStack"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}>
      <MainParentTab.Screen
        name="DeviceStack"
        options={{
          tabBarLabel: '기기',
        }}
        component={DeviceParentNavigator}
      />
      <MainParentTab.Screen
        name="ReportStack"
        options={{
          tabBarLabel: '신고',
        }}
        component={ReportParentNavigator}
      />
      <MainParentTab.Screen
        name="HistoryStack"
        options={{
          tabBarLabel: '기록',
        }}
        component={HistoryStackNavigator}
      />
      <MainParentTab.Screen
        name="MenuStack"
        options={{
          tabBarLabel: '메뉴',
        }}
        component={MenuStackNavigator}
      />
    </MainParentTab.Navigator>
  );
};

const MainChildNavigator = () => {
  return (
    <MainChildTab.Navigator
      initialRouteName="DeviceStack"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}>
      <MainChildTab.Screen
        name="DeviceStack"
        options={{
          tabBarLabel: '기기',
        }}
        component={DeviceChildNavigator}
      />
      <MainChildTab.Screen
        name="ReportStack"
        options={{
          tabBarLabel: '신고',
        }}
        component={ReportChildNavigator}
      />
      <MainChildTab.Screen
        name="HistoryStack"
        options={{
          tabBarLabel: '기록',
        }}
        component={HistoryStackNavigator}
      />
      <MainChildTab.Screen
        name="MenuStack"
        options={{
          tabBarLabel: '메뉴',
        }}
        component={MenuStackNavigator}
      />
    </MainChildTab.Navigator>
  );
};

const DeviceParentNavigator = () => (
  <DeviceParentStack.Navigator
    initialRouteName="Device"
    screenOptions={{
      headerShown: false,
    }}>
    <DeviceParentStack.Screen name="Device" component={DeviceParent} />
    <DeviceParentStack.Screen name="AddDevice" component={AddDeviceParent} />
  </DeviceParentStack.Navigator>
);

const DeviceChildNavigator = () => (
  <DeviceChildStack.Navigator
    initialRouteName="Device"
    screenOptions={{
      headerShown: false,
    }}>
    <DeviceChildStack.Screen name="Device" component={DeviceChild} />
  </DeviceChildStack.Navigator>
);

const ReportParentNavigator = () => (
  <ReportParentStack.Navigator
    initialRouteName="Report"
    screenOptions={{
      headerShown: false,
    }}>
    <ReportParentStack.Screen name="Report" component={ReportParent} />
  </ReportParentStack.Navigator>
);

const ReportChildNavigator = () => (
  <ReportChildStack.Navigator
    initialRouteName="Report"
    screenOptions={{
      headerShown: false,
    }}>
    <ReportChildStack.Screen name="Report" component={ReportChild} />
    <ReportChildStack.Screen name="Active" component={ReportActiveChild} />
  </ReportChildStack.Navigator>
);

const HistoryStackNavigator = () => (
  <HistoryStack.Navigator
    initialRouteName="History"
    screenOptions={{
      headerShown: false,
    }}>
    <HistoryStack.Screen name="History" component={History} />
    <HistoryStack.Screen name="Detail" component={HistoryDetail} />
  </HistoryStack.Navigator>
);

const MenuStackNavigator = () => (
  <MenuStack.Navigator
    initialRouteName="Menu"
    screenOptions={{
      headerShown: false,
    }}>
    <MenuStack.Screen name="Menu" component={Menu} />
  </MenuStack.Navigator>
);

const codePushOptions = {
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.MANUAL,
  mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESTART,
};

const App = () => {
  const [isChild, setIsChild] = useState(false);
  useEffect(() => {
    codePush.sync(codePushOptions);
    codePush.notifyAppReady();
    const data = {
      id: 0,
      phone_number: 'string',
      name: 'string',
      is_child: true,
      parent: {
        id: 0,
        phone_number: 'string',
        name: 'string',
        is_child: false,
      },
      children: [
        {
          id: 0,
          phone_number: 'string;',
          name: 'string;',
          is_child: true,
        },
      ],
    };

    setIsChild(data.is_child);

    const config: GeolocationConfiguration = {
      skipPermissionRequests: false,
      authorizationLevel: 'always',
    };

    Geolocation.setRNConfiguration(config);

    requestPermission();

    SplashScreen.hide();
  }, []);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle={'dark-content'} />
        <NavigationContainer>
          <RootStack.Navigator
            initialRouteName="LoginStack"
            screenOptions={{
              headerShown: false,
            }}>
            <RootStack.Screen name="LoginStack" component={LoginNavigator} />
            {isChild ? (
              <RootStack.Screen name="MainTab" component={MainChildNavigator} />
            ) : (
              <RootStack.Screen
                name="MainTab"
                component={MainParentNavigator}
              />
            )}
          </RootStack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
