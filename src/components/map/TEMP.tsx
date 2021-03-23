import styled from '@emotion/native';
import React, { Dispatch, SetStateAction } from 'react';
import { KeyboardTypeOptions } from 'react-native';

type Props = {
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
  maxLength?: number;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  flex?: number;
  centered?: boolean;
};
export const TextField: React.FC<Props> = ({
  value,
  setValue,
  maxLength,
  placeholder,
  keyboardType,
  flex,
  centered,
}) => {
  return (
    <Box
      flex={flex}
      value={value}
      onChangeText={setValue}
      maxLength={maxLength}
      placeholder={placeholder}
      placeholderTextColor="#b0b0b2"
      keyboardType={keyboardType}
      centered={centered}
    />
  );
};

const Box = styled.TextInput<{ flex?: number; centered?: boolean }>`
  flex: ${({ flex }) => flex};
  padding: 8px;
  border: 2px solid rgba(149, 149, 149, 0.09);
  border-radius: 8px;
  margin-bottom: 12px;
  text-align: ${({ centered }) => centered && 'center'};
`;
// const NaverMapView = styled.NaverMapView<{ flex?: number; centered?: boolean }>`
//   flex: ${({ flex }) => flex};
//   padding: 8px;
//   border: 2px solid rgba(149, 149, 149, 0.09);
//   border-radius: 8px;
//   margin-bottom: 12px;
//   text-align: ${({ centered }) => centered && 'center'};
// `;