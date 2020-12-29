import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import loginPage from "./loginPage"
import sign from "./sign"
import { addUser } from "./addUser"
import { complete } from "./complete"
import {
  clientpagePolicy1,
  clientpagePolicy2,
  clientpagePolicy3,
  clientpagePolicy4,
} from "./policy";
const s = createStackNavigator();
const headerDisable = { headerShown: false };
export default function LoginNav() {
  return (
    <s.Navigator>
      <s.Screen name="login" component={loginPage} options={headerDisable} />
      <s.Screen name="회원가입" component={sign} />
      <s.Screen name="서비스 이용약관" component={clientpagePolicy3} />
      <s.Screen name="개인정보처리방침" component={clientpagePolicy1} />
      <s.Screen name="위치정보 이용약관" component={clientpagePolicy2} />
      <s.Screen name="마케팅 정보 수신" component={clientpagePolicy4} />
      <s.Screen name="회원 정보 입력" component={addUser} />
      <s.Screen name="회원 가입 완료" component={complete} />
    </s.Navigator>
  );
}