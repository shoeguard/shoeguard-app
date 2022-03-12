import React, {useState} from 'react';
import QRCode from 'react-native-qrcode-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled, {useTheme} from 'styled-components/native';
import Header from 'components/Header';
import {hp, wp} from 'styles/size';
import Button from 'components/Button';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from 'api';
import {useDispatch} from 'react-redux';
import {chagneUser} from 'modules/reducer/account';
import {StackActions} from '@react-navigation/native';
import {useInterval} from 'hooks';

type NavigationType = NativeStackNavigationProp<LoginStackType>;

interface IStyledButtonProps {
  bottom: number;
}

const GenerateQRCode = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState(9);
  const theme = useTheme();
  const navigation = useNavigation<NavigationType>();
  const {bottom} = useSafeAreaInsets();
  useInterval(() => validateHasConnected(), 1000);

  const validateHasConnected = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access');
      const response = await api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setId(response.data.id);

      if (response.data.parent) {
        dispatch(chagneUser(response.data));
        navigation.dispatch(StackActions.replace('MainTab'));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onPressButton = () => {
    navigation.navigate('ScanQRCode');
  };

  return (
    <Container>
      <Header />
      <Title>
        보호자님의 카메라로{'\n'}
        학생의 QR코드를 인식해주세요.
      </Title>
      <QRCode
        value={JSON.stringify({
          childId: id,
        })}
        logoSize={wp('40%')}
        logoMargin={0}
        size={wp('64%')}
      />
      <StyledButton
        color={theme.color.blue}
        label={'카메라로 스캔하기'}
        onPress={onPressButton}
        bottom={bottom}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({theme}) => theme.color.white};
`;

const Title = styled.Text`
  font-size: ${({theme}) => theme.fontSize.md}px;
  color: ${({theme}) => theme.color.black};
  font-family: ${({theme}) => theme.fontFamily.bold};
  text-align: center;
  margin: ${hp('9.9%')}px 0px;
`;

const StyledButton = styled(Button)<IStyledButtonProps>`
  position: absolute;
  bottom: ${({bottom}) => bottom + hp('2%')}px;
`;

export default GenerateQRCode;
