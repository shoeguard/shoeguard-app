import React from 'react';
import styled from 'styled-components/native';

const Active = () => {
  return <Container />;
};

const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({theme}) => theme.color.white};
`;

export default Active;
