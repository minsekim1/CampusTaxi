import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import roomList from './roomList';
const Stack = createStackNavigator();
const headerDisable = { headerShown: false };
export default function mychatNav() {
  return (
    <Stack.Navigator screenOptions={headerDisable}>
      <Stack.Screen name="모든 채팅방 목록" component={roomList} />
    </Stack.Navigator>
  );
}
