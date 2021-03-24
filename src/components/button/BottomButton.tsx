import styled from '@emotion/native';
import React, { ReactNode } from 'react';
import { BlankButton } from './BlankButton';

type Props = {
  onPress: () => void;
  icon?: ReactNode;
  color?: string;
  backgroundColor?: string;
  disable?: boolean;
};

export const BottomButton: React.FC<Props> = ({ children, onPress, icon, disable }) => {
  return (
    <ButtonContainer>
      <BlankButton
        backgroundColor={disable ? '#CBCED7' : '#76A2EB'}
        color="white"
        icon={icon}
        onPress={onPress}
        disable={disable}>
        {children}
      </BlankButton>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0;
`;
