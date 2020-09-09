import * as React from "react";
import { Component, useState } from "react";
import { 
  Button, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  StyleSheet,
} from "react-native";
import { bbsStore, userStore } from "store";


export default class FindId1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex: 1, width: "80%", alignSelf: "center",}}>
        <View style={{flex: 1, justifyContent: "flex-start", alignItems: "center", marginTop: 20,}}>
        <Text style={{fontSize: 18, fontWeight: "bold"}}>아이디 찾는 방법을 선택해 주세요.</Text>
        </View>

        <View style={[find_style.phoneauth_select_container, {flex: 7,}]}>
          <View style={{ borderBottomColor: "#E5E5E8", borderBottomWidth: 1, paddingBottom: 10,}}>
          <TouchableOpacity
            onPress={() => navigation.navigate("아이디 찾기 인증")}
          >
            <View style={{flexDirection: "row"}}>
              <Text style={{flex: 1,}}> 휴대전화로 인증 </Text>
              <Text style={{flex: 1, textAlign: "right"}}> > </Text>
            </View>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { Picker } from "@react-native-community/picker";
import { CheckBox } from "react-native";
const firebase = require("firebase");
export class FindId2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      countryNum: "+82",
      phoneNumber: "",
      verificationId: "",
      authNum: "",
      authCheck: false,
    };
  }
  //#region Firebase Phone Auth Functions
  sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(this.state.phoneNumber, this.recaptchaVerifier.current)
      .then((result) =>
        this.setState({
          verificationId: result,
        })
      );
  };
  confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      this.state.verificationId,
      this.state.authNum
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        // 인증완료 작업
        //alert(JSON.stringify(result));
        this.setState({
          authCheck: true,
        });
      });
  };
  //#endregion
  render() {
    const { navigation } = this.props;
    return (
    <View style={{flex: 1, width: "80%", alignSelf: "center", position: "absolute",}}>
        <View style={[find_style.phoneauth_select_container, {flex: 1, marginBottom: 30,}]}>
          <View style={{flex: 1, justifyContent: "flex-start", alignItems: "center",}}>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>아이디 찾는 방법을 선택해 주세요.</Text>
          </View>
          <View style={{ borderBottomColor: "#E5E5E8", borderBottomWidth: 1, paddingBottom: 10, flexDirection: "row", justifyContent:"center", alignItems: "center", }}>
            <CheckBox disabled={true} value={this.state.authCheck} />
            <Text>휴대전화로 인증</Text>
          </View>
        </View>

      <View style={{flex: 7,}}>
        <View style={{marginBottom: 20,}}>
          <TextInput
            value={this.state.name}
            onChangeText={(val) => this.setState({ name: val })}
            keyboardType="text"
            maxLength={20}
            placeholder="이름(본명)"
            style={find_style.input_text}
          />
        </View>

        <View style={{flexDirection: "row", marginBottom: 20,}}>
          <View style={{flex: 1, marginRight: 15,}}>
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
          </View>
          <View style={{flex: 2,}}>
            <TextInput
              value={this.state.phoneNumber}
              onChangeText={(val) => this.setState({ phoneNumber: val })}
              keyboardType="phone-pad"
              maxLength={14}
              placeholder="휴대폰 번호"
              autoCompleteType="tel"
              style={find_style.input_text}
            />
          </View>
        </View>

        <View style={[find_style.confirm_btn, {marginBottom: 50, alignSelf: "center"}]}>
          <TouchableOpacity onPress={this.sendVerification}>
            <Text style={find_style.confirm_text}>인증번호 전송</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginBottom: 20,}}>
          <TextInput
            value={this.state.authNum}
            onChangeText={(val) => this.onChangedauthNum(val)}
            keyboardType="number-pad"
            maxLength={8}
            placeholder="인증번호 입력"
            style={find_style.input_text}
          />
        </View>

        <View style={[find_style.confirm_btn, {marginBottom: 20, alignSelf: "center"}]}>
          <TouchableOpacity onPress={this.confirmCode}>
            <Text style={find_style.confirm_text}>인증번호 확인</Text>
          </TouchableOpacity>
          <FirebaseRecaptchaVerifierModal
            ref={this.recaptchaVerifier}
            firebaseConfig={firebase.app().options}
        />
        </View>

        <View style={{position: "relative", bottom: 0, width: "100%",}}>
          <Button
            title="확인"
            onPress={() => {
              if (this.state.authCheck) {
                navigation.navigate("아이디 찾기 결과", {
                  name: this.state.name,
                  phoneNumber: this.state.countryNum + this.state.phoneNumber,
                });
              } else {
                alert("아직 핸드폰인증이 완료되지 않았습니다.");
              }
            }}
          />
        </View>

      </View>
    </View>
    );
  }
}

export class FindId3 extends Component {
  constructor(props) {
    super(props);
    this.state = { id: "" };
  }

  render() {
    const { navigation } = this.props;
    const name = this.props.route.params.name;
    const phoneNumber = this.props.route.params.phoneNumber;
    const ref = firebase
      .database()
      .ref("user/data")
      .orderByChild("j")
      .equalTo(phoneNumber);
    ref.once("value", (snap) => {
      let result;
      snap.forEach(function (childSnapshot) {
        result = childSnapshot.key;
      });
      this.setState({ id: result });
    });

    //
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>회원님의 아이디는 </Text>
        <Text>{this.state.id}</Text>
        <Text>입니다.</Text>
        <Button
          title="로그인 하러 가기"
          onPress={() => navigation.navigate("로그인")}
        />
        <Button
          title="비밀번호찾기"
          onPress={() => navigation.navigate("비밀번호 찾기")}
        />
      </View>
    );
  }
}



<<<<<<< HEAD

=======
>>>>>>> d10feda78c13c34183f2a9a7e49d6b255ccf39bc
const find_style = StyleSheet.create({
  phoneauth_select_container: {
    marginTop: 20,
    width: "100%",
    alignSelf: "center",
  },
  confirm_btn: {
    borderRadius: 19,
    backgroundColor: "#172864",
    justifyContent: "center",
    height: 35,
    width: 190,
  },
  confirm_text: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
  input_text: {
    borderWidth: 1,
    borderColor: "#95959589",
    borderRadius: 8,
    height: 30,
    fontSize: 15,
    padding: 5,
  }
})