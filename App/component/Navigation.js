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
import MapScreen from "component/MapScreen/MapScreen";

import MychatScreen from "MychatScreen";
import userStore from "store/userStore.js";
import campusStyle from "style";
const Tab = createBottomTabNavigator();

export default function Navigation() {
  const [clientName, setName] = React.useState(null);
  const [clientPassword, setPassword] = React.useState(null);

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
        </HomeStack.Navigator>
      );
    }
  }

  function LoginScreen({ route, navigation }) {
    let name = "asdfg";
    let password = "asdfg";
    function login(id, pw) {
      userStore.login(id, password).then((result) => {
        if (result) {
          setName(result.f);
          setPassword(result.g);
          alert("정상적으로 로그인되었습니다.");
          navigation.navigate("홈", {
            userkey: result.f,
          });
        }
      });
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>아이디와 비밀번호를 입력해주세요.</Text>
        <TextInput
          placeholder="아이디를 입력해주세요"
          style={{
            fontSize: 18,
            margin: 0,
            borderColor: "#27BE5E",
            borderBottomWidth: 2,
            width: "60%",
          }}
          value={clientName}
          onChangeText={(textEntry) => (name = textEntry)}
          onSubmitEditing={() => login(name, password)}
        />
        <TextInput
          placeholder="비밀번호을 입력해주세요"
          style={{
            fontSize: 18,
            margin: 0,
            borderColor: "#27BE5E",
            borderBottomWidth: 2,
            width: "60%",
          }}
          value={clientPassword}
          onChangeText={(textEntry) => (password = textEntry)}
          onSubmitEditing={() => login(name, password)}
        />
        <Button title="입장" onPress={() => login(name, password)} />
      </View>
    );
  }

  function MychatStackScreen() {
    return (
      <MychatStack.Navigator initialRouteName="내 채팅">
        <MychatStack.Screen
          options={showNavOption}
          name="내 채팅"
          component={MychatScreen}
          initialParams={{ userkey: clientName }}
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
      >
        {clientName == null ? (
          <Tab.Screen
            name="로그인"
            component={LoginScreen}
            options={{ tabBarVisible: false }}
          />
        ) : null}
        <Tab.Screen name="홈" component={HomeStackScreen} />
        <Tab.Screen name="내 채팅" component={MychatStackScreen} />
        <Tab.Screen
          name="지도"
          component={MapScreen}
          initialParams={{ url: "https://m.map.naver.com/" }}
        />
        <Tab.Screen name="알림" component={AlramScreen} />
        <Tab.Screen name="설정" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
