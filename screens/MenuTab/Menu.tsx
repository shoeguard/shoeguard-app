import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import styled from 'styled-components/native';
import {RootState} from 'modules/store';
import {hp, wp} from 'styles/size';

interface IMenuData {
  title: string;
  onPress: () => void;
}

type NavigationType = NativeStackNavigationProp<MenuStackType>;

const Menu = () => {
  const {user} = useSelector((state: RootState) => state.account);
  const navigation = useNavigation<NavigationType>();

  const logout = () => {
    AsyncStorage.clear();
    // clear redux
  };

  const menuData: IMenuData[] = [
    {
      title: '로그아웃',
      onPress: logout,
    },
    {
      title: '오픈소스 라이센스',
      onPress: () => {
        navigation.navigate('OSS');
      },
    },
    {
      title: '서비스이용약관',
      onPress: () => {},
    },
    {
      title: '개인정보처리방침',
      onPress: () => {},
    },
  ];

  const renderItem = ({item: {title, onPress}}: {item: IMenuData}) => {
    return (
      <FlatListItem onPress={onPress}>
        <FlatListLabel>{title}</FlatListLabel>
      </FlatListItem>
    );
  };

  return (
    <Container>
      <NameWrapper>
        <Profile />
        <NameLabel>{user?.name ?? '고태건'}</NameLabel>
        <TypeLabel>{user?.is_child ? '학생' : '학부모'}</TypeLabel>
      </NameWrapper>
      <FlatList data={menuData} renderItem={renderItem} />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${({theme}) => theme.color.white};
`;

const NameWrapper = styled.View`
  padding: 0px ${wp('4.3%')}px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: ${hp('4.9%')}px 0px;
`;

const Profile = styled.View`
  width: ${wp('10.6%')}px;
  height: ${wp('10.6%')}px;
  border-radius: ${wp('5.3%')}px;
  background-color: ${({theme}) => theme.color.gray};
  margin-right: ${wp('4.3%')}px;
`;

const NameLabel = styled.Text`
  font-size: ${({theme}) => theme.fontSize.md}px;
  color: ${({theme}) => theme.color.black};
  font-family: ${({theme}) => theme.fontFamily.bold};
  margin-right: ${wp('2.1%')}px;
`;

const TypeLabel = styled.Text`
  font-size: ${({theme}) => theme.fontSize.md}px;
  color: ${({theme}) => theme.color.gray};
  font-family: ${({theme}) => theme.fontFamily.regular};
`;

const FlatListItem = styled.TouchableOpacity`
  width: ${wp('100%')}px;
  height: ${hp('6%')}px;
  padding: 0px ${wp('4.3%')}px;
  flex-direction: row;
`;

const FlatListLabel = styled.Text`
  font-size: ${({theme}) => theme.fontSize.md}px;
  color: ${({theme}) => theme.color.black};
  font-family: ${({theme}) => theme.fontFamily.regular};
`;

export default Menu;
