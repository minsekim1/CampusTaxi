import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import mainNav from './main/nav'
import mapNav from './map/nav'
import mychatNav from './mychat/nav'
import settingNav from './setting/nav'
import { Ionicons } from '@expo/vector-icons';
const t = createBottomTabNavigator();
const headerDisable = { headerShown: false };
export default function TabNav() {
  return (
    <t.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          //아이콘 설정
          let iconName;
          if (route.name === "홈") {
            iconName = focused ? "md-home" : "md-home";
          } else if (route.name === "내 채팅") {
            iconName = focused ? "md-chatboxes" : "md-chatboxes";
          } else if (route.name === "지도") {
            iconName = focused ? "md-map" : "md-map";
            // } else if (route.name === "alarm") {
            //   iconName = focused ? "alarm" : "alarm";
          } else if (route.name === "설정") {
            iconName = focused ? "md-settings" : "md-settings";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <t.Screen name="홈" component={mainNav} />
      <t.Screen name="내 채팅" component={mychatNav} />
      <t.Screen name="지도" component={mapNav} />
      <t.Screen name="설정" component={settingNav} />
    </t.Navigator>
  )
}