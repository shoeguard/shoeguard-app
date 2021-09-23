import React from 'react';
import {StackActions, useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled, {useTheme} from 'styled-components/native';
import Button from 'components/Button';
import {hp, wp} from 'styles/size';
import Illust from 'images/signup-success.svg';

type NavigationType = NativeStackNavigationProp<LoginStackType>;

interface IStyledButtonProps {
  bottom: number;
}

const SignUpSuccess = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationType>();
  const {bottom} = useSafeAreaInsets();

  const onPressButton = () => {
    navigation.dispatch(StackActions.push('GenerateQRCode'));
  };

  return (
    <Container>
      <Illust width={wp('60%')} height={hp('28%')} />
      <Title>회원가입 성공!</Title>
      <Description>슈가드의 모든 서비스를 이용해 보세요!</Description>
      <StyledButton
        color={theme.color.blue}
        label={'다음'}
        onPress={onPressButton}
        bottom={bottom}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.color.white};
`;

const Title = styled.Text`
  font-size: ${({theme}) => theme.fontSize.lg}px;
  color: ${({theme}) => theme.color.black};
  font-family: ${({theme}) => theme.fontFamily.bold};
  text-align: center;
`;

const Description = styled.Text`
  font-size: ${({theme}) => theme.fontSize.md}px;
  color: ${({theme}) => theme.color.black};
  font-family: ${({theme}) => theme.fontFamily.demiLight};
  text-align: center;
  margin-top: ${wp('1%')}px;
`;

const StyledButton = styled(Button)<IStyledButtonProps>`
  position: absolute;
  bottom: ${({bottom}) => bottom + hp('2%')}px;
`;

export default SignUpSuccess;
