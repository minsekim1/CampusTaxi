import * as React from "react";
import { Component, useState } from "react";
import { Button, View, Text, TouchableOpacity, TextInput } from "react-native";
import { bbsStore, userStore } from "store";

export default class FindId1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>아이디 찾는 방법을 선택해 주세요.</Text>
        {/* 선택하면 FindId2로 이동시키면 될듯 */}
        <Button
          title="휴대전화로 인증"
          onPress={() => navigation.navigate("아이디 찾기 인증")}
        />
      </View>
    );
  }
}

export class FindId2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>아이디 찾는 방법을 선택해 주세요.</Text>
        {/*  준상님 짜주세용 :  */}
        <Button
          title="확인"
          onPress={() => navigation.navigate("아이디 찾기 결과")}
        />
      </View>
    );
  }
}

export class FindId3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>회원님의 아이디는 </Text>
        <Text>asd </Text>
        <Text>입니다.</Text>
        {/*  준상님 짜주세용 : 결과 화면입니다~ */}
        <Button
          title="돌아가기"
          onPress={() => navigation.navigate("로그인")}
        />
      </View>
    );
  }
}
