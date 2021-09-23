import React from 'react';
import {TextInputProps} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import {hp, wp} from 'styles/size';

const TextInput = (props: TextInputProps) => {
  const theme = useTheme();

  return <Container placeholderTextColor={theme.color.gray} {...props} />;
};

const Container = styled.TextInput`
  width: ${wp('91.4%')}px;
  height: ${hp('5.9%')}px;
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.color.gray};
  padding: 0 ${wp('4.3%')}px;
  color: ${({theme}) => theme.color.black};
  font-size: ${({theme}) => theme.fontSize.sm}px;
  font-family: ${({theme}) => theme.fontFamily.regular};
`;

export default TextInput;
