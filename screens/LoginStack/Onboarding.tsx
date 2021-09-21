import React from 'react';
import PagerView from 'react-native-pager-view';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Illust01 from 'images/onboarding-01.svg';
import Illust02 from 'images/onboarding-02.svg';
import Illust03 from 'images/onboarding-03.svg';
import {hp, wp} from 'styles/size';
import Oval from 'components/Oval';
import Button from 'components/Button';
import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type NavigationType = NativeStackNavigationProp<LoginStackType>;
interface IContainerProps {
  bottom: number;
}

const Onboarding = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationType>();
  const {bottom} = useSafeAreaInsets();

  const onPressSignIn = () => {
    navigation.navigate('PhoneInput', {
      isLogin: true,
    });
  };

  const onPressSignUp = () => {
    navigation.navigate('Terms');
  };

  return (
    <StyledPagerView>
      <Container key="1" bottom={bottom}>
        <Illust01 />
        <Title>
          우리 아이가{'\n'}
          안전한 환경에서 자라도록
        </Title>
        <Description>수많은 위협으로부터 소중한 자녀를 보호하세요.</Description>
        <OvalWrapper>
          <StyledOval width={6} color={theme.color.blue} />
          <StyledOval width={6} color={theme.color.gray} />
          <StyledOval width={6} color={theme.color.gray} />
        </OvalWrapper>
        <Button
          color={theme.color.blue}
          label={'기존 계정으로 시작'}
          onPress={onPressSignIn}
        />
        <TouchableHighlight
          onPress={onPressSignUp}
          underlayColor={'transparent'}>
          <TouchableLabel>회원가입</TouchableLabel>
        </TouchableHighlight>
      </Container>
      <Container key="2" bottom={bottom}>
        <Illust02 />
        <Title>
          안전하게, 빠르게{'\n'}
          즉각적으로 신고할 수 있도록
        </Title>
        <Description>
          Iot기기로 가해자들이 모르게 신고할 수 있습니다.
        </Description>
        <OvalWrapper>
          <StyledOval width={6} color={theme.color.gray} />
          <StyledOval width={6} color={theme.color.blue} />
          <StyledOval width={6} color={theme.color.gray} />
        </OvalWrapper>
        <Button
          color={theme.color.blue}
          label={'기존 계정으로 시작'}
          onPress={onPressSignIn}
        />
        <TouchableHighlight
          onPress={onPressSignUp}
          underlayColor={'transparent'}>
          <TouchableLabel>회원가입</TouchableLabel>
        </TouchableHighlight>
      </Container>
      <Container key="3" bottom={bottom}>
        <Illust03 />
        <Title>
          알아서 똑똑하게,{'\n'}
          나중에 사용할 수 있도록
        </Title>
        <Description>
          슈가드는 신고 즉시,{'\n'}
          음성녹음을 통해 증거를 수집합니다.
        </Description>
        <OvalWrapper>
          <StyledOval width={6} color={theme.color.gray} />
          <StyledOval width={6} color={theme.color.gray} />
          <StyledOval width={6} color={theme.color.blue} />
        </OvalWrapper>
        <Button
          color={theme.color.blue}
          label={'기존 계정으로 시작'}
          onPress={onPressSignIn}
        />
        <TouchableHighlight
          onPress={onPressSignUp}
          underlayColor={'transparent'}>
          <TouchableLabel>회원가입</TouchableLabel>
        </TouchableHighlight>
      </Container>
    </StyledPagerView>
  );
};

const StyledPagerView = styled(PagerView)`
  flex: 1;
`;

const Container = styled.View<IContainerProps>`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${({bottom}) => bottom}px;
`;

const Title = styled.Text`
  font-size: ${({theme}) => theme.fontSize.lg}px;
  color: ${({theme}) => theme.color.black};
  font-family: ${({theme}) => theme.fontFamily.bold};
  text-align: center;
  margin-top: ${hp('4.9%')}px;
`;

const Description = styled.Text`
  font-size: ${({theme}) => theme.fontSize.md}px;
  color: ${({theme}) => theme.color.black};
  font-family: ${({theme}) => theme.fontFamily.regular};
  text-align: center;
  margin-top: ${hp('2%')}px;
`;

const OvalWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${hp('16.5%')}px;
`;

const StyledOval = styled(Oval)`
  margin: ${hp('2%')}px ${wp('1%')}px;
`;

const TouchableHighlight = styled.TouchableHighlight`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: ${wp('100%')}px;
  padding: ${hp('2%')}px;
`;

const TouchableLabel = styled.Text`
  color: ${({theme}) => theme.color.gray};
  font-size: ${({theme}) => theme.fontSize.sm}px;
  font-family: ${({theme}) => theme.fontFamily.bold};
`;

export default Onboarding;
