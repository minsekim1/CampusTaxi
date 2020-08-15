import * as React from "react";
import { Component, useState } from "react";
import { Button, View, Text, TouchableOpacity, TextInput } from "react-native";
import { bbsStore, userStore } from "store";

export default class FindPw1 extends Component {
  constructor(props) {
    super(props);
    this.state = { id: "" };
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>비밀번호를 찾고자하는 아이디를 입력해 주세요.</Text>
        <TextInput
          value={this.state.id}
          onChangeText={(val) => this.setState({ id: val })}
          maxLength={20}
          placeholder="아이디 입력하기"
        />
        <Text>아이디가 기억나지 않는다면?</Text>
        <Button
          title="아이디 찾기"
          onPress={() => navigation.navigate("아이디 찾기")}
        />
        <Button
          title="다음으로"
          onPress={() => {
            if (this.state.id != "") {
              navigation.navigate("비밀번호 찾기 인증 선택", {
                id: this.state.id,
              });
            } else {
              alert("아이디를 입력해주세요.");
            }
          }}
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
        <Button
          title=" 휴대전화로 인증"
          onPress={() =>
            navigation.navigate("비밀번호 찾기 인증", {
              id: this.props.route.params.id,
            })
          }
        />
        <Text>
          회원정보에 등록한 휴대전화 번호와 입력한 휴대전화 번호가 같아야,
          인증번호를 받을 수 있습니다.
        </Text>
      </View>
    );
  }
}
import { Picker } from "@react-native-community/picker";
const firebase = require("firebase");
export class FindPw3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phoneNumber: "",
      countryNum: "+82",
      id: this.props.route.params.id,
    };
  }
  onChangedPhoneNumber(text) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert("숫자만 입력해주세요.");
      }
    }
    this.setState({ phoneNumber: newText });
  }
  checkUser(id, name, phoneNumber, navigation) {
    const ref = firebase.database().ref("user/data/" + id);
    ref.once("value", (snap) => {
      let result = JSON.parse(JSON.stringify(snap.val()));
      if (result.h == name && result.j == phoneNumber) {
        navigation.navigate("비밀번호 재설정", { id: id });
      } else {
        alert("없는 아이디이거나 다른 이름(본명)이거나 전화번호가 틀립니다.");
      }
      // this.setState({ phoneNumber: result });
    });
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text> 휴대전화로 인증</Text>
        <Text>사용자 아이디</Text>
        <Text>{this.state.id}</Text>
        <TextInput
          value={this.state.name}
          onChangeText={(val) => this.setState({ name: val })}
          maxLength={40}
          placeholder="이름(본명)"
        />
        <Picker
          selectedValue={this.state.countryNum}
          style={{ height: 30, width: 130 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ countryNum: itemValue })
          }
          // https://ko.wikipedia.org/wiki/국제전화_나라_번호
        >
          <Picker.Item label="대한민국(+82)" value="+82" />
          <Picker.Item label="북한(+850)" value="+850" />
          <Picker.Item label="인도네시아(+62)" value="+850" />
        </Picker>
        <TextInput
          value={this.state.phoneNumber}
          onChangeText={(val) => this.onChangedPhoneNumber(val)}
          keyboardType="number-pad"
          maxLength={14}
          placeholder="01012341234"
          autoCompleteType="tel"
        />
        <Button
          title="확인"
          onPress={() =>
            this.checkUser(
              this.state.id,
              this.state.name,
              this.state.countryNum + this.state.phoneNumber,
              navigation
            )
          }
        />
      </View>
    );
  }
}

export class FindPw4 extends Component {
  constructor(props) {
    super(props);
    this.state = { newPw: "", newPwCheck: "", id: this.props.route.params.id };
  }
  onChangednewPw(text) {
    let newText = "";
    let numbers =
      "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*()";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert("영어, 숫자, 특수문자 !@#$%^&*()만 입력해주세요.");
      }
    }
    this.setState({ newPw: newText });
  }
  onChangednewPwCheck(text) {
    let newText = "";
    let numbers =
      "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*()";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert("영어, 숫자, 특수문자 !@#$%^&*()만 입력해주세요.");
      }
    }
    this.setState({ newPwCheck: newText });
  }

  async pwChange(id, pw, pwCheck, navigation) {
    if (pw.length > 5 && pwCheck.length > 5) {
      if (pw == pwCheck) {
        const ref = firebase.database().ref("user/data/" + id + "/g");
        await ref.set(pw);
        navigation.navigate("비밀번호 재설정 완료");
      } else {
        alert("새로운 비밀번호가 서로 다릅니다.");
      }
    } else {
      alert("비밀번호는 최소 5자리 이상이어야합니다.");
    }
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>새로 사용할 비밀번호를 입력해 주세요.</Text>
        <Text>영문, 숫자, 특수문자를 섞어 사용하면 더욱 안전합니다.</Text>
        <TextInput
          value={this.state.newPw}
          onChangeText={(val) => this.onChangednewPw(val)}
          maxLength={20}
          placeholder="비밀번호"
        />
        <TextInput
          value={this.state.newPwCheck}
          onChangeText={(val) => this.onChangednewPwCheck(val)}
          maxLength={20}
          placeholder="비밀번호확인"
        />
        <Button
          title="비밀번호 재설정하기"
          onPress={() =>
            this.pwChange(
              this.state.id,
              this.state.newPw,
              this.state.newPwCheck,
              navigation
            )
          }
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
        <Button
          title="로그인 하러 가기"
          onPress={() => navigation.navigate("로그인")}
        />
      </View>
    );
  }
}
