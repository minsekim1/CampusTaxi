import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import { SimpleButton } from '../../../components/button/SimpleButton';
import { PhoneVerification } from '../../../components/form/PhoneVerification';
import { TextField } from '../../../components/form/TextField';
import { BlankBackground } from '../../../components/layout/BlankBackground';
import { SimpleText } from '../../../components/text/SImpleText';
import { Title } from '../../../components/text/Title';
import { LoginStackParamList } from '../LoginNavigation';

type LoginNavigation = StackNavigationProp<LoginStackParamList, 'FindPasswordScreen'>;

enum FindMethod {
  PHONE = 'phone',
}

export const FindPasswordScreen: React.FC = ({}) => {
  const { navigate } = useNavigation<LoginNavigation>();
  const [id, setId] = useState('');
  const [hasId, setHasId] = useState(false);
  const [method, setMethod] = useState<FindMethod>();
  const [name, setName] = useState('');
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState('');

  return !hasId ? (
    <BlankBackground>
      <SafeContainer>
        <Container>
          <HeadContainer>
            <Title>비밀번호 찾기</Title>
            <Description>비밀번호를 찾고자하는 아이디를 입력해 주세요.</Description>
          </HeadContainer>
          <TextField value={id} setValue={setId} placeholder="아이디 입력하기" />
          <DescriptionContainer>
            <Description>아이디가 기억나지 않는다면?</Description>
            <IdText
              onPress={() => {
                navigate('FindIdScreen');
              }}>
              아이디 찾기
            </IdText>
          </DescriptionContainer>
          <SimpleButton
            onPress={() => {
              setHasId(true);
            }}>
            다음으로
          </SimpleButton>
        </Container>
      </SafeContainer>
    </BlankBackground>
  ) : (
    <BlankBackground>
      <SafeContainer>
        <Container>
          <Title centered>비밀번호 찾는 방법을 선택해 주세요.</Title>
          <RadioContainer>
            <RadioForm formHorizontal={true} animation={true}>
              <RadioButton labelHorizontal={true}>
                <RadioButtonInput
                  obj={{ label: '휴대전화로 인증', value: FindMethod.PHONE }}
                  index={0}
                  isSelected={method === FindMethod.PHONE}
                  onPress={() => {
                    setMethod(FindMethod.PHONE);
                  }}
                  buttonInnerColor={'#707070'}
                  buttonOuterColor={method === FindMethod.PHONE ? '#707070' : '#707070'}
                  buttonSize={12}
                  buttonOuterSize={24}
                />
                <RadioButtonLabel
                  obj={{ label: '휴대전화로 인증', value: FindMethod.PHONE }}
                  index={0}
                  labelHorizontal={true}
                  onPress={() => {
                    setMethod(FindMethod.PHONE);
                  }}
                />
              </RadioButton>
            </RadioForm>
            <Description
              onPress={() => {
                setMethod(FindMethod.PHONE);
              }}>
              회원정보에 등록한 휴대전화 번호와 입력한 휴대전화 번호가 같아야, 인증번호를 받을 수
              있습니다.
            </Description>
            <RadioLine />
            {method === FindMethod.PHONE && (
              <PhoneContainer>
                <Description>사용자 아이디</Description>
                <SimpleText align="left">{id}</SimpleText>
                <TextField value={name} setValue={setName} placeholder="이름(본명)" />
                <PhoneVerification
                  onSend={() => {
                    setSent(true);
                  }}
                />
                {sent && (
                  <SentContainer>
                    <TextField
                      value={code}
                      setValue={setCode}
                      maxLength={6}
                      placeholder="인증번호 숫자 6자리"
                      keyboardType="numeric"
                    />
                    <Description>인증번호가 오지 않나요?</Description>
                    <SimpleButton
                      onPress={() => {
                        navigate('ResetScreen');
                      }}>
                      확인
                    </SimpleButton>
                  </SentContainer>
                )}
              </PhoneContainer>
            )}
          </RadioContainer>
        </Container>
      </SafeContainer>
    </BlankBackground>
  );
};

const SafeContainer = styled.SafeAreaView`
  flex: 1;
`;
const Container = styled.View`
  margin-left: 24px;
  margin-right: 24px;
  flex: 1;
`;

const Description = styled.Text`
  color: #7d849b;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 12px;
`;

const RadioLine = styled.View`
  width: 350px;
  margin-bottom: 12px;
  border: 1px solid #e5e5e8;
  align-self: center;
`;

const RadioContainer = styled.View`
  flex: 1;
`;

const SentContainer = styled.View`
  margin-top: 24px;
`;

const HeadContainer = styled.View``;

const DescriptionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const IdText = styled.Text`
  color: #7d849b;
  font-weight: bold;
`;

const PhoneContainer = styled.View`
  flex: 1;
`;
