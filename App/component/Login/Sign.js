import * as React from "react";
import { Component, useState, createRef } from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  CheckBox,
} from "react-native";
import { bbsStore, userStore } from "store";

export default class Sign1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: [true, true, true, true, true, true, true, true],
      token: this.props.route.params.token,
    };
  }
  render() {
    const { navigation } = this.props;

    function next(state, token) {
      if (state[1] && state[2] && state[3]) {
        navigation.navigate("회원 가입", {
          policy: state,
          token: token,
        });
      } else {
        alert("필수 동의 부분이 빠져있습니다.");
      }
    }
    return (
      <View style={Terms.terms_container}>
        {/* 필수 동의 란 */}
        <View style={[Terms.nt_item, { marginBottom: 40 }]}>
          <CheckBox
            style={Terms.term_CheckBox}
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
          <Text style={Terms.nt_item_text}>
            캠퍼스 택시의 모든 운영원칙에 동의
          </Text>
        </View>

        <View style={Terms.nt_item}>
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
          <Text style={Terms.nt_item_text}>서비스 이용약관 (필수)</Text>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("서비스 이용약관")}
            >
              <Text style={Terms.detail}> 자세히보기 </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={Terms.nt_item}>
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
          <Text style={Terms.nt_item_text}>개인정보 처리방침 (필수)</Text>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("개인정보처리방침")}
            >
              <Text style={Terms.detail}> 자세히보기 </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={Terms.nt_item}>
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
          <Text style={Terms.nt_item_text}>위치정보 이용약관(필수)</Text>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("위치정보 이용약관")}
            >
              <Text style={Terms.detail}> 자세히보기 </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 선택 동의 란 */}
        <View style={[Terms.nt_item, { marginBottom: 20 }]}>
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
          <Text style={Terms.nt_item_text}>마케팅 정보 수신 (선택)</Text>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("마케팅 정보 수신")}
            >
              <Text style={Terms.detail}> 자세히보기 </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/*여기서 부터 선택 View*/}
        <View style={Terms.not_necessary_temrs}>
          <View style={Terms.nnt_item}>
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
          </View>

          <View style={Terms.nnt_item}>
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
          </View>

          <View style={Terms.nnt_item}>
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
          </View>

          <Text style={{ fontSize: 12, color: "#a9a9a9" }}>
            * 선택 약관에 동의하지 않아도 회원가입이 가능합니다.
          </Text>
        </View>

        <View style={button_style.next_button}>
          <TouchableOpacity
            style={{ width: "100%" }}
            onPress={() => next(this.state.check, this.state.token)}
          >
            <Text
              style={{ color: "#ffffff", fontSize: 20, textAlign: "center" }}
            >
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

