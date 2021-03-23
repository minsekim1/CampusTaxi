import styled from '@emotion/native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { BottomButton } from '../../../components/button/BottomButton';
import { SimpleButton } from '../../../components/button/SimpleButton';
import { SimpleCheckBox } from '../../../components/checkbox/SimpleCheckBox';
import { PhoneVerification } from '../../../components/form/PhoneVerification';
import { LoginStackParamList } from '../LoginNavigation';

type LoginNavigation = NavigationProp<LoginStackParamList, 'RegisterScreen'>;

export const RegisterScreen: React.FC = ({}) => {
  const { navigate } = useNavigation<LoginNavigation>();
  const [code, setCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [gender, setGender] = useState(0);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [file, setFile] = useState('');
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');

  return (
    <Container>
      <ScrollContainer>
        <KeyboardContainer>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ContentContainer>
              <SectionContainer>
                <CheckboxContainer>
                  <SimpleCheckBox value={Boolean(code)} disabled />
                  <Content>휴대폰 인증</Content>
                </CheckboxContainer>
                <PhoneVerification onSend={() => {}} />
                <CodeContainer>
                  <Code value={code} onChangeText={setCode} maxLength={6} keyboardType="numeric" />
                </CodeContainer>
              </SectionContainer>
              <SectionContainer>
                <CheckboxContainer>
                  <SimpleCheckBox value={Boolean(code)} disabled />
                  <Content>회원 정보 입력</Content>
                </CheckboxContainer>
                <FormContainer>
                  <FormDescription>닉네임</FormDescription>
                  <FormInput value={nickname} onChangeText={setNickname} autoCapitalize="none" />
                </FormContainer>
                <FormContainer>
                  <FormDescription>아이디</FormDescription>
                  <FormInput value={id} onChangeText={setId} autoCapitalize="none" />
                </FormContainer>
                <FormContainer>
                  <FormDescription>비밀번호</FormDescription>
                  <FormInput
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    textContentType="password"
                  />
                </FormContainer>
                <FormContainer>
                  <FormDescription>비밀번호 확인</FormDescription>
                  <FormInput
                    value={passwordCheck}
                    onChangeText={setPasswordCheck}
                    autoCapitalize="none"
                    textContentType="newPassword"
                  />
                </FormContainer>
                <FormContainer>
                  <FormDescription>성별</FormDescription>
                  <FormSelect>
                    <SelectItem
                      active={gender === 1}
                      onPress={() => {
                        setGender(1);
                      }}>
                      <WhiteText>남자</WhiteText>
                    </SelectItem>
                    <SelectItem
                      active={gender === 2}
                      onPress={() => {
                        setGender(2);
                      }}>
                      <WhiteText>여자</WhiteText>
                    </SelectItem>
                  </FormSelect>
                </FormContainer>
                <FormContainer>
                  <FormDescription>이메일(선택)</FormDescription>
                  <FormInput
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </FormContainer>
                <FormContainer>
                  <FormDescription>주소(선택)</FormDescription>
                  <FormInput value={address} onChangeText={setAddress} autoCapitalize="none" />
                </FormContainer>
              </SectionContainer>
              <SectionContainer>
                <CheckboxContainer>
                  <SimpleCheckBox value={Boolean(code)} disabled />
                  <Content>학생증 인증 {'\n'} (온라인 학생증도 가능)</Content>
                </CheckboxContainer>
                <SimpleButton
                  onPress={() => {
                    launchImageLibrary({ mediaType: 'photo', includeBase64: true }, (response) => {
                      console.log('Response = ', response);

                      if (response.base64) {
                        setFile(response.base64);
                      }
                    });
                  }}
                  clicked={Boolean(file)}>
                  {file ? '완료' : '학생증 사진 선택'}
                </SimpleButton>
                <ImageContainer source={{ uri: `data:image/jpg;base64,${file}` }} />
                <FormContainer>
                  <FormDescription>이름(본명)</FormDescription>
                  <FormInput value={name} onChangeText={setName} autoCapitalize="none" />
                </FormContainer>
                <FormContainer>
                  <FormDescription>학교</FormDescription>
                  <FormInput value={school} onChangeText={setSchool} autoCapitalize="none" />
                </FormContainer>
              </SectionContainer>
            </ContentContainer>
          </TouchableWithoutFeedback>
        </KeyboardContainer>
      </ScrollContainer>
      <BottomButton
        onPress={() => {
          navigate('RegisterSuccessScreen');
        }}>
        가입 하기
      </BottomButton>
    </Container>
  );
};

const KeyboardContainer = styled(KeyboardAwareScrollView)`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

const ContentContainer = styled.View`
  flex: 1;
  margin: 36px 16px;
`;

const SectionContainer = styled.View`
  margin-bottom: 36px;
`;

const CheckboxContainer = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
  align-items: center;
`;

const Content = styled.Text`
  margin-left: 8px;
`;

const CodeContainer = styled.View`
  align-items: center;
  text-align: center;
`;

const Code = styled.TextInput`
  width: 100px;
  text-align: center;
  padding: 8px;
  border: 0px solid #646481;
  border-bottom-width: 1px;
`;

const FormContainer = styled.View`
  margin-bottom: 14px;
`;

const FormDescription = styled.Text`
  color: #7d849b;
  font-size: 11px;
`;

const FormInput = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: #e5e5e8;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 15px;
`;

const FormSelect = styled.View`
  flex-direction: row;
  margin-top: 16px;
  justify-content: center;
`;

const SelectItem = styled.TouchableOpacity<{ active: boolean }>`
  background-color: ${({ active }) => (active ? '#e5af0b' : '#cbced7')};
  padding: 4px 36px;
  border-radius: 19px;
  margin-right: 8px;
`;

const ImageContainer = styled.Image`
  margin-top: 12px;
  margin-bottom: 16px;
  width: 300px;
  height: 500px;
  justify-content: center;
  align-self: center;
`;

const WhiteText = styled.Text`
  color: white;
`;
