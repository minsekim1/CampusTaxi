import styled from '@emotion/native';
import React from 'react';
import image from '../../../images/logo.png';

export const Logo = () => {
  return <Box source={image} />;
};

const Box = styled.Image`
  width: 91px;
  height: 82px;
`;
