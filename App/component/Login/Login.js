import React from "react";
import {
  StyleSheet,
  View,
  Button,
  Alert,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as GoogleSignIn from "expo-google-sign-in";
import * as Facebook from "expo-facebook";
import Svg, {
  G,
  Ellipse,
  Path,
  TSpan,
  LinearGradient,
  Stop,
} from "react-native-svg";
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
        <ImageBackground
          source={require("../../../assets/background.png")}
          style={styles.background}
        >
          {/* header */}
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={require("../../image/logo.png")}
            />
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: "#ffffff", fontSize: 18 }}>
                CAMPUS TAXI
              </Text>
            </View>
          </View>

          {/* 소셜 로그인 */}
          <View style={styles.body}>
            <View style={[styles.buttonContainer, styles.kakao_btn]}>
              <TouchableOpacity
                onPress={this.kakaoLogin}
                disabled={this.state.isWeb}
                style={{ height: "100%" }}
              >
                <View style={styles.btn_content_container}>
                  <View style={styles.content_icon}>
                    <Svg width={23} height={24.381} viewBox="0 0 23 24.381">
                      <G fill="#3c1e1e">
                        <G stroke="#3c1e1e">
                          <Ellipse
                            cx={11.5}
                            cy={9.5}
                            rx={11.5}
                            ry={9.5}
                            stroke="none"
                          />
                          <Ellipse
                            cx={11.5}
                            cy={9.5}
                            rx={11}
                            ry={9}
                            fill="none"
                          />
                        </G>
                        <Path d="M5 13.704l6.182 3.864-6.525 3.563L5 13.704z" />
                        <Path d="M5.197 20.266l4.995-2.727L5.46 14.58l-.263 5.685m-1.081 1.73l.424-9.169 7.632 4.77-8.056 4.399z" />
                      </G>
                    </Svg>
                  </View>
                  <View style={styles.content_text}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {this.state.isWeb
                        ? "웹은 SNS를 지원하지 않습니다. 일반 로그인을 사용해주세요."
                        : "카카오톡 로그인"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.buttonContainer, styles.naver_btn]}>
              <TouchableOpacity
                onPress={this.naverLogin}
                disabled={this.state.isWeb || this.state.devING}
                style={{ height: "100%" }}
              >
                <View style={styles.btn_content_container}>
                  <View style={styles.content_icon}>
                    <Svg width={20} height={21.493} viewBox="0 0 20 21.493">
                      <G data-name="\uADF8\uB8F9 112" fill="#fff">
                        <G data-name="\uC0AC\uAC01\uD615 1751" stroke="#fff">
                          <Path stroke="none" d="M0 1.301h7v19H0z" />
                          <Path fill="none" d="M.5 1.801h6v18h-6z" />
                        </G>
                        <G data-name="\uC0AC\uAC01\uD615 1752" stroke="#fff">
                          <Path stroke="none" d="M13 1.301h7v19h-7z" />
                          <Path fill="none" d="M13.5 1.801h6v18h-6z" />
                        </G>
                        <G data-name="\uB2E4\uAC01\uD615 14">
                          <Path d="M6.612 11.816l.618-9.3 5.966 7.161-.618 9.3-5.966-7.16z" />
                          <Path d="M12.684 9.843L7.646 3.797l-.522 7.853 5.038 6.046.522-7.853m1.024-.332l-.714 10.746L6.1 11.983l.714-10.747 6.894 8.275z" />
                        </G>
                      </G>
                    </Svg>
                  </View>
                  <View style={styles.content_text}>
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {this.state.isWeb
                        ? "웹은 SNS를 지원하지 않습니다. 일반 로그인을 사용해주세요."
                        : "개발중"}
                      {/* 네이버 로그인 */}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.buttonContainer, styles.google_btn]}>
              <TouchableOpacity
                onPress={() => {
                  if (this.state.googleUser) {
                    this.googleSignOutAsync();
                  } else {
                    this.googleSignInAsync();
                  }
                }}
                disabled={this.state.isWeb || this.state.devING}
                style={{ height: "100%" }}
              >
                <View style={styles.btn_content_container}>
                  <View style={styles.content_icon}>
                    <Svg width="25pt" height="23pt" viewBox="0 0 25 23">
                      <Path
                        d="M22.7 0H2.3C1.032 0 0 .3 0 1.816v19.672C0 22.656 1.031 23 2.3 23h20.4c1.269 0 2.3-.344 2.3-1.512V1.816C25 .301 23.969 0 22.7 0zm0 0"
                        fill="#cc3731"
                      />
                      <Path
                        d="M16.816 1.664h1.786v4.238h4.18V7.68h-4.18v4.273h-1.786V7.68h-4.168V5.902h4.168zm0 0"
                        fill="#fff"
                      />
                      <Path
                        d="M9.613 16.207L8.43 15.27c-.364-.301-.856-.704-.856-1.442 0-.734.492-1.21.922-1.644 1.379-1.102 2.664-2.278 2.664-4.758a5.416 5.416 0 00-2.008-4.25h2.012l1.848-1.512H6.066c-1.722.031-3.78.297-5.652 1.871-.09.078-.184.168-.266.246v8.172a5.554 5.554 0 003.618 1.34c.328 0 .687-.035 1.05-.066a3.044 3.044 0 00-.328 1.308c0 1.04.524 1.672.985 2.277-1.254.086-3.836-.128-5.325 1.083v1.93c.68-.942 1.762-1.36 2.239-1.536a12.911 12.911 0 013.449-.535c.25-.008.504.004.754.035 2.5 1.813 4.289 2.742 4.305 4.457 0 .207-.047.414-.137.606h1.926a4.233 4.233 0 00.261-1.649c0-2.316-1.886-3.75-3.332-4.996zm-4.191-4.254c-2.828 0-3.988-3.32-3.988-5.566 0-.875.086-1.778.644-2.485a3.057 3.057 0 012.3-1.105c2.727 0 4.102 3.754 4.102 6.172a3.686 3.686 0 01-.855 2.148c-.543.625-1.383.836-2.203.836zm0 0"
                        fill="#fff"
                      />
                    </Svg>
                  </View>
                  <View style={styles.content_text}>
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {this.state.isWeb
                        ? "웹은 SNS를 지원하지 않습니다. 일반 로그인을 사용해주세요."
                        : "개발중"}
                      {/* 구글 로그인 */}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={[styles.buttonContainer, styles.facebook_btn]}>
              <TouchableOpacity
                onPress={this.fbLogIn}
                disabled={this.state.isWeb || this.state.devING}
                style={{ height: "100%" }}
              >
                <View style={styles.btn_content_container}>
                  <View style={styles.content_icon}>
                    <Svg
                      width={13.573}
                      height={25.93}
                      viewBox="0 0 13.573 25.93"
                    >
                      <Path
                        d="M13.073.887s-3.38-.775-5.425 0-2.583 1.808-2.756 3.1 0 6.028 0 6.028H.5v4.134h4.392V25.43h4.736V14.149h3.445v-4.134H9.628V6.226s.258-1.464 1.12-1.378a19.344 19.344 0 002.325 0z"
                        fill="#fff"
                        stroke="#fff"
                      />
                    </Svg>
                  </View>
                  <View style={styles.content_text}>
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {this.state.isWeb
                        ? "웹은 SNS를 지원하지 않습니다. 일반 로그인을 사용해주세요."
                        : "개발중"}
                      {/* 페이스북 로그인 */}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.buttonContainer,
                styles.normal_btn,
                { alignItems: "center", justifyContent: "center" },
              ]}
            >
              <TouchableOpacity onPress={() => navigation.navigate("로그인")}>
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  일반 로그인 및 회원가입
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <StatusBar style="auto" />
        </ImageBackground>
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
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        console.log(JSON.stringify(response));
        // userStore.getUser(token).then((isUser) => {
        //   if (isUser == null) {
        //     alert("회원가입으로 넘어갑니다.");
        //     this.props.navigation.navigate("이용동의", {
        //       token: token,
        //     });
        //   } else {
        //     userStore
        //       .loginToken(token)
        //       .then(() => this.props.navigation.navigate("home"));
        //   }
        // });
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
      api: "naver",
      login: this.loginSuccess,
      loginFail: this.loginFailed,
    });
  };

  kakaoLogin = () => {
    this.props.navigation.push("WebLogin", {
      uri: kakao_login_uri,
      api: "kakao",
      login: this.loginSuccess,
      loginFail: this.loginFailed,
    });
  };
}

///////// 스타일 ///////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    width: "60%",
    maxWidth: 400,
    marginBottom: 30,
    height: 50,
  },
  logo: {
    width: 92,
    height: 83,
  },
  background: {
    width: "100%",
    height: "100%",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  //각 소셜 로그인 버튼 styles
  naver_btn: {
    backgroundColor: "#1EC700",
    borderRadius: 30,
  },
  kakao_btn: {
    backgroundColor: "#FDEC00",
    borderRadius: 30,
  },
  google_btn: {
    backgroundColor: "#CC3731",
    borderRadius: 30,
  },
  facebook_btn: {
    backgroundColor: "#3B5999",
    borderRadius: 30,
  },
  normal_btn: {},

  //버튼 안 내용 (아이콘, 텍스트)
  btn_content_container: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
  },
  content_icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 23,
  },
  content_text: {
    flex: 6,
    marginLeft: 40,
    alignSelf: "center",
    justifyContent: "center",
  },
});
