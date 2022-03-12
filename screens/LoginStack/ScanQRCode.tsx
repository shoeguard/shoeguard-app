import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {BarCodeReadEvent} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackActions, useNavigation} from '@react-navigation/core';
import styled from 'styled-components/native';
import {hp, wp} from 'styles/size';
import api from 'api';
import {chagneUser} from 'modules/reducer/account';

type NavigationType = NativeStackNavigationProp<LoginStackType>;

const ScanQRCode = () => {
  const dispatch = useDispatch();
  const QRCodeRef = useRef<QRCodeScanner>(null);
  const navigation = useNavigation<NavigationType>();

  const onSuccess = async (e: BarCodeReadEvent) => {
    try {
      const parsedData = JSON.parse(e.data);

      console.log(e.data);

      if ('childId' in parsedData) {
        const accessToken = await AsyncStorage.getItem('access');
        console.log(accessToken);

        const response = await api.post(
          '/users/add-child',
          {
            child_id: parsedData.childId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (response.status === 200) {
          dispatchToMain();
        }
      } else {
        throw new Error('Invalid QR Code');
      }
    } catch (error) {
      QRCodeRef.current?.reactivate();
      console.log(error);
    }
  };

  const dispatchToMain = async () => {
    const accessToken = AsyncStorage.getItem('access');
    const response = await api.get('/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      dispatch(chagneUser(response.data));
      navigation.dispatch(StackActions.replace('MainTab'));
    }
  };

  return (
    <QRCodeScanner
      ref={QRCodeRef}
      showMarker={true}
      onRead={onSuccess}
      cameraStyle={QRCodeStyle.camera}
      topViewStyle={QRCodeStyle.topView}
      bottomViewStyle={QRCodeStyle.bottomView}
      customMarker={
        <MarkerWrapper>
          <MarkerLabel>
            사각형 정중앙에{'\n'}
            QR코드를 인식해주세요.
          </MarkerLabel>
          <Marker />
        </MarkerWrapper>
      }
    />
  );
};

const QRCodeStyle = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  topView: {
    display: 'none',
  },
  bottomView: {
    display: 'none',
  },
});

const MarkerWrapper = styled.View`
  flex-direction: column;
  align-items: center;
  background-color: ${({theme}) => theme.color.transparent};
`;

const MarkerLabel = styled.Text`
  font-size: ${({theme}) => theme.fontSize.md}px;
  color: ${({theme}) => theme.color.white};
  font-family: ${({theme}) => theme.fontFamily.bold};
  text-align: center;
`;
const Marker = styled.View`
  margin-top: ${hp('1.7%')}px;
  width: ${wp('72.5%')}px;
  height: ${wp('72.5%')}px;
  background-color: ${({theme}) => theme.color.transparent};
  border: ${({theme}) => `4px solid ${theme.color.white}`};
`;

export default ScanQRCode;
