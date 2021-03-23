import styled, { css } from '@emotion/native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { SimpleButton } from '../button/SimpleButton';

type Props = {
  onSend: () => void;
};
export const PhoneVerification: React.FC<Props> = ({ onSend }) => {
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneCountry, setPhoneCountry] = useState('');
  return (
    <>
      <PhoneContainer>
        <RNPickerSelect
          style={{
            inputAndroidContainer: PickerContainer,
            inputIOSContainer: PickerContainer,
            viewContainer: PickerViewContainer,
            placeholder: PickerText,
            inputAndroid: PickerText,
          }}
          onValueChange={(value) => setPhoneCountry(value)}
          items={[{ label: '+82', value: '82' }]}
          value={phoneCountry}
          placeholder={{ label: '선택', value: '0' }}
        />
        <PhoneNumber
          value={phone}
          onChangeText={setPhone}
          placeholder="휴대폰 번호"
          placeholderTextColor="#b0b0b2"
          keyboardType="phone-pad"
        />
      </PhoneContainer>
      <SimpleButton
        onPress={() => {
          if (phone && phoneCountry) {
            setSent(true);
            onSend();
          }
        }}
        clicked={sent}>
        {sent ? '재전송하기' : '인증번호 전송하기'}
      </SimpleButton>
    </>
  );
};

const PhoneContainer = styled.View`
  flex-direction: row;
  margin-bottom: 24px;
`;

const PhoneNumber = styled.TextInput`
  flex: 5;
  padding: 8px;
  border: 2px solid rgba(149, 149, 149, 0.09);
  border-radius: 8px;
`;

const PickerViewContainer = css`
  flex: 2;
  border: 2px solid rgba(149, 149, 149, 0.09);
  border-radius: 8px;
`;
const PickerContainer = css`
  padding: 8px;
`;

const PickerText = css`
  color: black;
`;
