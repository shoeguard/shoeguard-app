import React, {useState} from 'react';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';
import {Platform} from 'react-native';
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
type RouteType = RouteProp<LoginStackType, 'PhoneInput'>;

interface IStyledButtonProps {
  isInputFocused: boolean;
  bottom: number;
}

const PhoneInput = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigation = useNavigation<NavigationType>();
  const {
    params: {isLogin},
  } = useRoute<RouteType>();
  const {bottom} = useSafeAreaInsets();
  const theme = useTheme();

  const onPressLeft = () => {
    navigation.dispatch(StackActions.pop(1));
  };

  const onPressButton = () => {
    const phoneNumberCheck = phoneNumber.match(/^\d{3}-\d{4}-\d{4}$/);

    if (phoneNumberCheck) {
      navigation.navigate('SmsAuthenticate', {
        phoneNumber: phoneNumber,
        isLogin: isLogin,
      });
    } else {
      setIsValid(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Container>
        <Header onPressLeft={onPressLeft} />
        <Title>
          전화번호를{'\n'}
          입력해주세요.
        </Title>
        <TextInput
          placeholder="010-0000-0000"
          value={phoneNumber}
          onChangeText={text =>
            setPhoneNumber(() => {
              const replacedPhoneNumber = text.replace(
                /(^02.{0}|^01.{1}|[0-9]{3})([0-9]{4})/,
                '$1-$2-',
              );

              return replacedPhoneNumber;
            })
          }
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />

        {!isValid && (
          <ErrorText>
            유효한 전화번호가 아닙니다.{'\n'}
            전화번호를 다시 확인해주세요.
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

export default PhoneInput;
