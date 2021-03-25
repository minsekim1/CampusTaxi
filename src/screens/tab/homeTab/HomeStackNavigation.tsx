import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HomeScreen } from './HomeScreen';

export type HomeStackParamList = {
  HomeScreen: undefined;
  CreateScreen: undefined;
};
const HomeStack = createStackNavigator<HomeStackParamList>();

export const HomeStackNavigation = () => {
  // 초기 페이지 변경시 아래를 이용, 현재 1페이지라서 일단 뺌.
  // const props = useAuthContext().MoveNav.props;
  // initialRouteName={(props?.screen) ? props.screen : "ChatRoomScreen"} 
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen">
      <HomeStack.Screen name="HomeScreen" options={{headerShown: false}} component={HomeScreen} />
    </HomeStack.Navigator>
  );
};
