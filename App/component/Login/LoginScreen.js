import * as React from "react";
import { Component, useState } from "react";
import { Button, View, Text, TouchableOpacity, TextInput } from "react-native";
import { bbsStore, userStore } from "store";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { clientName: "", clientPassword: "" };
  }
  render() {
    const { navigation } = this.props;
    function login(id, pw) {
      userStore.login(id, pw).then((result) => {
        if (result) navigation.navigate("home");
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
          value={this.state.clientName}
          onChangeText={(textEntry) => this.setState({ clientName: textEntry })}
          onSubmitEditing={() =>
            login(this.state.clientName, this.state.clientPassword)
          }
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
          value={this.state.clientPassword}
          onChangeText={(textEntry) =>
            this.setState({ clientPassword: textEntry })
          }
          onSubmitEditing={() =>
            login(this.state.clientName, this.state.clientPassword)
          }
        />
        <Button
          title="로그인하기"
          onPress={() =>
            login(this.state.clientName, this.state.clientPassword)
          }
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
