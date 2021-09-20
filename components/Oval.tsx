import React from 'react';
import styled from 'styled-components/native';

interface IProps {
  width?: number;
  color?: string;
}

interface IStyledOvalProps {
  width: number;
  color?: string;
}

const Oval = ({width = 32, color, ...props}: IProps) => (
  <StyledOval width={width} color={color} {...props} />
);

const StyledOval = styled.View<IStyledOvalProps>`
  width: ${({width}) => width}px;
  height: ${({width}) => width}px;
  border-radius: ${({width}) => width / 2}px;
  background-color: ${({theme, color}) => color || theme.color.gray};
`;

export default Oval;
