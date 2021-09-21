import React, {useState} from 'react';
import {Platform} from 'react-native';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from 'components/Header';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import {hp, wp} from 'styles/size';

type NavigationType = NativeStackNavigationProp<LoginStackType>;
type RouteType = RouteProp<LoginStackType, 'SmsAuthenticate'>;

interface IStyledButtonProps {
  isInputFocused: boolean;
  bottom: number;
}

const SmsAuthenticate = () => {
  const [authenticateCode, setAuthenticateCode] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigation = useNavigation<NavigationType>();
  const {
    params: {isLogin, phoneNumber},
  } = useRoute<RouteType>();
  const {bottom} = useSafeAreaInsets();
  const theme = useTheme();

  const onPressLeft = () => {
    navigation.dispatch(StackActions.pop(1));
  };

  const onPressButton = () => {
    navigation.navigate('PasswordInput', {
      isLogin,
      phoneNumber,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Container>
        <Header onPressLeft={onPressLeft} />
        <Title>
          {phoneNumber} 로 전송된{'\n'}
          인증 번호를 입력해주세요.
        </Title>
        <TextInput
          placeholder="000000"
          value={authenticateCode}
          onChangeText={text => setAuthenticateCode(text)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />

        {!isValid && (
          <ErrorText>
            유효한 인증번호가 아닙니다.{'\n'}
            인증번호를 다시 확인해주세요.
          </ErrorText>
        )}

        <StyledButton
          color={theme.color.blue}
          label={'다음'}
          onPress={onPressButton}
          isInputFocused={isInputFocused}
          bottom={bottom}
        />
      </Container>
    </KeyboardAvoidingView>
  );
};

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
`;

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
  padding: 0px ${wp('4.3%')}px;
  text-align: left;
  width: 100%;
`;

const ErrorText = styled.Text`
  font-size: ${({theme}) => theme.fontSize.xs}px;
  color: ${({theme}) => theme.color.red};
  font-family: ${({theme}) => theme.fontFamily.regular};
  margin-top: ${hp('2%')}px;
  padding: 0px ${wp('4.3%')}px;
  width: 100%;
`;

const StyledButton = styled(Button)<IStyledButtonProps>`
  position: absolute;
  bottom: ${({bottom, isInputFocused}) =>
    isInputFocused ? 0 : bottom + hp('2%')}px;
`;

export default SmsAuthenticate;
