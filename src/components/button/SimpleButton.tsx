import React, { ReactNode } from 'react';
import { BlankButton } from './BlankButton';

type Props = {
  onPress: () => void;
  icon?: ReactNode;
  color?: string;
  backgroundColor?: string;
  clicked?: boolean;
};

export const SimpleButton: React.FC<Props> = ({ children, onPress, icon, clicked }) => {
  return (
    <BlankButton
      backgroundColor={clicked ? '#CBCED7' : '#76A2EB'}
      color="white"
      icon={icon}
      onPress={onPress}
      borderRadius={36}>
      {children}
    </BlankButton>
  );
};
