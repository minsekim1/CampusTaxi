import styled from '@emotion/native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleButton } from '../../../../components/button/SimpleButton';
import { BlankBackground } from '../../../../components/layout/BlankBackground';
import { LoginStackParamList } from '../LoginNavigation';

type LoginNavigation = StackNavigationProp<LoginStackParamList, 'FoundScreen'>;
type LoginRoute = RouteProp<LoginStackParamList, 'FoundScreen'>;

export const FoundScreen: React.FC = ({}) => {
  const { navigate } = useNavigation<LoginNavigation>();
  const { params } = useRoute<LoginRoute>();

  return (
    <BlankBackground>
      <SafeAreaView>
        <Container>
          <Content>회원님의 아이디는</Content>
          <Result>{params.id}</Result>
          <Content>입니다</Content>
          <ButtonContainer>
            <ButtonWrapper>
              <SimpleButton
                onPress={() => {
                  navigate('LoginScreen');
                }}>
                로그인 하러 가기
              </SimpleButton>
            </ButtonWrapper>
            <ButtonWrapper>
              <SimpleButton
                onPress={() => {
                  navigate('FindPasswordScreen');
                }}>
                비밀번호 찾기
              </SimpleButton>
            </ButtonWrapper>
          </ButtonContainer>
        </Container>
      </SafeAreaView>
    </BlankBackground>
  );
};

const Container = styled.View`
  margin-top: 96px;
  align-items: center;
`;

const Content = styled.Text`
  margin-bottom: 8px;
`;

const Result = styled.Text`
  width: 70%;
  text-align: center;
  padding: 8px;
  border: 2px solid rgba(149, 149, 149, 0.09);
  margin-bottom: 8px;
`;

const ButtonWrapper = styled.View`
  margin-bottom: 16px;
`;

const ButtonContainer = styled.View`
  margin-top: 96px;
`;
