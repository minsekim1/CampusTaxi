import styled from "@emotion/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform, View, Text } from "react-native";
import { HomeIcon } from "../../components/tab-icon/HomeIcon";
import { MessageIcon } from "../../components/tab-icon/MessageIcon";
import { PremiumIcon } from "../../components/tab-icon/PremiumIcon";
import { SettingIcon } from "../../components/tab-icon/SettingIcon";
import { HomeIconActive } from "../../components/tab-icon/HomeIconActive";
import { MessageIconActive } from "../../components/tab-icon/MessageIconActive";
import { PremiumIconActive } from "../../components/tab-icon/PremiumIconActive";
import { SettingIconActive } from "../../components/tab-icon/SettingIconActive";
import { HomeTabScreen } from "./homeTab/HomeTabScreen";
import { MessageTabScreen } from "./messageTab/MessageTabScreen";
import { PremiumTabScreen } from "./premiumTab/PremiumTabScreen";
import { SettingTabScreen } from "./settingTab/SettingTabScreen";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";

export type TabParamList = {
  HomeTabScreen: undefined;
  MessageTabScreen: undefined;
  PremiumTabScreen: undefined;
  SettingTabScreen: undefined;
};
const Tab = createBottomTabNavigator<TabParamList>();
export const TabNavigation = () => {
  const tab = useAuthContext().MoveNav.tab;
  return (
    <Tab.Navigator
      initialRouteName={
        tab === "HomeTabScreen" ||
        tab === "MessageTabScreen" ||
        tab === "PremiumTabScreen" ||
        tab === "SettingTabScreen"
          ? tab
          : "HomeTabScreen"
      }
      screenOptions={{ title: "" }}
      tabBarOptions={{
        iconStyle: {
          marginTop: 27,
          marginBottom: Platform.OS === "android" ? 8 : undefined,
        },
      }}
    >
      <Tab.Screen
        name="HomeTabScreen"
        component={HomeTabScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <TabBarItemView>
                <HomeIconActive />
                <TabBarTextActive>홈</TabBarTextActive>
              </TabBarItemView>
            ) : (
              <TabBarItemView>
                <HomeIcon />
                <TabBarText>홈</TabBarText>
              </TabBarItemView>
            ),
          tabBarVisible: true, //TEST CODE
        }}
      />
      <Tab.Screen
        name="MessageTabScreen"
        component={MessageTabScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <TabBarItemView>
                <MessageIconActive />
                <TabBarTextActive>채팅</TabBarTextActive>
              </TabBarItemView>
            ) : (
              <TabBarItemView>
                <MessageIcon />
                <TabBarText>채팅</TabBarText>
              </TabBarItemView>
            ),
        }}
      />
      <Tab.Screen
        name="PremiumTabScreen"
        component={PremiumTabScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <TabBarItemView>
                <PremiumIconActive />
                <TabBarTextActive>프리미엄</TabBarTextActive>
              </TabBarItemView>
            ) : (
              <TabBarItemView>
                <PremiumIcon />
                <TabBarText>프리미엄</TabBarText>
              </TabBarItemView>
            ),
        }}
      />
      <Tab.Screen
        name="SettingTabScreen"
        component={SettingTabScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <TabBarItemView>
                <SettingIconActive />
                <TabBarTextActive>설정</TabBarTextActive>
              </TabBarItemView>
            ) : (
              <TabBarItemView>
                <SettingIcon />
                <TabBarText>설정</TabBarText>
              </TabBarItemView>
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const TabBarText = styled.Text`
  color: #898989;
  font-size: 10px;
`;

const TabBarTextActive = styled.Text`
  color: #76a2eb;
  font-size: 10px;
`;

const TabBarItemView = styled.View`
  align-items: center;
  justify-content: center;
`;
