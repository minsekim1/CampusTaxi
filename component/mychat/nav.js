import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import chatScreen from './chatScreen';
import chatroomScreen from '../main/chatroomScreen';
const Stack = createStackNavigator();
const headerDisable = { headerShown: false };
export default function mychatNav() {
  return (
    <Stack.Navigator screenOptions={headerDisable}>
      <Stack.Screen name="모든 채팅방 목록" component={chatScreen} />
      <Stack.Screen name="채팅방" component={chatroomScreen} />
    </Stack.Navigator>
  );
}
