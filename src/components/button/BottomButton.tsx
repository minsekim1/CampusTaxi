import styled from '@emotion/native';
import React, { ReactNode } from 'react';
import { BlankButton } from './BlankButton';

type Props = {
  onPress: () => void;
  icon?: ReactNode;
  color?: string;
  backgroundColor?: string;
  clicked?: boolean;
};

export const BottomButton: React.FC<Props> = ({ children, onPress, icon, clicked }) => {
  return (
    <ButtonContainer>
      <BlankButton
        backgroundColor={clicked ? '#CBCED7' : '#172864'}
        color="white"
        icon={icon}
        onPress={onPress}
        paddingBottom={16}>
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
