import * as React from "react";
import { Component, useState } from "react";
import { Button, View, Text, TouchableOpacity, TextInput } from "react-native";
import { bbsStore, userStore } from "store";

export default class FindPw extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigation } = this.props;
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
          value={this.state.clientPassword}
          onChangeText={(textEntry) =>
            this.setState({ clientPassword: textEntry })
          }
          onSubmitEditing={() => login(name, password)}
        />
        <Button title="로그인하기" onPress={() => login(name, password)} />
      </View>
    );
  }
}
