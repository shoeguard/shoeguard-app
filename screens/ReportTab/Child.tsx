import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import styled, {useTheme} from 'styled-components/native';
import {StackActions, useNavigation} from '@react-navigation/core';
import Geolocation, {
  GeolocationConfiguration,
} from '@react-native-community/geolocation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {hp, wp} from 'styles/size';
import {RootState} from 'modules/store';
import Button from 'components/Button';
import api from 'api';

type NavigationType = NativeStackNavigationProp<RootStackType>;

const Child = () => {
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const {user} = useSelector((state: RootState) => state.account);
  const theme = useTheme();
  const navigation = useNavigation<NavigationType>();

  useEffect(() => {
    const config: GeolocationConfiguration = {
      skipPermissionRequests: false,
      authorizationLevel: 'always',
    };

    Geolocation.setRNConfiguration(config);

    Geolocation.getCurrentPosition(
      position => {
        fetchAddress(position.coords.longitude, position.coords.latitude);
      },
      err => {
        console.error(err);
      },
      {
        enableHighAccuracy: false,
      },
    );
  }, []);

  const fetchAddress = async (long: number, lat: number) => {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2address?x=${long}&y=${lat}`,
      {
        headers: {
          Authorization: 'KakaoAK f7b94e1fc3ba7ab991ce6ff3115ad4cc',
          'Content-Type': 'application/json',
        },
      },
    );

    setLatitude(lat);
    setLongitude(long);
    setAddress(response.data.documents[0].address.address_name);
  };

  const onPressButton = async () => {
    const access = await AsyncStorage.getItem('access');
    const response = await api.post(
      '/reports',
      {
        address,
        latitude,
        longitude,
        reported_device: 'PHONE',
      },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      },
    );

    if (response.status === 201) {
      navigation.dispatch(
        StackActions.replace('ReportActive', {
          id: response.data.id,
        }),
      );
    }
  };

  return (
    <Container>
      <Title>????????????</Title>
      <InfoWrapper>
        <InfoLabel>????????????</InfoLabel>
        <InfoText>{address}</InfoText>
      </InfoWrapper>
      <InfoWrapper>
        <InfoLabel>????????????</InfoLabel>
        <InfoText>{new Date().toLocaleString('ko-KR')}</InfoText>
      </InfoWrapper>
      <InfoWrapper>
        <InfoLabel>?????????</InfoLabel>
        <InfoText>{user?.parent?.name}</InfoText>
      </InfoWrapper>
      <Description>
        ??????????????? ?????? ????????? ??????{'\n'}
        ???????????? ????????? ????????? ??? ????????????.{'\n'}
        {'\n'}
        ???????????? ??????????????? ??????????????? ?????? ???{'\n'}
        ?????? ???????????? ????????? ?????? ??? ???????????????.{'\n'}
        {'\n'}
        ??????????????? ?????? ?????? ?????????{'\n'}
        ???????????? ????????????????????????{'\n'}
        ?????? ????????? ?????? ?????????{'\n'}??? ????????? ????????? ????????? ??? ??? ????????????.
      </Description>
      <StyledButton
        color={theme.color.red}
        label={'?????? ????????????'}
        onPress={onPressButton}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  position: relative;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({theme}) => theme.color.white};
`;

const Title = styled.Text`
  width: 100%;
  font-size: ${({theme}) => theme.fontSize.xl}px;
  color: ${({theme}) => theme.color.red};
  font-family: ${({theme}) => theme.fontFamily.bold};
  padding: 0px ${wp('4.3%')}px;
  margin: ${hp('5.2%')}px 0px ${hp('2.3%')}px 0px;
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

const Description = styled.Text`
  width: 100%;
  padding: ${hp('4.7')}px ${wp('4.3%')}px 0px;
  font-size: ${({theme}) => theme.fontSize.sm}px;
  color: ${({theme}) => theme.color.black};
  font-family: ${({theme}) => theme.fontFamily.regular};
`;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: ${hp('2%')}px;
`;

export default Child;
