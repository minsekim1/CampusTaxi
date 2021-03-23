import styled from '@emotion/native';
import React from 'react';

type Props = {
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
};
export const SimpleText: React.FC<Props> = ({ children, align }) => {
  return <Box align={align}>{children}</Box>;
};

const Box = styled.Text<{ align?: string }>`
  text-align: ${({ align }) => align};
  padding: 8px;
  border: 2px solid rgba(149, 149, 149, 0.09);
  margin-bottom: 8px;
`;