import { Picker } from "@react-native-community/picker";
import * as ImagePicker from "expo-image-picker";
import { storage } from "firebase";
const firebase = require("firebase");
import * as ErrorRecovery from "expo-error-recovery";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
export class Sign2 extends React.Component {
  recaptchaVerifier = createRef();
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      nickname: "",
      countryNum: "+82",
      phoneNumber: "",
      verificationId: "",
      authBtn: "인증번호 전송하기",
      authCheck: false,
      authNum: "",
      signCheck: false,
      nickname: "",
      id: "",
      pw: "",
      pwCheck: "",
      gender: 1,
      email: "",
      address: "",
      studentcardCheck: false,
      studentcardBtn: "학생증 사진 선택",
      name: "",
      univ: "",
      error: "아무런 값이 입력되지 않았습니다.",
      policy: this.props.route.params.policy, //마케팅 정보 등 동의 사실 전달[true, true...]
      token: this.props.route.params.token,
      confirmBtn: false,
    };
  }
  //#region Firebase Phone Auth Functions

  sendVerification = async () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    const verificationId = await phoneProvider
      .verifyPhoneNumber(
        this.state.countryNum + this.state.phoneNumber,
        this.recaptchaVerifier.current
      )
      .then((r) => alert(r));
    this.setState({
      verificationId: verificationId,
    });

    // phoneProvider
    //   .verifyPhoneNumber(
    //     this.state.countryNum + this.state.phoneNumber,
    //     this.recaptchaVerifier.current
    //   )
    //   .then((result) =>
    //     this.setState({
    //       verificationId: result,
    //     })
    //   );
  };
  confirmCode = () => {
    if (!this.state.verificationId) {
      alert("인증번호 전송 버튼을 눌러 인증번호를 발급 받으세요.");
      return;
    }
    if (!this.state.authNum) {
      alert("인증번호를 입력하세요.");
      return;
    }
    const credential = firebase.auth.PhoneAuthProvider.credential(
      this.state.verificationId,
      this.state.authNum
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        userStore
          .findUserByAttributes(
            "j",
            this.state.countryNum + this.state.phoneNumber
          )
          .then((result2) => {
            if (result2 == null) {
              this.setState({
                authCheck: true,
                confirmBtn: true,
              });
              this.SignIn.auth_button;
            } else {
              alert("이미 등록된 번호입니다.");
              this.setState({
                authCheck: false,
                error: "이미 등록된 번호입니다.",
              });
            }
          });
      });
  };
  onimageurlChange = (url) => {
    this.setState({
      image: url,
    });
  };
  onChooseImagePress = async () => {
    var result = await ImagePicker.launchImageLibraryAsync(); // 라이브러리 선택

    if (!result.cancelled) {
      // 이미지 선택했다면 Check true + Error: undefined is not an object 가 발생하지만 무시하고 진행하면 이상하게 잘 됨
      //-> 사진 선택 시 발생하는 에러로 추측됨
      this.onimageurlChange(result.uri);
      try {
        this.checkStudentCard();
      } catch (error) {
        console.log("onChooseImagePress error:" + error); // error
      }
    }
  };
  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child(this.state.id + "/" + imageName); // child() 경로 지정.
    return ref.put(blob);
  };
  //#endregion
  //#region Input Function
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
  onChangedauthNum(text) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert("숫자만 입력해주세요.");
      }
    }
    this.setState({ authNum: newText });
  }
  async onChangednickname(text) {
    await this.setState({ nickname: text });
    this.checkSign();
  }
  async onChangedid(text) {
    let newText = "";
    let numbers =
      "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert("영어와 숫자만 입력해주세요.");
      }
    }
    await this.setState({ id: newText });
    this.checkSign();
  }
  async onChangedpw(text) {
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
    await this.setState({ pw: newText });
    this.checkSign();
  }
  async onChangedpwCheck(text) {
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
    await this.setState({ pwCheck: newText });
    this.checkSign();
  }
  onChangedgender(gender) {
    this.setState({ gender: gender });
  }
  onChangedemail(email) {
    this.setState({ email: email });
  }
  onChangedaddress(address) {
    this.setState({ address: address });
  }
  checkStudentCard() {
    if (
      this.state.name != "" &&
      this.state.univ != "" &&
      this.state.image != ""
    ) {
      this.setState({
        studentcardCheck: true,
      });
    } else {
      this.setState({
        studentcardCheck: false,
      });
    }
  }
  async onChangedname(name) {
    await this.setState({ name: name });
    this.checkStudentCard();
  }
  async onChangeduniv(univ) {
    await this.setState({ univ: univ });
    this.checkStudentCard();
  }
  checkSign() {
    if (
      this.state.nickname.length > 3 &&
      (this.state.token != null ||
        (this.state.id.length > 4 &&
          this.state.pw.length > 4 &&
          this.state.pwCheck.length > 4))
    ) {
      if (this.state.pw == this.state.pwCheck) {
        userStore
          .findUserByAttributes("i", this.state.nickname)
          .then((result) => {
            if (result == null) {
              userStore
                .findUserByAttributes("f", this.state.id)
                .then((result2) => {
                  if (result2 == null) {
                    this.setState({
                      signCheck: true,
                      error: "휴대폰 및 학생증 인증을 완료해주세요.",
                    });
                  } else {
                    this.setState({
                      signCheck: false,
                      error: "중복된 아이디가 있습니다.",
                    });
                  }
                });
            } else {
              this.setState({
                signCheck: false,
                error: "중복된 닉네임이 있습니다.",
              });
            }
          });
      } else {
        this.setState({
          signCheck: false,
          error: "비밀번호과 비밀번호 확인이 다릅니다.",
        });
      }
    } else {
      this.setState({
        signCheck: false,
        error: "아이디/비밀번호는 5자 이상, 닉네임은 4자 이상이어야합니다.",
      });
    }
  }

  //#endregion
  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <View style={{ flex: 1, margin: 20, marginLeft: 30, marginRight: 30 }}>
          {/* 휴대폰 인증 start*/}
          <View style={{ marginBottom: 70 }}>
            <View style={SignIn.complete_alert_checkbox}>
              <Text>{this.state.result}</Text>
              <CheckBox disabled={true} value={this.state.authCheck} />
              <Text>
                {this.state.authCheck ? "휴대폰 인증 완료" : "휴대폰 인증"}
              </Text>
            </View>

            <View style={{ marginBottom: 20 }}>
              <View style={SignIn.phone_auth}>
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: "#959595",
                    marginRight: 10,
                    borderRadius: 5,
                  }}
                >
                  <Picker
                    selectedValue={this.state.countryNum}
                    style={{ height: 30 }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ countryNum: itemValue })
                    }
                    // https://ko.wikipedia.org/wiki/국제전화_나라_번호
                  >
                    <Picker.Item label="대한민국(+82)" value="+82" />
                    <Picker.Item label="북한(+850)" value="+850" />
                    <Picker.Item label="인도네시아(+62)" value="+62" />
                  </Picker>
                </View>

                <View
                  style={[
                    SignIn.input,
                    { borderWidth: 1, borderColor: "#959595", borderRadius: 5 },
                  ]}
                >
                  <TextInput
                    value={this.state.phoneNumber}
                    onChangeText={(val) => this.onChangedPhoneNumber(val)}
                    keyboardType="number-pad"
                    maxLength={14}
                    placeholder="휴대폰 번호"
                    autoCompleteType="tel"
                    style={{ fontSize: 15, paddingLeft: 10 }}
                  />
                </View>
              </View>

              <View
                style={
                  !this.state.confirmBtn
                    ? SignIn.auth_button
                    : SignIn.auth_deactiveButton
                }
              >
                <TouchableOpacity
                  onPress={this.sendVerification}
                  disabled={this.state.confirmBtn}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    인증번호 전송
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ alignSelf: "center", width: "50%" }}>
              <View style={[SignIn.input, { marginBottom: 20 }]}>
                <TextInput
                  value={this.state.authNum}
                  onChangeText={(val) => this.onChangedauthNum(val)}
                  keyboardType="number-pad"
                  maxLength={8}
                  style={{ fontSize: 15, textAlign: "center" }}
                  placeholder="12345678"
                />
              </View>
              <View
                style={
                  !this.state.confirmBtn
                    ? SignIn.auth_button
                    : SignIn.auth_deactiveButton
                }
              >
                <TouchableOpacity
                  onPress={this.confirmCode}
                  disabled={this.state.confirmBtn}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    인증번호 확인
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <FirebaseRecaptchaVerifierModal
            ref={this.recaptchaVerifier}
            firebaseConfig={firebase.app().options}
          />
          {/* 휴대폰 인증 end */}

          {/* 회원정보 입력 start */}
          <View style={SignIn.complete_alert_checkbox}>
            <CheckBox disabled={true} value={this.state.signCheck} />
            <Text>
              {this.state.signCheck ? "회원 정보 입력 완료" : "회원 정보 입력"}
            </Text>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 11, marginBottom: 2, color: "#7D849B" }}>
              닉네임
            </Text>
            <View style={SignIn.input}>
              <TextInput
                value={this.state.nickname}
                onChangeText={(val) => this.onChangednickname(val)}
                maxLength={20}
                placeholder="파리의택시드라이버"
                style={{ fontSize: 16, marginBottom: 5 }}
              />
            </View>
          </View>
          {this.state.token == null ? (
            <>
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{ fontSize: 11, marginBottom: 2, color: "#7D849B" }}
                >
                  아이디
                </Text>
                <View style={SignIn.input}>
                  <TextInput
                    value={this.state.id}
                    onChangeText={(val) => this.onChangedid(val)}
                    maxLength={20}
                    placeholder="slsl7862"
                    style={{ fontSize: 16, marginBottom: 5 }}
                  />
                </View>
              </View>

              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{ fontSize: 11, marginBottom: 2, color: "#7D849B" }}
                >
                  비밀번호
                </Text>
                <View style={SignIn.input}>
                  <TextInput
                    value={this.state.pw}
                    onChangeText={(val) => this.onChangedpw(val)}
                    maxLength={20}
                    placeholder="비밀번호"
                    style={{ fontSize: 16, marginBottom: 5 }}
                  />
                </View>
              </View>
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{ fontSize: 11, marginBottom: 2, color: "#7D849B" }}
                >
                  비밀번호 확인
                </Text>
                <View style={SignIn.input}>
                  <TextInput
                    value={this.state.pwCheck}
                    onChangeText={(val) => this.onChangedpwCheck(val)}
                    maxLength={20}
                    placeholder="비밀번호확인"
                    style={{ fontSize: 16, marginBottom: 5 }}
                  />
                </View>
              </View>
            </>
          ) : null}
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, marginBottom: 2, color: "#7D849B" }}>
              성별
            </Text>

            <View
              style={{ flex: 1, flexDirection: "row", alignSelf: "center" }}
            >
              <TouchableOpacity
                style={[
                  button_style.gender_change,
                  {
                    backgroundColor:
                      this.state.gender == 0 ? "#E5AF0B" : "#CBCED7",
                  },
                ]}
                onPress={() => this.onChangedgender(0)}
              >
                <Text style={{ textAlign: "center" }}> 남자 </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  button_style.gender_change,
                  {
                    backgroundColor:
                      this.state.gender == 1 ? "#E5AF0B" : "#CBCED7",
                  },
                ]}
                onPress={() => this.onChangedgender(1)}
              >
                <Text style={{ textAlign: "center" }}> 여자 </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: 20, marginTop: 30 }}>
            <Text style={{ fontSize: 11, marginBottom: 2, color: "#7D849B" }}>
              이메일 (선택)
            </Text>
            <View style={SignIn.input}>
              <TextInput
                value={this.state.email}
                onChangeText={(val) => this.onChangedemail(val)}
                maxLength={40}
                placeholder="campustaxi@naver.com"
              />
            </View>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 11, marginBottom: 2, color: "#7D849B" }}>
              주소 (선택)
            </Text>
            <View style={SignIn.input}>
              <TextInput
                value={this.state.address}
                onChangeText={(val) => this.onChangedaddress(val)}
                maxLength={40}
                placeholder="서울 강북구 덕릉로52"
              />
            </View>
          </View>
          {/* 회원정보 입력 end */}

          {/* 학생증 start */}
          <View style={[SignIn.complete_alert_checkbox, { marginTop: 50 }]}>
            <CheckBox disabled={true} value={this.state.studentcardCheck} />
            <Text>
              {this.state.studentcardCheck ? "학생증 제출 완료" : "학생증 인증"}
            </Text>
          </View>

          <Button title="학생증 사진 선택" onPress={this.onChooseImagePress} />
          <Image
            style={styles.logo}
            source={this.state.image ? { uri: this.state.image } : null}
          />

          <View style={{ marginBottom: 20, marginTop: 20 }}>
            <Text style={{ fontSize: 11, marginBottom: 2, color: "#7D849B" }}>
              이름 [본명]
            </Text>
            <View style={SignIn.input}>
              <TextInput
                value={this.state.name}
                onChangeText={(val) => this.onChangedname(val)}
                maxLength={40}
                placeholder="윤수정"
              />
            </View>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 11, marginBottom: 2, color: "#7D849B" }}>
              학교
            </Text>
            <View style={SignIn.input}>
              <TextInput
                value={this.state.univ}
                onChangeText={(val) => this.onChangeduniv(val)}
                maxLength={40}
                placeholder="서울삼육대학교"
              />
            </View>
          </View>
        </View>

        <View style={button_style.next_button}>
          <TouchableOpacity
            style={{ width: "100%" }}
            onPress={async () => {
              this.confirmCode;
              if (
                this.state.authCheck &&
                this.state.signCheck &&
                this.state.studentcardCheck
              ) {
                this.uploadImage(this.state.image, "studentcard");
                if (this.state.token == null) {
                  await userStore.addUser(
                    this.state.address,
                    this.state.email,
                    this.state.gender,
                    this.state.id,
                    this.state.pw,
                    this.state.name,
                    this.state.nickname,
                    this.state.countryNum + this.state.phoneNumber,
                    this.state.image,
                    this.state.univ,
                    this.state.policy
                  );
                } else {
                  await userStore.addUserToken(
                    this.state.address,
                    this.state.email,
                    this.state.gender,
                    this.state.name,
                    this.state.nickname,
                    this.state.countryNum + this.state.phoneNumber,
                    this.state.image,
                    this.state.univ,
                    this.state.policy,
                    this.state.token
                  );
                }

                navigation.navigate("회원 가입 완료", {
                  id: this.state.id,
                  pw: this.state.pw,
                  token: this.state.token,
                });
              } else {
                alert(
                  "완료되지 않는 절차가 있습니다." +
                    "\n사유:" +
                    this.state.error
                );
              }
            }}
          >
            <Text
              style={{ color: "#ffffff", fontSize: 20, textAlign: "center" }}
            >
              가입하기
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  // 학생증 인증 사진 출력하는 css.infile
  logo: {
    width: 300,
    height: 450,
    alignSelf: "center",
    marginTop: 15,
  },
});

