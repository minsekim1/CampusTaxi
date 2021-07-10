import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { GeoScreen } from './document/GeoScreen';
import { MarketingScreen } from './document/MarketingScreen';
import { PrivacyScreen } from './document/PrivacyScreen';
import { TermsScreen } from './document/TermsScreen';
import { FindIdScreen } from './findId/FindIdScreen';
import { FoundScreen } from './findId/FoundScreen';
import { FindPasswordScreen } from './findPassword/FindPasswordScreen';
import { ResetScreen } from './findPassword/ResetScreen';
import { LoginScreen } from './LoginScreen';
import { AgreeScreen } from './register/AgreeScreen';
import { RegisterScreen } from './register/RegisterScreen';
import { RegisterSuccessScreen } from './register/RegisterSuccessScreen';

export type LoginStackParamList = {
  LoginScreen: undefined;
  AgreeScreen: undefined;
  RegisterScreen: undefined;
  FindPasswordScreen: undefined;
  ResetScreen: undefined;
  FindIdScreen: undefined;
  FoundScreen: { name: string, phone: string };
  GeoScreen: undefined;
  MarketingScreen: undefined;
  PrivacyScreen: undefined;
  TermsScreen: undefined;
  RegisterSuccessScreen: undefined;
};
const LoginStack = createStackNavigator<LoginStackParamList>();

export const LoginNavigation = () => {
  return (
    <LoginStack.Navigator
      initialRouteName="LoginScreen">
      <LoginStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <LoginStack.Screen
        name="AgreeScreen"
        component={AgreeScreen}
        options={{ headerTitleAlign: 'center', title: '이용동의' }}
      />
      <LoginStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerTitleAlign: 'center', title: '회원가입' }}
      />
      <LoginStack.Screen
        name="FindPasswordScreen"
        component={FindPasswordScreen}
        options={{ headerTitleAlign: 'center', title: '비밀번호 찾기' }}
      />
      <LoginStack.Screen
        name="ResetScreen"
        component={ResetScreen}
        options={{ headerTitleAlign: 'center', title: '비밀번호 재설정' }}
      />
      <LoginStack.Screen
        name="FindIdScreen"
        component={FindIdScreen}
        options={{ headerTitleAlign: 'center', title: '아이디 찾기' }}
      />
      <LoginStack.Screen
        name="FoundScreen"
        component={FoundScreen}
        options={{ headerTitleAlign: 'center', title: '아이디 찾기 결과' }}
      />
      <LoginStack.Screen
        name="GeoScreen"
        component={GeoScreen}
        options={{ headerTitleAlign: 'center', title: '위치정보 이용약관' }}
      />
      <LoginStack.Screen
        name="MarketingScreen"
        component={MarketingScreen}
        options={{ headerTitleAlign: 'center', title: '마케팅 정보 수신' }}
      />
      <LoginStack.Screen
        name="PrivacyScreen"
        component={PrivacyScreen}
        options={{ headerTitleAlign: 'center', title: '개인정보처리방침' }}
      />
      <LoginStack.Screen
        name="TermsScreen"
        component={TermsScreen}
        options={{ headerTitleAlign: 'center', title: '서비스 이용약관' }}
      />
      <LoginStack.Screen
        name="RegisterSuccessScreen"
        component={RegisterSuccessScreen}
        options={{ headerTitleAlign: 'center', title: '회원 가입 완료' }}
      />
    </LoginStack.Navigator>
  );
};
