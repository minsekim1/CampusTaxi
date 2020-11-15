import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import mainNav from './component/main/nav'
import loginNav from './component/Login/nav'
import mapNav from './component/map/nav'
import mychatNav from './component/mychat/nav'
import settingNav from './component/setting/nav'
const Tab = createBottomTabNavigator();
const TabS = createStackNavigator();

function nav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="main" component={mainNav} />
      <Tab.Screen name="mychat" component={mychatNav} />
      <Tab.Screen name="map" component={mapNav} />
      <Tab.Screen name="setting" component={settingNav} />
    </Tab.Navigator>)
}
const headerDisable = { headerShown: false };
const isLogin = true;
export default function App() {
  return (
    <NavigationContainer>
      <TabS.Navigator screenOptions={headerDisable}>
        {
          isLogin ?
            <TabS.Screen name="a" component={nav} />
            :
            <TabS.Screen name="b" component={loginNav} />
        }
      </TabS.Navigator>
    </NavigationContainer >
  );
}
// shift_alt+.자동 수정