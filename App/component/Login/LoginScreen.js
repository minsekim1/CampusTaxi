import * as React from "react";
import { Component, useState } from "react";
import { Button, View, Text, TouchableOpacity, TextInput } from "react-native";
import { bbsStore, userStore } from "store";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { id: "", pw: "" };
  }
  render() {
    const { navigation } = this.props;
    function login(id, pw) {
      userStore.login(id, pw).then((result) => {
        if (result) {
          navigation.navigate("home");
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
          value={this.state.id}
          onChangeText={(textEntry) => this.setState({ id: textEntry })}
          onSubmitEditing={() => login(this.state.id, this.state.pw)}
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
          value={this.state.pw}
          onChangeText={(textEntry) => this.setState({ pw: textEntry })}
          onSubmitEditing={() => login(this.state.id, this.state.pw)}
        />
        <Button
          title="로그인하기"
          onPress={() => login(this.state.id, this.state.pw)}
        />
        <Button
          title="아이디찾기"
          onPress={() => navigation.navigate("아이디 찾기")}
        />
        <Button
          title="비밀번호 찾기"
          onPress={() => navigation.navigate("비밀번호 찾기")}
        />
        <Button
          title="회원가입"
          onPress={() => navigation.navigate("이용동의")}
        />
      </View>
    );
  }
}
