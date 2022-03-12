import React, {useEffect} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import BleManager from 'react-native-ble-manager';
import styled from 'styled-components/native';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const ConnectDevice = () => {
  useEffect(() => {
    BleManager.start({showAlert: false}).then(() => {
      console.log('BLE Manager initialized');
      scanDevices();
    });
  }, []);

  const scanDevices = async () => {
    const devices = await BleManager.scan([], 5, true);
  };

  return <Container>{/* adsf */}</Container>;
};

const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({theme}) => theme.color.white};
`;
export default ConnectDevice;
