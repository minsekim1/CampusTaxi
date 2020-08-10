import * as React from "react";
import { Component, useState } from "react";
import { Button, View, Text, TouchableOpacity, TextInput } from "react-native";
import { bbsStore, userStore } from "store";

export default class FindPw1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>비밀번호를 찾고자하는 아이디를 입력해 주세요.</Text>
        {/*  준상님 짜주세용 :  */}
        <Button
          title="아이디 찾기"
          onPress={() => navigation.navigate("아이디 찾기")}
        />
        <Button
          title="확인"
          onPress={() => navigation.navigate("비밀번호 찾기 인증 선택")}
        />
      </View>
    );
  }
}

export class FindPw2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>비밀번호를 찾는 방법을 선택해 주세요.</Text>
        {/*  준상님 짜주세용 :  */}
        <Button
          title=" 휴대전화로 인증"
          onPress={() => navigation.navigate("비밀번호 찾기 인증")}
        />
      </View>
    );
  }
}

export class FindPw3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text> 휴대전화로 인증</Text>
        {/*  준상님 짜주세용*/}
        <Button
          title="확인"
          onPress={() => navigation.navigate("비밀번호 재설정")}
        />
      </View>
    );
  }
}

export class FindPw4 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>새로 사용할 비밀번호를 입력해 주세요.</Text>
        {/*  준상님 짜주세용 : */}
        <Button
          title="확인"
          onPress={() => navigation.navigate("비밀번호 재설정 완료")}
        />
      </View>
    );
  }
}

export class FindPw5 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>비밀번호 재설정이 완료 됐습니다.</Text>
        {/*  준상님 짜주세용 :  */}
        <Button
          title="로그인 하러 가기"
          onPress={() => navigation.navigate("로그인")}
        />
      </View>
    );
  }
}
