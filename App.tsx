/**
 * Shoegaurd App
 * https://github.com/shoeguard/shoeguard-app
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, StatusBar} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import SplashScreen from 'react-native-splash-screen';
import codePush from 'react-native-code-push';
import Geolocation, {
  GeolocationConfiguration,
} from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import ConnectDevice from 'screens/ConnectDevice';
import ReportActive from 'screens/ReportActive';
import {ReportChild, ReportParent} from 'screens/ReportTab';
import {History, HistoryDetail} from 'screens/HistoryTab';
import {Menu, OSS} from 'screens/MenuTab';
import TabBar from 'components/TabBar';
import store, {RootState} from 'modules/store';
import {chagneUser} from 'modules/reducer/account';
import api from 'api';

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
    <MenuStack.Screen name="OSS" component={OSS} />
  </MenuStack.Navigator>
);

const StateFulApp = () => {
  const [isChild, setIsChild] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.account);

  useEffect(() => {
    const syncCodePush = async () => {
      await codePush.sync({
        installMode: codePush.InstallMode.IMMEDIATE,
        mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
      });
    };

    syncCodePush();
  }, []);

  useEffect(() => {
    const config: GeolocationConfiguration = {
      skipPermissionRequests: false,
      authorizationLevel: 'always',
    };

    Geolocation.setRNConfiguration(config);

    requestPermission();

    dispatchUserInfo();

    SplashScreen.hide();
  }, []);

  const dispatchUserInfo = async () => {
    const accessToken = await AsyncStorage.getItem('access');

    if (accessToken) {
      setIsLogin(true);

      const response = await api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        const {data} = response;

        dispatch(chagneUser(data));

        return true;
      }
    }

    return false;
  };

  useEffect(() => {
    if (user) {
      if (user.child === null) {
        setIsChild(false);
      }
    }
  }, [user]);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);

        console.log('write external stroage', grants);

        const hasGranted =
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.ACCESS_COARSE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.CAMERA'] ===
            PermissionsAndroid.RESULTS.GRANTED;

        if (hasGranted) {
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
    <>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName={isLogin ? 'MainTab' : 'LoginStack'}
          // initialRouteName={'MainTab'}
          screenOptions={{
            headerShown: false,
          }}>
          <RootStack.Screen name="LoginStack" component={LoginNavigator} />
          <RootStack.Screen name="ConnectDevice" component={ConnectDevice} />
          <RootStack.Screen name="ReportActive" component={ReportActive} />
          {isChild ? (
            <RootStack.Screen name="MainTab" component={MainChildNavigator} />
          ) : (
            <RootStack.Screen name="MainTab" component={MainParentNavigator} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StateFulApp />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
