import styled from '@emotion/native';
import CheckBox from '@react-native-community/checkbox';
import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  value: boolean;
  setValue?: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
};
export const SimpleCheckBox: React.FC<Props> = ({ value, setValue, disabled }) => {
  return (
    <CustomCheckBox
      animationDuration={0.01}
      disabled={disabled}
      value={value}
      onValueChange={(newValue) => setValue && setValue(newValue)}
      onTintColor="#f8a000"
      onCheckColor="#f8a000"
      tintColor="#000000"
      boxType="square"
      onAnimationType="flat"
      offAnimationType="flat"
      lineWidth={1.2}
    />
  );
};

const CustomCheckBox = styled(CheckBox)`
  width: 20px;
  height: 20px;
`;
