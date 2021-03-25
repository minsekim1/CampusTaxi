import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleButton } from '../../../../components/button/SimpleButton';
import { TextField } from '../../../../components/form/TextField';
import { BlankBackground } from '../../../../components/layout/BlankBackground';
import { Description } from '../../../../components/text/Description';
import { Title } from '../../../../components/text/Title';
import { LoginStackParamList } from '../LoginNavigation';

type LoginNavigation = StackNavigationProp<LoginStackParamList, 'ResetScreen'>;

export const ResetScreen: React.FC = ({}) => {
  const { navigate } = useNavigation<LoginNavigation>();
  const [newPassword, setNewPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isReset, setIsReset] = useState(false);
  return isReset ? (
    <BlankBackground>
      <SafeAreaView>
        <Container>
          <HeaderContainer>
            <Title>비밀번호 재설정이 완료됐습니다.</Title>
          </HeaderContainer>
          <SimpleButton
            onPress={() => {
              navigate('LoginScreen');
            }}>
            로그인 하러 가기
          </SimpleButton>
        </Container>
      </SafeAreaView>
    </BlankBackground>
  ) : (
    <BlankBackground>
      <SafeAreaView>
        <Container>
          <Title>새로 사용할 비밀번호를 입력해 주세요.</Title>
          <Description>영문, 숫자, 특수문자를 섞어 사용하면 더욱 안전합니다.</Description>
          <FieldContainer>
            <TextField
              value={newPassword}
              setValue={setNewPassword}
              placeholder="새 비밀번호"
              centered
            />
            <TextField
              value={passwordCheck}
              setValue={setPasswordCheck}
              placeholder="새 비밀번호 확인"
              centered
            />
          </FieldContainer>
          <SimpleButton
            onPress={() => {
              setIsReset(true);
            }}>
            비밀번호 재설정하기
          </SimpleButton>
        </Container>
      </SafeAreaView>
    </BlankBackground>
  );
};

const Container = styled.View`
  margin-top: 96px;
  align-items: center;
  margin-left: 36px;
  margin-right: 36px;
`;

const FieldContainer = styled.View`
  width: 80%;
  margin-bottom: 64px;
`;

const HeaderContainer = styled.View`
  margin-top: 64px;
`;
