import React from 'react';
import styled from 'styled-components/native';
import {hp, wp} from 'styles/size';

interface IProps {
  onPress?: () => void;
  label?: string;
  disabled?: boolean;
  color?: string;
}

interface IStyledButtonProps {
  color?: string;
}

const Button = ({
  onPress = () => {},
  label = '',
  disabled = false,
  color,
}: IProps) => {
  return (
    <StyledButton onPress={onPress} disabled={disabled} color={color}>
      <StyledLabel>{label}</StyledLabel>
    </StyledButton>
  );
};

const StyledButton = styled.TouchableOpacity<IStyledButtonProps>`
  width: ${wp('91.4%')}px;
  height: ${hp('5.9%')}px;
  border-radius: 8px;
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
