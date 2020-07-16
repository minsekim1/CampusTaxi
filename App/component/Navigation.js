import * as React from "react";
import { Component, useState } from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AlramScreen from "./AlramScreen";
import SettingScreen from "./SettingScreen";
import TempScreen from "./TempScreen";
import MainScreen from "MainScreen";
import chatScreen from "chatScreen";
import chatroomScreen from "chatroomScreen";

import MychatScreen from "MychatScreen";
import campusStyle from "style";
const Tab = createBottomTabNavigator();
export default class Navigation extends Component {
  render() {
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
        this.state = {
          bbs: "asd",
        };
        // alert(JSON.stringify(this.state));
      }
      render() {
        return (
          <HomeStack.Navigator initialRouteName="홈">
            <HomeStack.Screen name="temp" component={TempScreen} />
            <HomeStack.Screen
              options={defaultNavOption}
              name="홈"
              component={MainScreen}
            />
            <HomeStack.Screen
              name="모든 채팅방 목록"
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
                headerRight: () => (
                  <View style={campusStyle.View.row}>
                    <TouchableOpacity
                      onPress={() => {
                        // setFilterVisible(true);
                        alert("asd");
                      }}
                      style={{ marginRight: 20 }}
                    >
                      <MaterialIcons
                        name="filter-list"
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        // setFilterVisible(true);
                        this.setState({ bbs: "asddd" });
                        alert(JSON.stringify(this.state));
                      }}
                      style={{ marginRight: 15 }}
                    >
                      <AntDesign name="search1" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                ),
              }}
              component={chatScreen}
            />
            <HomeStack.Screen
              name="채팅방"
              options={defaultNavOption}
              component={chatroomScreen}
            />
          </HomeStack.Navigator>
        );
      }
    }

    function MychatStackScreen() {
      return (
        <MychatStack.Navigator initialRouteName="내 채팅">
          <MychatStack.Screen name="temp" component={TempScreen} />
          <MychatStack.Screen
            options={showNavOption}
            name="내 채팅"
            component={MychatScreen}
          />
          <MychatStack.Screen
            name="채팅방"
            options={defaultNavOption}
            component={chatroomScreen}
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
                iconName = focused ? "ios-airplane" : "ios-airplane";
              } else if (route.name === "내 채팅") {
                iconName = focused ? "ios-airplane" : "ios-airplane";
              } else if (route.name === "알림") {
                iconName = focused ? "ios-airplane" : "ios-airplane";
              } else if (route.name === "설정") {
                iconName = focused ? "ios-airplane" : "ios-airplane";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            //아이콘 색상 설정
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="홈" component={HomeStackScreen} />
          <Tab.Screen name="내 채팅" component={MychatStackScreen} />
          <Tab.Screen name="알림" component={AlramScreen} />
          <Tab.Screen name="설정" component={SettingScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
