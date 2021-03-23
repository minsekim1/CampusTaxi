import styled from '@emotion/native';
import React from 'react';

type Props = {
  color?: string;
};
export const BlankBackground: React.FC<Props> = ({ children, color }) => {
  return <Box color={color}>{children}</Box>;
};

const Box = styled.View<{ color?: string }>`
  flex: 1;
  background-color: ${({ color }) => color ?? '#ffffff'};
`;
