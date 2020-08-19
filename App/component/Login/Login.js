import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as GoogleSignIn from "expo-google-sign-in";
import * as Facebook from "expo-facebook";

const facebook_app_id = "350528495956316";

const login_base_url = "http://campustaxi-b0e6c.web.app"; // 'http://192.168.2.112:3500' //
const naver_login_uri = login_base_url + "/api/naver/login";
const kakao_login_uri = login_base_url + "/api/kakao/login";

import * as Device from "expo-device";
import { bbsStore, userStore } from "store";
export default class Login extends React.Component {
  state = { googleUser: null, isWeb: false };

  componentDidMount() {
    // "Windows", "Android" etc
    if (Device.brand == null) {
      //true면 웹
      this.setState({ isWeb: true });
    } else {
      //모바일만 SNS로그인 활성화
      this.initAsync();
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>CAMPUS TAXI</Text>

        <View style={styles.buttonContainer}>
          <Button
            title={
              this.state.isWeb
                ? "웹은 SNS를 지원하지 않습니다. 일반 로그인을 사용해주세요."
                : "네이버 로그인"
            }
            onPress={this.naverLogin}
            disabled={this.state.isWeb}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={
              this.state.isWeb
                ? "웹은 SNS를 지원하지 않습니다. 일반 로그인을 사용해주세요."
                : "카카오톡 로그인"
            }
            onPress={this.kakaoLogin}
            disabled={this.state.isWeb}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={
              this.state.isWeb
                ? "웹은 SNS를 지원하지 않습니다. 일반 로그인을 사용해주세요."
                : "구글 로그인"
            }
            onPress={() => {
              if (this.state.googleUser) {
                this.googleSignOutAsync();
              } else {
                this.googleSignInAsync();
              }
            }}
            disabled={this.state.isWeb}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={
              this.state.isWeb
                ? "웹은 SNS를 지원하지 않습니다. 일반 로그인을 사용해주세요."
                : "페이스북 로그인"
            }
            onPress={this.fbLogIn}
            disabled={this.state.isWeb}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="일반 로그인 및 회원가입"
            onPress={() => navigation.navigate("로그인")}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    );
    moveToLoginScreen = () => {
      navigation.navigate("로그인");
    };
  }

  initAsync = async () => {
    await GoogleSignIn.initAsync();
    this._syncUserWithStateAsync();
  };

  _syncUserWithStateAsync = async () => {
    const googleUser = await GoogleSignIn.signInSilentlyAsync();
    this.setState({ googleUser });
  };

  googleSignOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    this.setState({ googleUser: null });
  };

  googleSignInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();

      if (type === "success") {
        //alert(`token: ${user.auth.accessToken}`);
        this._syncUserWithStateAsync();
        userStore.getUser(user.auth.accessToken).then((isUser) => {
          if (isUser == null) {
            alert("회원가입으로 넘어갑니다.");
            this.props.navigation.navigate("이용동의", {
              token: user.auth.accessToken,
            });
          } else {
            userStore
              .loginToken(user.auth.accessToken)
              .then(() => this.props.navigation.navigate("home"));
          }
        });
      }
    } catch ({ message }) {
      alert("Login Error: " + message);
    }
  };

  fbLogIn = async () => {
    try {
      await Facebook.initializeAsync(facebook_app_id);

      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });

      if (type === "success") {
        console.log(`facebook token: ${token}`);
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        //alert("Logged in!", `Hi ${(await response.json()).name}!`);
        userStore.getUser(token).then((isUser) => {
          if (isUser == null) {
            alert("회원가입으로 넘어갑니다.");
            this.props.navigation.navigate("이용동의", {
              token: token,
            });
          } else {
            userStore
              .loginToken(token)
              .then(() => this.props.navigation.navigate("home"));
          }
        });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  loginSuccess = (token) => {
    console.log(token);
  };

  loginFailed = () => {};

  naverLogin = () => {
    this.props.navigation.push("WebLogin", {
      uri: naver_login_uri,
      login: this.loginSuccess,
      loginFail: this.loginFailed,
    });
  };

  kakaoLogin = () => {
    this.props.navigation.push("WebLogin", {
      uri: kakao_login_uri,
      login: this.loginSuccess,
      loginFail: this.loginFailed,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonContainer: {
    width: "60%",
    maxWidth: 400,
    marginVertical: 10,
  },
});
