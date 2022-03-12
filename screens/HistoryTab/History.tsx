import React, {useState, useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import FilterIcon from 'images/filter.svg';
import BlutoothIcon from 'images/bluetooth.svg';
import MobileIcon from 'images/mobile.svg';
import {hp, wp} from 'styles/size';
import {StackActions, useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import api from 'api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationType = NativeStackNavigationProp<HistoryStackType>;
interface IHistory {
  id: number;
  address: string;
  latitude: number;
  longitude: number;
  audio_url: string;
  created: string;
  reported_device: 'IOT' | 'PHONE';
}

const History = () => {
  const [history, setHistory] = useState<IHistory[]>([]);
  const navigation = useNavigation<NavigationType>();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const accessToken = await AsyncStorage.getItem('access');
    const response = await api.get('/reports', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setHistory(response.data.reverse());
  };

  const renderItem = ({item}: {item: IHistory}) => {
    const icon =
      item.reported_device === 'IOT' ? <BlutoothIcon /> : <MobileIcon />;
    return (
      <FlatListItem
        onPress={() =>
          navigation.navigate('Detail', {
            id: item.id,
          })
        }>
        <FlatListIcon>{icon}</FlatListIcon>
        <FlatListTextWrapper>
          <FlatListAddress>{item.address}</FlatListAddress>
          <FlatListTime>
            {new Date(item.created).toLocaleString('ko-KR')}
          </FlatListTime>
        </FlatListTextWrapper>
      </FlatListItem>
    );
  };

  return (
    <Container>
      <TitleWrapper>
        <Title>신고기록</Title>
        <TouchableOpacity>
          <FilterIcon width={wp('8.5%')} />
        </TouchableOpacity>
      </TitleWrapper>
      <FlatList data={history} renderItem={renderItem} />
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

const TitleWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px ${wp('4.3%')}px;
  margin: ${hp('5.2%')}px 0px ${hp('3.2%')}px 0px;
`;

const Title = styled.Text`
  font-size: ${({theme}) => theme.fontSize.xl}px;
  color: ${({theme}) => theme.color.black};
  font-family: ${({theme}) => theme.fontFamily.bold};
`;

const FlatListItem = styled.TouchableOpacity`
  width: ${wp('100%')}px;
  height: ${hp('9.4%')}px;
  padding: 0px ${wp('4.3%')}px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const FlatListIcon = styled.View`
  width: ${wp('14.9%')}px;
  height: ${wp('14.9%')}px;
  border-radius: ${wp('7.4%')}px;
  background-color: ${({theme}) => theme.color.blue};
  align-items: center;
  justify-content: center;
`;

const FlatListTextWrapper = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: ${hp('9.4%')}px;
  padding: ${hp('2%')}px ${wp('3.2%')}px;
`;

const FlatListAddress = styled.Text`
  font-size: ${({theme}) => theme.fontSize.md}px;
  color: ${({theme}) => theme.color.black};
  font-family: ${({theme}) => theme.fontFamily.bold};
  line-height: ${hp('3%')}px;
  text-align: left;
`;

const FlatListTime = styled.Text`
  font-size: ${({theme}) => theme.fontSize.sm}px;
  color: ${({theme}) => theme.color.gray};
  font-family: ${({theme}) => theme.fontFamily.regular};
  line-height: ${hp('2%')}px;
  margin-top: ${hp('1%')}px;
  text-align: left;
`;

export default History;
