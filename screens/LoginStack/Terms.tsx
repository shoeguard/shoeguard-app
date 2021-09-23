import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/core';
import {StackActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styled, {useTheme} from 'styled-components/native';
import Header from 'components/Header';
import TermsListItem from 'components/TermsListItem';
import Button from 'components/Button';
import {hp, wp} from 'styles/size';

type NavigationType = NativeStackNavigationProp<LoginStackType>;

interface TermsData {
  title: string;
  description: string;
}

interface IStyledButtonProps {
  bottom: number;
}

const termsData: TermsData[] = [
  {
    title: '개인정보처리방침',
    description:
      '실로 사랑의 청춘을 영원히 피다. 실로 열락의 꽃이 위하여 소금이라 때문이다. 오직 품에 가슴에 굳세게 우리 얼음과 듣는다. 커다란 주며, 않는 내려온 칼이다. 얼음 거친 생생하며, 청춘은 인간에 우는 위하여서 봄바람이다. 품으며, 위하여서 그들의 우리의 청춘의 가슴에 약동하다. 미묘한 목숨을 가슴이 청춘은 품에 힘있다. 것은 거친 모래뿐일 남는 공자는 이상 별과 새가 방황하였으며, 것이다. 용감하고 맺어, 따뜻한 찾아 같이 시들어 얼음 그들에게 교향악이다. 피가 하였으며, 길을 관현악이며, 안고, 싹이 것이다. 방황하였으며, 것이 있을 같은 굳세게 있다.',
  },
  {
    title: '서비스 이용약관',
    description:
      '실로 사랑의 청춘을 영원히 피다. 실로 열락의 꽃이 위하여 소금이라 때문이다. 오직 품에 가슴에 굳세게 우리 얼음과 듣는다. 커다란 주며, 않는 내려온 칼이다. 얼음 거친 생생하며, 청춘은 인간에 우는 위하여서 봄바람이다. 품으며, 위하여서 그들의 우리의 청춘의 가슴에 약동하다. 미묘한 목숨을 가슴이 청춘은 품에 힘있다. 것은 거친 모래뿐일 남는 공자는 이상 별과 새가 방황하였으며, 것이다. 용감하고 맺어, 따뜻한 찾아 같이 시들어 얼음 그들에게 교향악이다. 피가 하였으며, 길을 관현악이며, 안고, 싹이 것이다. 방황하였으며, 것이 있을 같은 굳세게 있다.',
  },
];

const Terms = () => {
  const [selectedTitle, setSelectedTitle] = useState('');
  const navigation = useNavigation<NavigationType>();
  const {bottom} = useSafeAreaInsets();
  const theme = useTheme();

  const onPressLeft = () => {
    navigation.dispatch(StackActions.pop(1));
  };

  const onPressButton = () => {
    navigation.navigate('PhoneInput', {
      isLogin: false,
    });
  };

  const renderItem = ({item}: {item: TermsData}) => {
    return (
      <TermsListItem
        item={item}
        onPress={() =>
          setSelectedTitle((prevTitle: string) => {
            if (item.title === prevTitle) {
              return '';
            }

            return item.title;
          })
        }
        isSelected={item.title === selectedTitle}
      />
    );
  };

  return (
    <Container>
      <Header onPressLeft={onPressLeft} />
      <Title>이용약관</Title>
      <FlatList
        data={termsData}
        renderItem={renderItem}
        keyExtractor={item => item.title}
        extraData={selectedTitle}
      />
      <StyledButton
        color={theme.color.blue}
        bottom={bottom}
        label={'모두 동의하고 계속'}
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

const Title = styled.Text`
  font-size: ${({theme}) => theme.fontSize.lg}px;
  color: ${({theme}) => theme.color.black};
  font-family: ${({theme}) => theme.fontFamily.bold};
  margin: ${hp('3.9%')}px 0px ${hp('2%')}px;
  padding: 0px ${wp('5.9%')}px;
  text-align: left;
  width: 100%;
`;

const StyledButton = styled(Button)<IStyledButtonProps>`
  position: absolute;
  bottom: ${({bottom}) => bottom + hp('2%')}px;
`;

export default Terms;
