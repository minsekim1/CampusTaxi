import styled from '@emotion/native';
import React from 'react';
import image from '../../../images/registerLogo.png';

export const RegisterLogo = () => {
  return <Box source={image} />;
};

const Box = styled.Image`
  width: 91px;
  height: 82px;
`;
