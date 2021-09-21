import React from 'react';
import styled from 'styled-components/native';
import {hp, wp} from 'styles/size';

interface IProps {
  onPress?: () => void;
  label?: string;
  disabled?: boolean;
  color?: string;
  isInputFocused?: boolean;
}

interface IStyledButtonProps {
  color?: string;
  isInputFocused: boolean;
}

const Button = ({
  onPress = () => {},
  label = '',
  disabled = false,
  isInputFocused = false,
  color,
  ...props
}: IProps) => {
  return (
    <StyledButton
      onPress={onPress}
      disabled={disabled}
      color={color}
      isInputFocused={isInputFocused}
      {...props}>
      <StyledLabel>{label}</StyledLabel>
    </StyledButton>
  );
};

const StyledButton = styled.TouchableOpacity<IStyledButtonProps>`
  width: ${({isInputFocused}) => (isInputFocused ? wp('100%') : wp('91.4%'))}px;
  height: ${hp('5.9%')}px;
  border-radius: ${({isInputFocused}) => (isInputFocused ? '0px' : '8px')};
  background-color: ${({theme, color}) => color || theme.color.gray};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLabel = styled.Text`
  color: ${({theme}) => theme.color.white};
  font-size: ${({theme}) => theme.fontSize.md}px;
  font-family: ${({theme}) => theme.fontFamily.bold};
`;

export default Button;
