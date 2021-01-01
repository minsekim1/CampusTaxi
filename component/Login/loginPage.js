import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import { Component, useState } from "react";
import {
  StyleSheet,
  //Button,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground, Switch, BackHandler,ToastAndroid,
  Platform,
  AlertIOS,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import _ from "lodash";
import { Button } from "react-native-paper";
import { userStore } from "../store/store";
import LogoWhite from "./logoWhite.js";
import { CustomContext } from "../store/context";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
//import { LoginContext } from "../../App";
import Constants from 'expo-constants';

export default function loginPage({ route, navigation }) {
  const [id, changeId] = useState('');
  const [pw, changePw] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const { setUser, setToken, setId, setPw, user } = React.useContext(CustomContext);
  // 뒤로가기 버튼 제어 & 더블클릭시 앱 종료
  let currentCount = 0;
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton)
      //console.log("focus loginPage");
    });
    navigation.addListener('blur', () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
      //console.log("blur loginPage");
    })
  }, []);
  const handleBackButton = () => {
    if (currentCount < 1) {
      currentCount += 1;
      if (Platform.OS === 'android') {
      ToastAndroid.show('뒤로 가기를 한번 더 누르면 앱이 종료됩니다.\n로그아웃은 설정->로그아웃으로 가주세요.', ToastAndroid.SHORT)
    } else {
      AlertIOS.alert('뒤로 가기를 한번 더 누르면 앱이 종료됩니다.\n로그아웃은 설정->로그아웃으로 가주세요.');
    }
    } else {
      BackHandler.exitApp();
    }
    setTimeout(() => {
      currentCount = 0;
    }, 2000);
    return true;
  }
  async function login() {
    if (id != "" && pw != "")
      await userStore.login(id, pw).then((r) => {
        if (r) {
          if (autoLogin) {
            AsyncStorage.setItem('id', id);
            AsyncStorage.setItem('pw', pw);
            AsyncStorage.setItem('autoLogin', 'true');
          } else {
            AsyncStorage.setItem('id', '');
            AsyncStorage.setItem('pw', '');
            AsyncStorage.setItem('autoLogin', 'false');
          }
          setUser(r); setId(id); setPw(pw);
          navigation.navigate("MainScreen")
          setToken(null);
        } else {
          setUser(null); setId(null); setPw(null);
        }
      });
  }
  React.useEffect(() => {
    AsyncStorage.getItem('autoLogin').then((r) => {
      if (r) {
        AsyncStorage.getItem('id').then((r) => changeId(r));
        AsyncStorage.getItem('pw').then((r) => changePw(r));
        AsyncStorage.getItem('autoLogin').then((r) => { if (r == 'true') setAutoLogin(true); else setAutoLogin(false) });
      }
    })
  }, [])
  return (
    <>
    <KeyboardAvoidingView style={LoginStyle.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={LoginStyle.header}>
          <LogoWhite />
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: "#ffffff", fontSize: 18 }}>
              CAMPUS TAXI
              </Text>
          </View>
        </View>
        <View style={LoginStyle.body}>
          <View style={LoginStyle.login_input_container}>
            <TextInput
              placeholder="아이디를 입력해주세요"
              placeholderTextColor="#f0f0f0"
              style={LoginStyle.login_input_text}
              value={id}
              onChangeText={(textEntry) => changeId(textEntry)}
              onSubmitEditing={() => login()}
            />
            <TextInput
              placeholder="비밀번호을 입력해주세요"
              placeholderTextColor="#f0f0f0"
              style={LoginStyle.login_input_text}
              value={pw}
              onChangeText={(textEntry) => changePw(textEntry)}
              onSubmitEditing={() => login()}
              secureTextEntry
            />
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
            <Switch
                onValueChange={(r) => setAutoLogin(r)}
                value={autoLogin}
                style={(Platform.OS == "ios") ? { transform: [{ scaleX: .7 }, { scaleY: .7 }] } :null}
              />
            <Text style={{ color: "white", fontSize:14 }}>자동 로그인</Text>
              </View>
          </View>
          <View style={LoginStyle.button_container}>
            <View style={[LoginStyle.login_btn_style, LoginStyle.login_btn]}>
              <TouchableOpacity
                onPress={() => login()}
                style={{ height: "100%" }}
              >
                <View style={LoginStyle.login_text}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    로그인하기
                    </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={LoginStyle.login_btn_style}>
              <TouchableOpacity
                onPress={() => navigation.navigate("회원가입")}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#ffffff",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  회원가입
                  </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </KeyboardAvoidingView >
    <Image source={require("./background.png")} style={{position:"absolute",height:heightPercentageToDP(100), width:widthPercentageToDP(100), zIndex:-1}}/>
    </>
  );
}

const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
  },
  background: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
  },
  //로고, 캠퍼스택시 container
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  //로그인 body container
  body: {
    flex:1,
    alignItems:"center"
  },
  login_input_container: {
    width: widthPercentageToDP(60),
    marginBottom: 10,
  },
  login_input_text: {
    fontSize: 18,
    margin: 0,
    borderColor: "#a9a9a9",
    borderBottomWidth: 2,
    marginBottom: 10,
    paddingBottom: 5,
    textAlign: "center",
    color: "#ffffff",
  },
  button_container: {
    width:widthPercentageToDP(60)
  },

  login_btn_style: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 30,
    height: 50,
  },
  login_btn: {
    backgroundColor: "#EDEDED",
    borderRadius: 30,
  },
  login_text: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
{/* <View
              style={{ flexDirection: "row", width: "60%", marginBottom: 40 }}
            >
              <View style={{ flex: 2, alignItems: "flex-end" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("아이디 찾기")}
                >
                  <Text style={{ color: "#f0f0f0" }}> 아이디 찾기 </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={{ color: "#f0f0f0", fontWeight: "bold" }}>|</Text>
              </View>

              <View style={{ flex: 2, alignItems: "flex-start" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("비밀번호 찾기")}
                >
                  <Text style={{ color: "#f0f0f0" }}> 비밀번호 찾기 </Text>
                </TouchableOpacity>
              </View>
            </View> */}


{/* <View style={LoginStyle.login_btn_style}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#ffffff",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    SNS로그인으로 돌아가기
                  </Text>
                </TouchableOpacity>
              </View> */}
