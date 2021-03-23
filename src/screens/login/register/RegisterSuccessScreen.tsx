import styled from '@emotion/native';
import React from 'react';
import RNRestart from 'react-native-restart';
import { BlankButton } from '../../../components/button/BlankButton';
import { BlankBackground } from '../../../components/layout/BlankBackground';
import { RegisterLogo } from '../../../components/logo/RegisterLogo';

export const RegisterSuccessScreen = () => {
  return (
    <BlankBackground color="#fff">
      <Container>
        <RegisterLogo />
        <LogoText>CAMPUS TAXI</LogoText>
        <WelcomeText>환영합니다!</WelcomeText>
        <Description>
          해당 어플은 삼육대학교 창업동아리{'\n'}'캠퍼스택시'가 제작하고{'\n'}운영하는 어플입니다.
          {'\n'}
          송금은
          <BlueText>TOSS앱</BlueText>,{'\n'}택시 호출은 <YellowText>카카오 택시</YellowText>를{'\n'}
          이용해 주세요!
        </Description>
      </Container>
      <BlankButton
        backgroundColor="#CBCED7"
        color="white"
        onPress={() => {
          RNRestart.Restart();
        }}
        paddingBottom={8}>
        처음으로 돌아가기
      </BlankButton>
      <BlankButton backgroundColor="#172864" color="white" onPress={() => {}} paddingBottom={16}>
        로그인
      </BlankButton>
    </BlankBackground>
  );
};

const Container = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 48px;
  flex: 1;
`;

const LogoText = styled.Text`
  margin: 24px;
  font-size: 18px;
  text-align: center;
`;

const WelcomeText = styled.Text`
  margin: 24px;
  font-size: 18px;
  text-align: center;
  color: #6060dc;
`;

const Description = styled.Text`
  font-size: 18px;
  text-align: center;
`;

const BlueText = styled.Text`
  color: #0a39f6;
`;

const YellowText = styled.Text`
  color: #fdec00;
`;
