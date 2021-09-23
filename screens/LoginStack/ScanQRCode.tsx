import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/core';
import styled, {useTheme} from 'styled-components/native';
import Button from 'components/Button';

type NavigationType = NativeStackNavigationProp<LoginStackType>;

interface IStyledButtonProps {
  bottom: number;
}

const ScanQRCode = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationType>();
  const {bottom} = useSafeAreaInsets();
  const onSuccess = (e: any) => {
    console.log(e.data);
  };

  const onPressButton = () => {};

  return (
    <>
      <QRCodeScanner
        onRead={onSuccess}
        cameraStyle={{
          flex: 1,
          width: '100%',
          height: '100%',
        }}
        topViewStyle={{
          display: 'none',
        }}
        bottomViewStyle={{
          display: 'none',
        }}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        // topContent={
        //   <Text style={styles.centerText}>
        //     Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text>{' '}
        //     on your computer and scan the QR code.
        //   </Text>
        // }
        // bottomContent={
        //   <TouchableOpacity style={styles.buttonTouchable}>
        //     <Text style={styles.buttonText}>OK. Got it!</Text>
        //   </TouchableOpacity>
        // }
      />
      <StyledButton
        color={theme.color.blue}
        label={'다음'}
        onPress={onPressButton}
        bottom={bottom}
      />
    </>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.color.white};
`;

const StyledButton = styled(Button)<IStyledButtonProps>`
  position: absolute;
  bottom: ${({bottom}) => bottom + hp('2%')}px;
`;

export default ScanQRCode;
