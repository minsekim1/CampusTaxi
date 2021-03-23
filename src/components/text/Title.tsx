import styled from '@emotion/native';
import React from 'react';

type Props = { centered?: boolean };

export const Title: React.FC<Props> = ({ children, centered }) => {
  return <Box centered={centered}>{children}</Box>;
};

const Box = styled.Text<{ centered?: boolean }>`
  font-size: 20px;
  text-align: ${({ centered }) => centered && 'center'};
  margin-top: 24px;
  margin-bottom: 24px;
`;
