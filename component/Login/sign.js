import * as React from "react";
import { Component, useState, createRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, CheckBox } from "react-native";
export default class Sign1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: [true, true, true, true, true, true, true, true],
      isNext: true
    };
  }
  checkNext() {
    if (this.state.check[1] && this.state.check[2] && this.state.check[3])
      this.setState({ isNext: true })
    else
      this.setState({ isNext: false })
  }
  render() {
    const { navigation } = this.props;


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
                isNext: checkReturn[0]
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
              this.state.check[0] = false;
              checkReturn[1] = !checkReturn[1];
              this.setState({
                check: checkReturn,
              });
              this.checkNext();
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
              this.state.check[0] = false;
              checkReturn[2] = !checkReturn[2];
              this.setState({
                check: checkReturn,
              });
              this.checkNext();
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
              this.state.check[0] = false;
              this.setState({
                check: checkReturn,
              });
              this.checkNext();
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

        <View style={this.state.isNext ? {
          height: 50, margin: 0, alignSelf: "center", justifyContent: "center", width: "100%", backgroundColor: "#162A64",
        } : {
            height: 50, margin: 0, alignSelf: "center", justifyContent: "center", width: "100%", backgroundColor: "gray",
          }}>
          <TouchableOpacity
            style={{ width: "100%" }}
            onPress={() => { if (this.state.isNext) navigation.navigate("회원 정보 입력", { policy: this.state.check }) }}
            disabled={!this.state.isNext}
          >
            <Text
              style={{ color: "#ffffff", fontSize: 20, textAlign: "center" }}
            >
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </View >
    );
  }
}

// export class Sign3 extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       id: this.props.route.params.id,
//       pw: this.props.route.params.pw,
//       token: this.props.route.params.token,
//     };
//   }
//   render() {
//     const { navigation } = this.props;
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", }}>
//         {/* logo && title */}
//         <View
//           style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//         >
//           <Image source={require("image/icon.png")} />
//         </View>
//         <Text style={{ fontSize: 18 }}> CAMPUS TAXI </Text>
//         <View style={{ marginVertical: 30, }}>
//           <Text style={{ fontSize: 21, textAlign: "center", color: "#6060DC" }}>
//             환영합니다!
//           </Text>
//         </View>

//         {/* 환영 인사 */}
//         <View style={{ flex: 2, }}>
//           <View style={{ width: "80%" }}>
//             <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 30, }}>
//               해당 어플은 삼육대학교 창업동아리 '캠퍼스택시'가 제작하고 운영하는
//               어플입니다.
//             </Text>
//             <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 30, }}>
//               현재에는 채팅과 방만들기 기능만을 제공하고 있습니다.
//             </Text>
//             <Text style={{ fontSize: 18, textAlign: "center" }}>
//               N분의 1 계산은 <Text style={{ color: "#0000ff" }}> TOSS앱 </Text>,
//               택시 호출은 <Text style={{ color: "#ffd700" }}> 카카오 택시 </Text>
//               를 이용해 주세요!
//             </Text>
//           </View>

//           <View style={{ position: "absolute", bottom: 0, width: "100%", alignSelf: "center" }}>
//             <View
//               style={[button_style.next_button, { backgroundColor: "#CBCED7" }]}
//             >
//               <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//                 <Text
//                   style={{
//                     color: "#ffffff",
//                     textAlign: "center",
//                     fontSize: 17,
//                   }}
//                 >
//                   처음으로 돌아가기
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <View style={button_style.next_button}>
//               <TouchableOpacity
//                 onPress={() => {
//                   navigation.navigate("loading");
//                   if (this.state.token != null) {
//                     userStore.loginToken(this.state.token);
//                   } else {
//                     userStore.login(this.state.id, this.state.pw);
//                   }
//                 }}
//                 color="#162A64"
//               >
//                 <Text
//                   style={{
//                     color: "#ffffff",
//                     textAlign: "center",
//                     fontSize: 17,
//                   }}
//                 >
//                   로 그 인
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

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
