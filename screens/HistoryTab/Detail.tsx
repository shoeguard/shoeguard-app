import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styled, {useTheme} from 'styled-components/native';
import Header from 'components/Header';
import Button from 'components/Button';
import BlutoothIcon from 'images/bluetooth.svg';
import MobileIcon from 'images/mobile.svg';
import {hp, wp} from 'styles/size';
import api from 'api';
import {RootState} from 'modules/store';

type NavigationType = NativeStackNavigationProp<HistoryStackType>;
type RouteType = RouteProp<HistoryStackType, 'Detail'>;
interface IHistory {
  id: number;
  address: string;
  latitude: number;
  longitude: number;
  audio_url: string;
  reported_device: 'IOT' | 'PHONE';
}

interface IStyledButtonProps {
  bottom: number;
}

const HistoryDetail = () => {
  const [history, setHistory] = useState<IHistory>();
  const {bottom} = useSafeAreaInsets();
  const theme = useTheme();
  const {user} = useSelector((state: RootState) => state.account);
  const navigation = useNavigation<NavigationType>();
  const {
    params: {id},
  } = useRoute<RouteType>();

  useEffect(() => {
    fetchHistoryDetail();
  }, []);

  const fetchHistoryDetail = async () => {
    const access = await AsyncStorage.getItem('access');
    const response = await api.get(`/reports/${id}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    setHistory(response.data);
    console.log(response.data);
  };

  const onPressLeft = () => {
    navigation.dispatch(StackActions.replace('MainTab'));
  };

  const onPressButton = () => {
    const {audio_url} = history;
    Linking.openURL(audio_url || 'https://naver.com/');
  };

  return (
    <Container>
      <Header onPressLeft={onPressLeft} />
      <IconWrapper>
        <Icon>
          {history?.reported_device === 'IOT' ? (
            <BlutoothIcon width={wp('9.6%')} />
          ) : (
            <MobileIcon width={wp('9.6%')} />
          )}
        </Icon>
        <HistoryType>
          {history?.reported_device === 'IOT'
            ? 'IoT 기기에 의한 신고'
            : '어플리케이션에 의한 신고'}
        </HistoryType>
      </IconWrapper>
      <InfoWrapper>
        <InfoLabel>신고위치</InfoLabel>
        <InfoText>{history?.address}</InfoText>
      </InfoWrapper>
      <InfoWrapper>
        <InfoLabel>신고시각</InfoLabel>
        <InfoText>
          {new Date(history?.created).toLocaleString('ko-KR')}
        </InfoText>
      </InfoWrapper>
      <InfoWrapper>
        <InfoLabel>보호자</InfoLabel>
        <InfoText>{user?.parent?.name}</InfoText>
      </InfoWrapper>
      <StyledButton
        color={theme.color.blue}
        bottom={bottom}
        label={'음성 파일 다운로드'}
        onPress={onPressButton}
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

const IconWrapper = styled.View`
  width: 100%;
  padding: 0px ${wp('4.3%')}px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: ${hp('4.9')}px;
`;

const Icon = styled.View`
  width: ${wp('14.9%')}px;
  height: ${wp('14.9%')}px;
  border-radius: ${wp('7.4%')}px;
  background-color: ${({theme}) => theme.color.blue};
  align-items: center;
  justify-content: center;
  margin-right: ${wp('4.3%')}px;
`;

const HistoryType = styled.Text`
  font-size: ${({theme}) => theme.fontSize.lg}px;
  color: ${({theme}) => theme.color.black};
  font-family: ${({theme}) => theme.fontFamily.bold};
`;

const InfoWrapper = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px ${wp('4.3%')}px;
  margin-top: ${hp('2%')}px;
`;

const InfoLabel = styled.Text`
  font-size: ${({theme}) => theme.fontSize.sm}px;
  color: ${({theme}) => theme.color.black};
  font-family: ${({theme}) => theme.fontFamily.regular};
  line-height: ${hp('2%')}px;
  margin-bottom: ${hp('0.2%')}px;
`;

const InfoText = styled.Text`
  font-size: 18px;
  color: ${({theme}) => theme.color.black};
  font-family: ${({theme}) => theme.fontFamily.bold};
  line-height: ${hp('3%')}px;
`;

const StyledButton = styled(Button)<IStyledButtonProps>`
  position: absolute;
  bottom: ${({bottom}) => bottom + hp('2%')}px;
`;

export default HistoryDetail;
