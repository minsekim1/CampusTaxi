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
          <HomeStack.Screen name="temp" component={TempScreen} />
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
    let name = "";
    let password = "";
    const firebase = require("firebase");
    function loginFunc() {
      //유저가 없는지 확인
      if (name.length < 5 || password.length < 5)
        alert("아이디와 비밀번호는 5자리 이상이어야합니다.");
      else if (name == "" || password == "") {
        alert("아이디 또는 비밀번호가 빈 칸입니다.");
      } else {
        //유저 정보가 없다면 회원가입
        firebase
          .database()
          .ref("user/data/" + name)
          .once("value", (snapshot) => {
            if (snapshot.val() == null) {
              setName(name);
              setPassword(password);
              navigation.navigate("홈", {
                userkey: name,
              });
              const val = {
                a: "지역",
                b: "이메일",
                d: 0,
                e: new Date(),
                f: name,
                g: password,
                h: name,
                i: name,
                j: "01000000000",
                k: "image:url",
                l: "소속",
                n: 1,
              };
              firebase
                .database()
                .ref("user/data/" + name)
                .set(val);
              alert("회원 가입이 완료되었습니다.");
            } else {
              //유저 정보가 있다면 비밀번호 확인
              if (password == snapshot.val().g) {
                //패스워드랑 아이디가 맞다면 로그인
                setName(name);
                setPassword(password);
                navigation.navigate("홈", {
                  userkey: name,
                });
                alert("정상적으로 로그인되었습니다.");
              } else {
                alert("잘못된 비밀번호입니다.");
              }
            }
          });
      }

      // const [clientPassword, onChangePassword] = React.useState(null);
      // let newBbsKey = firebase.database().ref("user/data").push();
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>아이디(닉네임과 동일)</Text>
        <TextInput
          placeholder="아이디 및 닉네임을 입력해주세요"
          style={{
            fontSize: 18,
            margin: 0,
            borderColor: "#27BE5E",
            borderBottomWidth: 2,
            width: "60%",
          }}
          value={clientName}
          onChangeText={(textEntry) => (name = textEntry)}
          onSubmitEditing={() => loginFunc()}
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
          onSubmitEditing={() => loginFunc()}
        />
        <Button title="입장" onPress={() => loginFunc()} />
        <Text style={{ color: "gray", fontSize: 11 }}>
          회원가입은 아이디와 비밀번호를 입력하면 자동으로 가입됩니다.
        </Text>
        <Text style={{ color: "gray", fontSize: 11 }}>
          이미 가입이 완료된 분들은 원래 아이디와 비밀번호를 입력해주세요.
        </Text>
      </View>
    );
  }

  function MychatStackScreen() {
    return (
      <MychatStack.Navigator initialRouteName="내 채팅">
        <MychatStack.Screen name="temp" component={TempScreen} />
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
