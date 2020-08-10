import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import FindId from "./FindId";
import FindPw from "./FindPw";
import { Sign1, Sign2, Sign3 } from "./Sign";
import Navigation from "Navigation";
const Stack = createStackNavigator();

export default function LoginNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="로그인"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home"
          component={Navigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="findId"
          component={FindId}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="findPw"
          component={FindPw}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="이용동의" component={Sign1} />
        <Stack.Screen name="회원 가입" component={Sign2} />
        <Stack.Screen name="회원 가입 완료" component={Sign3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