export class Sign3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
      pw: this.props.route.params.pw,
      token: this.props.route.params.token,
    };
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* logo && title */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        ></View>

        {/* 환영 인사 */}
        <View style={{ flex: 2 }}>
          <Text style={{ fontSize: 21, textAlign: "center", color: "#6060DC" }}>
            환영합니다!
          </Text>
          <Text style={{ fontSize: 18, textAlign: "center" }}>
            해당 어플은 삼육대학교 창업동아리 '캠퍼스택시'가 제작하고 운영하는
            어플입니다.
          </Text>
          <Text> {"\n"} </Text>
          <Text style={{ fontSize: 18, textAlign: "center" }}>
            현재에는 채팅과 방만들기 기능만을 제공하고 있습니다.
          </Text>
          <Text> {"\n"} </Text>
          <Text style={{ fontSize: 18, textAlign: "center" }}>
            N분의 1 계산은 <Text style={{ color: "#0000ff" }}> TOSS앱 </Text>,
            택시 호출은 <Text style={{ color: "#ffd700" }}> 카카오 택시 </Text>
            를 이용해 주세요!
          </Text>
          <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
            <View
              style={[button_style.next_button, { backgroundColor: "#CBCED7" }]}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  style={{
                    color: "#ffffff",
                    textAlign: "center",
                    fontSize: 17,
                  }}
                >
                  처음으로 돌아가기
                </Text>
              </TouchableOpacity>
            </View>
            <View style={button_style.next_button}>
              <TouchableOpacity
                onPress={() => {
                  if (this.state.token != null) {
                    userStore
                      .loginToken(this.state.token)
                      .then(() => navigation.navigate("home"));
                  } else {
                    userStore
                      .login(this.state.id, this.state.pw)
                      .then(() => navigation.navigate("home"));
                  }
                }}
                color="#162A64"
              >
                <Text
                  style={{
                    color: "#ffffff",
                    textAlign: "center",
                    fontSize: 17,
                  }}
                >
                  로 그 인
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const Terms = StyleSheet.create({
  terms_container: {
    //nt
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 20,
  },
  nt_item: {
    //necessary_terms_item
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 30,
    justifyContent: "center",
  },
  nt_item_text: {
    fontSize: 15,
    textAlignVertical: "center",
  },
  not_necessary_temrs: {
    //nnt
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  nnt_item: {
    //not_necessary_temrs_item
    flexDirection: "row",
    flexWrap: "wrap",
  },
  detail: {
    color: "#a9a9a9",
    fontSize: 12,
  },
});

const SignIn = StyleSheet.create({
  complete_alert_checkbox: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  phone_auth: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 30,
  },
  input: {
    flex: 1,
    borderBottomColor: "#a9a9a9",
    borderBottomWidth: 1,
  },
  auth_button: {
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#162A64",
    marginLeft: 10,
    borderRadius: 20,
    width: 180,
    height: 37,
  },
  auth_deactiveButton: {
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "gray",
    marginLeft: 10,
    borderRadius: 20,
    width: 180,
    height: 37,
  },
});

const button_style = StyleSheet.create({
  next_button: {
    backgroundColor: "#162A64",
    height: 50,
    margin: 0,
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
  },
  gender_change: {
    borderRadius: 20,
    height: 27,
    width: "40%",
    margin: 10,
  },
});
