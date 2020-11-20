import * as React from "react";
import { Component, useState } from "react";
import {
  StyleSheet,
  //Button,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { userStore } from "store";
import { AuthContext } from "../store/UserStore"
import LogoWhite from "./logoWhite.js";
export default function loginPage({ route, navigation }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const { signIn } = React.useContext(AuthContext);
  async function login() {
    if (id != "" && pw != "")
      await userStore.login(id, pw).then((r) => { if (r !== null) { signIn({ id, pw }) } });
  }
  return (
    <View style={LoginStyle.container}>
      <ImageBackground
        source={require("./background.png")}
        style={LoginStyle.background}
      >
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
              onChangeText={(textEntry) => setId(textEntry)}
              onSubmitEditing={() => login()}
            />
            <TextInput
              placeholder="비밀번호을 입력해주세요"
              placeholderTextColor="#f0f0f0"
              style={LoginStyle.login_input_text}
              value={pw}
              onChangeText={(textEntry) => setPw(textEntry)}
              onSubmitEditing={() => login()}
              secureTextEntry
            />
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
      </ImageBackground>
    </View >
  );
}

const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  //로고, 캠퍼스택시 container
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  //로그인 body container
  body: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  login_input_container: {
    width: "60%",
    marginBottom: 10,
  },
  login_input_text: {
    fontSize: 18,
    margin: 0,
    borderColor: "#a9a9a9",
    borderBottomWidth: 2,
    marginBottom: 20,
    paddingBottom: 10,
    textAlign: "center",
    color: "#ffffff",
  },
  button_container: {
    flex: 1,
    width: "60%",
    justifyContent: "flex-start",
    alignItems: "center",
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
