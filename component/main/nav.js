import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from "./MainScreen"
import chatScreen from "./chatScreen"
import chatroomScreen from "./chatroomScreen"
import createRoom from "./createRoom"
import selectPlace from "./selectPlace"

const s = createStackNavigator();
const headerDisable = { headerShown: false };

export default function mainNav() {
  return (
    <s.Navigator screenOptions={headerDisable}>
      <s.Screen name="MainScreen" component={MainScreen} />
      <s.Screen name="모든 채팅방 목록" component={chatScreen} />
      <s.Screen name="채팅방" component={chatroomScreen} />
      <s.Screen name="방 만들기" component={createRoom} />
      <s.Screen name="지도검색" component={selectPlace} />
    </s.Navigator>
  );
}
