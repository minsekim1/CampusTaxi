import styled from '@emotion/native';
import React from 'react';

export const Description: React.FC = ({ children }) => {
  return <Box>{children}</Box>;
};

const Box = styled.Text`
  color: #7d849b;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 12px;
`;
