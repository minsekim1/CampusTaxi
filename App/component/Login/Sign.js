import * as React from "react";
import { Component, useState } from "react";
import { Button, View, Text, TouchableOpacity, TextInput } from "react-native";
import { bbsStore, userStore } from "store";
import { CheckBox } from "react-native";

export default class Sign1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: [true, true, true, true, true, true, true, true],
    };
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>이용동의</Text>
        {/* 준상님 짜주세용 */}

        <CheckBox
          disabled={false}
          value={this.state.check[0]}
          onValueChange={() => {
            const checkReturn = this.state.check;
            checkReturn.map((i) => (chckReturn[i] = !checkReturn[i]));
          }}
        />
        <Text>캠퍼스 택시의 모든 운영원칙에 동의</Text>
        <Text>서비스 이용약관 (필수)</Text>
        <CheckBox
          disabled={false}
          value={this.state.check[1]}
          onValueChange={() => {
            const checkReturn = this.state.check;
            checkReturn[1] = !checkReturn[1];
            this.setState({
              check: checkReturn,
            });
          }}
        />
        <Text>개인정보 처리방침 (필수)</Text>
        <CheckBox
          disabled={false}
          value={this.state.check[2]}
          onValueChange={() =>
            this.setState({
              check: [false, false, false, false, false, false, false, false],
            })
          }
        />
        <Text>마케팅 정보 수신 (선택)</Text>

        <CheckBox
          disabled={false}
          value={this.state.check[3]}
          onValueChange={() =>
            this.setState({
              check: [false, false, false, false, false, false, false, false],
            })
          }
        />
        <Text>앱 Push</Text>
        <CheckBox
          disabled={false}
          value={this.state.check[4]}
          onValueChange={() =>
            this.setState({
              check: [false, false, false, false, false, false, false, false],
            })
          }
        />
        <Text>SMS</Text>
        <CheckBox
          disabled={false}
          value={this.state.check[5]}
          onValueChange={() =>
            this.setState({
              check: [false, false, false, false, false, false, false, false],
            })
          }
        />
        <Text>이메일</Text>

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
        {/* 승우님 짜주세용 : 학생증 사진 선택하면 사진 보이구, 가입하기 누르면 스토어에 올라가게 해주세요!*/}
        <Button title="학생증 사진 선택" onPress={() => {}} />
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
