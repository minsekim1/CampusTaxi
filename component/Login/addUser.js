import * as React from "react";
import { Component, } from "react";
import { userStore } from "../store/store";
import Constants from 'expo-constants';
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
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import univ_list from "./univ_list";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export class addUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      nickname: "",
      isNext: false,
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
      univSearch: null,
      univSelected: null,
      error: "아무런 값이 입력되지 않았습니다.",
      policy: this.props.route.params.policy,
      confirmBtn: false,
      signCheck: false,
    };
  }

  isNumber(text) {
    let char = "0123456789";
    for (var i = 0; i < text.length; i++) {
      if (char.indexOf(text[text.length - 1]) <= -1) {
        return false;
      }
    }
    return true;
  }
  isAlphabet(text) {
    let char = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    for (var i = 0; i < text.length; i++) {
      if (char.indexOf(text[text.length - 1]) <= -1) {
        return false;
      }
    }
    return true;
  }
  isNumberOrAlphabet(text) {
    let char = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    for (var i = 0; i < text.length; i++) {
      if (char.indexOf(text[text.length - 1]) <= -1) {
        return false;
      }
    }
    return true;
  }
  isSpecail(text) {
    let char = "?, ;: \"'-)(*&^%~#@!☆♡><₩/=÷×+`\\|♤♧{}[]•○●□■◇$€£¥°※¤《》¡¿";
    if (text != "") {
      for (var i = 0; i < text.length; i++) {
        if (char.indexOf(text[text.length - 1]) <= -1) {
          return false;
        }
      }
    }
    return true;
  }
  async onChangednickname(text) {
    if (text != "") {
      if (!this.isSpecail(text))
        await this.setState({ nickname: text });
      else
        alert("특수문자는 _만 가능합니다.")
    } else {
      await this.setState({ nickname: text });
    }
    await this.checkSign();
  }
  async onChangedid(text) {
    if (text != "") {
      if (this.isNumberOrAlphabet(text))
        await this.setState({ id: text });
      else
        alert("영어와 숫자만 입력해주세요.")
    } else this.setState({ id: text });
    await this.checkSign();
  }

  async onChangedpw(text) {
    await this.setState({ pw: text });
    await this.checkSign();
  }
  async onChangedpwCheck(text) {
    await this.setState({ pwCheck: text });
    await this.checkSign();
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
  onChooseImagePress = async () => {
    var result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      //userStore.imageUpload(result);
      try {
        this.checkStudentCard();
      } catch (error) {
        console.log("onChooseImagePress error:" + error);
      }
    }
  };
  async onChangedname(name) {
    await this.setState({ name: name });
    await this.checkStudentCard();
  }
  onChangedUnivSelected = async (val) => {
    await this.setState({
      univSelected: val.toString(),
    });
    this.checkStudentCard();
  };
  checkStudentCard() {
    if (
      this.state.name != "" &&
      this.state.univSelected != null &&
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
  async onChangeduniv(univ) {
    await this.setState({ univ: univ });
    this.checkStudentCard();
    let arr = [];
    if(univ==""){
      this.setState({ univSearch: arr });
      return ;
    }
   await univ_list.map(i=>{
     if(i.univ.includes(this.state.univ)){
      arr.push(i)
     }
    })
    await this.setState({ univSearch: arr });
  }

  checkSign() {
    if (this.state.nickname.length > 3 && this.state.id.length > 4 && this.state.pw.length > 4 && this.state.pwCheck.length > 4) {
      if (this.state.pw == this.state.pwCheck) {
        this.setState({ signCheck: true });
        //   } else {
        //     this.setState({
        //       signCheck: false,
        //       error: "중복된 아이디가 있습니다.",
        //     });
        //   }
        //  else {
        //     this.setState({
        //       signCheck: false,
        //       error: "중복된 닉네임이 있습니다.",
        //     });
        //   }
      } else {
        this.setState({ signCheck: false, error: "비밀번호과 비밀번호 확인이 다릅니다." });
      }
    } else {
      this.setState({ signCheck: false, error: "아이디/비밀번호는 5자 이상, 닉네임은 4자 이상이어야합니다." });
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={{paddingLeft:20,paddingRight:20}}>
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
                placeholder="사용할 닉네임을 4자리이상입력해주세요."
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
                    placeholder="아이디를 5자리이상입력해주세요."
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
                    placeholder="비밀번호를 5자리이상입력해주세요."
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
                    placeholder="비밀번호를 똑같이 입력해주세요."
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
              이메일 (필수)
             </Text>
            <View style={SignIn.input}>
              <TextInput
                value={this.state.email}
                onChangeText={(val) => this.onChangedemail(val)}
                maxLength={40}
                placeholder="email@naver.com *동일 이메일은 중복가입을 할 수 없습니다."
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
                maxLength={20}
                placeholder="대학교이름을 입력해주세요."
              />
            </View>
            <Text style={{ fontSize: 11, marginBottom: 2, color: "#7D849B" }}>
              대학교 검색결과
             </Text>

            {this.state.univSearch != null
              ?
              this.state.univSearch.map(r => {
                return (
                  <TouchableOpacity
                    key={String(r.id)}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "gray",
                    }}
                    onPress={() => this.onChangedUnivSelected(r.univ)}
                  >
                    <Text style={{ margin: 10, padding: 10 }}>
                      {r.univ}
                    </Text>
                  </TouchableOpacity>
                );
              })
              : null}
            <Text style={{ fontSize: 11, marginBottom: 2, color: "#7D849B" }}>
              선택한 대학교: {this.state.univSelected}
            </Text>
          </View>
        <View style={button_style.next_button}>
          <TouchableOpacity
            style={{ width: widthPercentageToDP(100) }}
            onPress={async () => {
              if (this.state.signCheck && this.state.studentcardCheck) {
                  userStore.createUser(
                    this.state.id,
                    this.state.pw,
                    this.state.email,
                    this.state.nickname,
                    "01000000000",
                    this.state.name,
                    this.state.address,
                    this.state.image,
                    this.state.univSelected.toString(),
                    this.state.gender,
                    this.state.policy
                  ).then((r)=>r?navigation.navigate("회원 가입 완료", {
                    id: this.state.id,
                    pw: this.state.pw,
                  }):null);
              } else if (!this.state.studentcardCheck) {
                alert("완료되지 않는 절차가 있습니다." + "\n사유:" + this.state.error);
              } else if (!this.state.signCheck) {
                alert("학생증 제출을 완료해주세요.")
              }
            }}
          >
            <Text style={{ color: "#ffffff", fontSize: 20, textAlign: "center" }}>
              가입하기
             </Text>
          </TouchableOpacity>
        </View>
        </View>
        </KeyboardAvoidingView>
      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 450,
    alignSelf: "center",
    marginTop: 15,
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
    alignSelf: "center",
    justifyContent: "center",
    width:widthPercentageToDP(101),
    position:"relative",
  },
  gender_change: {
    borderRadius: 20,
    height: 27,
    width: "40%",
    margin: 10,
  },
});