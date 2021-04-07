import React, { ReactNode } from 'react';
import { BlankButton } from './BlankButton';

type Props = {
  onPress: () => void;
  icon?: ReactNode;
  color?: string;
  backgroundColor?: string;
  clicked?: boolean;
  isActive?: boolean;
};

export const SimpleButton: React.FC<Props> = ({ children, onPress, icon, clicked,isActive }) => {
  return (
    <BlankButton
      disable={!isActive}
      backgroundColor={clicked ? '#CBCED7' : '#76A2EB'}
      color="white"
      icon={icon}
      onPress={onPress}
      borderRadius={36}>
      {children}
    </BlankButton>
  );
};
