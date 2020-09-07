import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import Sign1, { Sign2, Sign3 } from "./Sign";
import FindId1, { FindId2, FindId3 } from "./FindId";
import FindPw1, { FindPw2, FindPw3, FindPw4, FindPw5 } from "./FindPw";
import {
  View,
  Text,
  ScrollView,
  Linking,
  StyleSheet,
  Button,
} from "react-native";
//외주 부분
import Login from "./Login";
import WebLogin from "./WebLogin";

import {
  clientpagePolicy1,
  clientpagePolicy2,
  clientpagePolicy3,
  clientpagePolicy4,
} from "../SettingScreen";
import LoadingScreen from "./LoadingScreen";

const Stack = createStackNavigator();
export default function LoginNav() {
  const modalOptions = {
    headerShown: false,
    cardStyle: { backgroundColor: "transparent" },
    cardOverlayEnabled: true,
    cardStyleInterpolator: ({ current: { progress } }) => ({
      cardStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 0.5, 0.9, 1],
          outputRange: [0, 0.1, 0.3, 0.7],
        }),
      },
      overlayStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.6],
          extrapolate: "clamp",
        }),
      },
    }),
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WebLogin"
          component={WebLogin}
          options={({ navigation, route }) => ({
            headerTitle: () => <Text>SNS 소셜 로그인</Text>,
            headerLeft: () => (
              <Button
                title="뒤로가기"
                onPress={() => navigation.navigate("로그인")}
              />
            ),
          })}
          //{{ back title: "SNS 소셜 로그인" }}
        />

        <Stack.Screen
          name="로그인"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="이용동의" component={Sign1} />
        <Stack.Screen name="회원 가입" component={Sign2} />
        <Stack.Screen name="회원 가입 완료" component={Sign3} />
        <Stack.Screen name="아이디 찾기" component={FindId1} />
        <Stack.Screen name="아이디 찾기 인증" component={FindId2} />
        <Stack.Screen name="아이디 찾기 결과" component={FindId3} />
        <Stack.Screen name="비밀번호 찾기" component={FindPw1} />
        <Stack.Screen name="비밀번호 찾기 인증 선택" component={FindPw2} />
        <Stack.Screen name="비밀번호 찾기 인증" component={FindPw3} />
        <Stack.Screen name="비밀번호 재설정" component={FindPw4} />
        <Stack.Screen name="비밀번호 재설정 완료" component={FindPw5} />

        <Stack.Screen name="서비스 이용약관" component={clientpagePolicy3} />
        <Stack.Screen name="개인정보처리방침" component={clientpagePolicy1} />
        <Stack.Screen name="위치정보 이용약관" component={clientpagePolicy2} />
        <Stack.Screen name="마케팅 정보 수신" component={clientpagePolicy4} />

        <Stack.Screen
          name="loading"
          component={LoadingScreen}
          options={modalOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
