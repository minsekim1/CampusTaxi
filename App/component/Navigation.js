import * as React from "react";
import { Component, useState } from "react";
import { Button, View, Text, TouchableOpacity, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import AlramScreen from "./AlramScreen";
import SettingScreen from "./SettingScreen";
import TempScreen from "./TempScreen";
import MainScreen from "MainScreen";
import chatScreen from "chatScreen";
import chatroomScreen from "chatroomScreen";
import chatinfo from "component/MainScreen/chatinfo";
import createRoom from "component/MainScreen/createRoom";
import MapScreen from "component/MapScreen/MapScreen";
import MychatScreen from "MychatScreen";
import campusStyle from "style";
const Tab = createBottomTabNavigator();
import { bbsStore, userStore, anotherStore } from "store";
import LoadingScreen from "./Login/LoadingScreen";

//import { observer, inject } from "mobx-react";
export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: null,
      clientPassword: null,
    };
  }
  render() {
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
    if (!userStore.isKey()) {
      alert("로그아웃되었습니다.");
      this.props.navigation.navigate("Login");
    }
    const defaultNavOption = {
      headerStyle: {
        backgroundColor: "#0D3664",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerTitleAlign: "center",
      headerShown: false,
      // ...TransitionPresets.ModalSlideFromBottomIOS,
    };
    const showNavOption = {
      headerStyle: {
        backgroundColor: "#0D3664",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerTitleAlign: "center",
      headerShown: true,
      // ...TransitionPresets.ModalSlideFromBottomIOS,
    };
    const HomeStack = createStackNavigator();
    const MychatStack = createStackNavigator();
    const AlramStack = createStackNavigator();
    const SettingStack = createStackNavigator();

    class HomeStackScreen extends Component {
      constructor(props) {
        super(props);
      }
      render() {
        return (
          <HomeStack.Navigator initialRouteName="홈">
            <HomeStack.Screen
              options={defaultNavOption}
              name="홈"
              component={MainScreen}
            />
            <HomeStack.Screen
              options={showNavOption}
              name="방 만들기"
              component={createRoom}
            />
            <HomeStack.Screen
              name="모든 채팅방 목록"
              options={defaultNavOption}
              component={chatScreen}
            />
            <HomeStack.Screen
              name="채팅방"
              options={defaultNavOption}
              component={chatroomScreen}
            />
            <HomeStack.Screen
              name="채팅방정보"
              options={showNavOption}
              component={chatinfo}
            />
            <HomeStack.Screen
              options={modalOptions}
              name="loading"
              component={LoadingScreen}
            />
          </HomeStack.Navigator>
        );
      }
    }

    function MychatStackScreen() {
      return (
        <MychatStack.Navigator initialRouteName="내 채팅">
          <MychatStack.Screen
            options={{
              headerLeft: null,
              headerStyle: {
                backgroundColor: "#0D3664",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}
            name="내 채팅"
            component={MychatScreen}
          />
          <MychatStack.Screen
            name="채팅방"
            options={defaultNavOption}
            component={chatroomScreen}
          />
          <MychatStack.Screen
            name="채팅방정보"
            options={{
              headerStyle: {
                backgroundColor: "#0D3664",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
              headerShown: true,
              title: "대화상대(0/0)",
            }}
            initialParams={{ bbskey: null }}
            component={chatinfo}
          />
        </MychatStack.Navigator>
      );
    }

    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              //아이콘 설정
              let iconName;

              if (route.name === "홈") {
                iconName = focused ? "home" : "home";
              } else if (route.name === "내 채팅") {
                iconName = focused ? "chat" : "chat";
              } else if (route.name === "지도") {
                iconName = focused ? "map" : "map";
              } else if (route.name === "알림") {
                iconName = focused ? "alarm" : "alarm";
              } else if (route.name === "설정") {
                iconName = focused ? "settings" : "settings";
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            //아이콘 색상 설정
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
          initialRouteName="홈"
        >
          <Tab.Screen name="홈" component={HomeStackScreen} />
          <Tab.Screen name="내 채팅" component={MychatStackScreen} />
          <Tab.Screen
            name="지도"
            component={MapScreen}
            initialParams={{ url: "https://map.kakao.com/" }}
          />
          {/* <Tab.Screen name="알림" component={AlramScreen} /> */}
          <Tab.Screen name="설정" component={SettingScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
