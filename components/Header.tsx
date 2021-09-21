import React from 'react';
import styled from 'styled-components/native';
import Arrow from 'images/arrow.svg';
import Download from 'images/download.svg';
import {hp, wp} from 'styles/size';

interface IProps {
  onPressLeft?: () => void;
  onPressRight?: () => void;
}

const Header = ({onPressLeft, onPressRight, ...props}: IProps) => {
  return (
    <Container {...props}>
      {onPressLeft && (
        <Button onPress={onPressLeft}>
          <Arrow width={hp('4.9%')} height={hp('4.9%')} />
        </Button>
      )}
      {onPressRight && (
        <Button onPress={onPressRight}>
          <Download width={hp('4.9%')} height={hp('4.9%')} />
        </Button>
      )}
    </Container>
  );
};

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${hp('4.9%')}px;
  padding: 0 ${wp('4.3%')}px;
`;

const Button = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${hp('4.9%')}px;
  height: ${hp('4.9%')}px;
`;

export default Header;
