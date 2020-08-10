import * as React from "react";
import { Component, useState } from "react";
import { Button, View, Text, TouchableOpacity, TextInput } from "react-native";
import { bbsStore, userStore } from "store";

export class Sign1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>이용동의</Text>
        {/* 준상님 짜주세용 */}
        <Button title="다음" onPress={() => navigation.navigate("회원 가입")} />
      </View>
    );
  }
}

export class Sign2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>회원 가입</Text>
        {/* 준상님 짜주세용 */}
        <Button
          title="가입 하기"
          onPress={() => navigation.navigate("회원 가입 완료")}
        />
      </View>
    );
  }
}

export class Sign3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>회원 가입 완료</Text>
        {/* 준상님 짜주세용 */}
        <Button title="로 그 인" onPress={() => navigation.navigate("home")} />
      </View>
    );
  }
}
