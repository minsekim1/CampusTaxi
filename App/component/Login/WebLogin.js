import React, { Component } from "react";
import { View, Text, Platform, StyleSheet, Button } from "react-native";
import WebView from "react-native-webview";
import { bbsStore, userStore } from "store";
export default class WebLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: this.props.route.params.uri,
    };
  }
  webViewEnd = async (event, props) => {
    const result = JSON.parse(event.nativeEvent.data);
    if (result.status === "success") {
      // 성공적 네이버 로그인 완료
      //alert(`token: ${result.token}`)
      //props.route.params.login(result.token);
      //유저가없을 경우 회원가입페이지로 감
      userStore.getUser(result.token).then((isUser) => {
        if (isUser == null) {
          alert("회원가입으로 넘어갑니다.");
          this.props.navigation.navigate("이용동의", {
            token: result.token,
          });
        } else {
          userStore
            .loginToken(result.token)
            .then(() => this.props.navigation.navigate("home"));
        }
      });
    } else {
      props.route.params.loginFail();
    }
  };

  render() {
    const props = this.props;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <WebView
          ref={(ref) => (this.webview = ref)}
          source={{ uri: this.state.url }}
          useWebKit={true}
          onMessage={(event) => this.webViewEnd(event, props)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
