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
    function next(state) {
      if (state[1] && state[2] && state[3]) {
        navigation.navigate("회원 가입", { state: state });
      } else {
        alert("필수 동의 부분이 빠져있습니다.");
      }
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>이용동의</Text>
        <CheckBox
          disabled={false}
          value={this.state.check[0]}
          onValueChange={() => {
            let checkReturn = this.state.check;
            checkReturn[0] = !checkReturn[0];
            checkReturn = [
              checkReturn[0],
              checkReturn[0],
              checkReturn[0],
              checkReturn[0],
              checkReturn[0],
              checkReturn[0],
              checkReturn[0],
              checkReturn[0],
            ];
            this.setState({
              check: checkReturn,
            });
          }}
        />
        <Text>캠퍼스 택시의 모든 운영원칙에 동의</Text>
        <CheckBox
          disabled={false}
          value={this.state.check[1]}
          onValueChange={() => {
            let checkReturn = this.state.check;
            checkReturn[1] = !checkReturn[1];
            this.setState({
              check: checkReturn,
            });
          }}
        />
        <Text>서비스 이용약관 (필수)</Text>
        <Button
          title="자세히보기"
          onPress={() => navigation.navigate("서비스 이용약관")}
        />
        <CheckBox
          disabled={false}
          value={this.state.check[2]}
          onValueChange={() => {
            let checkReturn = this.state.check;
            checkReturn[2] = !checkReturn[2];
            this.setState({
              check: checkReturn,
            });
          }}
        />
        <Text>개인정보 처리방침 (필수)</Text>
        <Button
          title="자세히보기"
          onPress={() => navigation.navigate("개인정보처리방침")}
        />

        <CheckBox
          disabled={false}
          value={this.state.check[3]}
          onValueChange={() => {
            let checkReturn = this.state.check;
            checkReturn[3] = !checkReturn[3];
            this.setState({
              check: checkReturn,
            });
          }}
        />
        <Text>위치정보 이용약관(필수)</Text>
        <Button
          title="자세히보기"
          onPress={() => navigation.navigate("위치정보 이용약관")}
        />
        <CheckBox
          disabled={false}
          value={this.state.check[4]}
          onValueChange={() => {
            let checkReturn = this.state.check;
            checkReturn[4] = !checkReturn[4];
            checkReturn = [
              this.state.check[0],
              this.state.check[1],
              this.state.check[2],
              this.state.check[3],
              checkReturn[4],
              checkReturn[4],
              checkReturn[4],
              checkReturn[4],
            ];
            this.setState({
              check: checkReturn,
            });
          }}
        />
        <Text>마케팅 정보 수신 (선택)</Text>
        <Button
          title="자세히보기"
          onPress={() => navigation.navigate("마케팅 정보 수신")}
        />
        <CheckBox
          disabled={false}
          value={this.state.check[5]}
          onValueChange={() => {
            let checkReturn = this.state.check;
            checkReturn[5] = !checkReturn[5];
            this.setState({
              check: checkReturn,
            });
          }}
        />
        <Text>앱 Push</Text>
        <CheckBox
          disabled={false}
          value={this.state.check[6]}
          onValueChange={() => {
            let checkReturn = this.state.check;
            checkReturn[6] = !checkReturn[6];
            this.setState({
              check: checkReturn,
            });
          }}
        />
        <Text>SMS</Text>
        <CheckBox
          disabled={false}
          value={this.state.check[7]}
          onValueChange={() => {
            let checkReturn = this.state.check;
            checkReturn[7] = !checkReturn[7];
            this.setState({
              check: checkReturn,
            });
          }}
        />
        <Text>이메일</Text>
        <Button title="다음" onPress={() => next(this.state.check)} />
      </View>
    );
  }
}

export class Sign2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      phoneNumber: "",
      authBtn: "인증번호 전송하기",
      authCheck: false,
      authNum: "",
      signCheck: false,
      nickname: "",
      id: "",
      pw: "",
      pwCheck: "",
      studentcardCheck: false,
      studentcardBtn: "학생증 사진 선택",
      name: "",
      univ: "",
    };
  }
  render() {
    const { navigation } = this.props;
    const state = this.props.route.params.state; //마케팅 정보 등 동의 사실 전달[true, true...]
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CheckBox
          title="asd"
          disabled={false}
          value={this.state.authCheck}
          onValueChange={() => {
            this.setState({
              authCheck: this.state.authCheck,
            });
          }}
        />
        <Text>{this.state.authCheck ? "휴대폰 인증 완료" : "휴대폰 인증"}</Text>
        <Button
          title="학생증 사진 선택"
          onPress={() => {
            this.setState({
              authCheck: !this.state.authCheck,
            });
          }}
        />
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
        <Text>환영합니다!</Text>
        <Text>
          해당 어플은 삼육대학교 창업동아리 '캠퍼스택시'가 제작하고 운영하는
          어플입니다.
        </Text>
        <Text>현재에는 채팅과 방만들기 기능만을 제공하고 있습니다.</Text>
        <Text>
          N분의 1 계산은 TOSS앱, 택시 호출은 카카오 택시를 이용해 주세요!
        </Text>
        {/* 준상님 짜주세용 */}
        <Button title="로 그 인" onPress={() => navigation.navigate("home")} />
      </View>
    );
  }
}
