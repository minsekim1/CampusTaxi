import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import map from "./map"

const s = createStackNavigator();
const headerDisable = { headerShown: false };

export default function mapNav() {
  return (
    <s.Navigator screenOptions={headerDisable}>
      <s.Screen name="p1" component={map} initialParams={{ url: "https://map.kakao.com/" }} />
    </s.Navigator>
  );
}
