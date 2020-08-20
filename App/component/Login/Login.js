import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  Alert, 
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
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
      <ImageBackground 
        source={require("../../../assets/background.png")}
        style={styles.background}
      >
        {/* header */}
        <View style={styles.header}>
          <Image style={styles.logo} source={require("../../image/logo.png")}/>
            <View style={{marginTop:10,}}>
            <Text style={{color: "#ffffff", fontSize: 18}}>CAMPUS TAXI</Text>
            </View>
        </View>

        {/* 소셜 로그인 */}
        <View style={styles.body}>
          <View style={[styles.buttonContainer, styles.naver_btn]}>
            <TouchableOpacity
              onPress={this.naverLogin}
              disabled={this.state.isWeb}
              style={{height: "100%",}}
            >
            <View style={styles.btn_content_container}>
              <View style={styles.content_icon}>
              <Image
                style={{width: 25, height: 25,}}
                source={require("../../../assets/icon_naver.png")}
              />
              </View>
              <View style={styles.content_text}>
              <Text style={{color: "#ffffff", fontSize: 18, textAlign: "center"}}> 
                  { this.state.isWeb
                    ? "웹은 SNS를 지원하지 않습니다. 일반 로그인을 사용해주세요."
                    : "네이버 로그인" } </Text>
              </View>
            </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.buttonContainer, styles.kakao_btn]}>
            <TouchableOpacity
              onPress={this.kakaoLogin}
              disabled={this.state.isWeb}
              style={{height: "100%",}}
            >
              <View style={styles.btn_content_container}>
                <View style={styles.content_icon}>
                <Image
                  style={{width: 25, height: 25,}}
                  source={require("../../../assets/icon_kakao.png")}
                />
                </View>
                <View style={styles.content_text}>
                <Text style={{fontSize: 18, textAlign: "center"}}> 
                    { this.state.isWeb
                      ? "웹은 SNS를 지원하지 않습니다. 일반 로그인을 사용해주세요."
                      : "카카오톡 로그인" } </Text>
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
              disabled={this.state.isWeb}
              style={{height: "100%",}}
            >
              <View style={styles.btn_content_container}>
                <View style={styles.content_icon}>
                <Image
                  style={{width: 25, height: 25,}}
                  source={require("../../../assets/icon_google.png")}
                />
                </View>
                <View style={styles.content_text}>
                <Text style={{color: "#ffffff", fontSize: 18, textAlign: "center"}}> 
                    { this.state.isWeb
                      ? "웹은 SNS를 지원하지 않습니다. 일반 로그인을 사용해주세요."
                      : "구글 로그인" } </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.buttonContainer, styles.facebook_btn]}>
            <TouchableOpacity
              onPress={this.fbLogIn}
              disabled={this.state.isWeb}
              style={{height: "100%"}}
            >
              <View style={styles.btn_content_container}>
                <View style={styles.content_icon}>
                <Image
                  style={{width: 25, height: 25,}}
                  source={require("../../../assets/icon_facebook.png")}
                />
                </View>
                <View style={styles.content_text}>
                <Text style={{color: "#ffffff", fontSize: 18, textAlign: "center"}}> 
                    { this.state.isWeb
                      ? "웹은 SNS를 지원하지 않습니다. 일반 로그인을 사용해주세요."
                      : "페이스북 로그인" } </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.buttonContainer, styles.normal_btn]}>
            <TouchableOpacity
              onPress={() => navigation.navigate("로그인")}
            >
              <Text style={{textAlign: "center", color: "#ffffff", fontSize: 18, fontWeight:"bold",}}> 
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
    width: 91,
    height: 82,
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
  normal_btn: {

  },

  //버튼 안 내용 (아이콘, 텍스트)
  btn_content_container: {
    flex:1,
    flexDirection: "row",
    height: "100%",
  },
  content_icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  content_text: {
    flex: 6, 
    alignSelf:"center", 
    justifyContent:"center"
  },
});
