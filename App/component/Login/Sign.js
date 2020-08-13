import * as React from "react";
import { Component, useState } from "react";
import { Button, View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Alert } from "react-native";
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

// 승우 작업.
import * as ImagePicker from 'expo-image-picker'
import { storage } from "firebase";
const firebase = require('firebase');

export class ExpoImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      result: false
    };
    //this.onimageurlChange = this.onimageurlChange.bind(this)
  }
  onimageurlChange = (url) => {
    this.setState({
      image : url,
      result: true
    })
  }
  // onimageurlChange(url){this.setState({image:url})}
  // ChooseImage()
  onChooseImagePress = async () => {
      var result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
          this.uploadImage(result.uri, "test-image") // 매개변수 2번째 파일 "이름 저장"
          .then(() => {}).catch ((error) => {
              console.log(error);
          });
      }
  }
  sleep(time){
    return new Promise((resolve)=>setTimeout(resolve,time)
  )
}
  uploadImage = async (uri, imageName) => {
      const response = await fetch(uri);
      const blob = await response.blob();

      var ref = firebase.storage().ref().child("test/" + imageName); // "test/"는 디렉터리 지정.
      setTimeout(() => {
        ref.getDownloadURL().then((url) => {
        this.onimageurlChange(url);
      })}, 3000);
      //var imageName = this.imageName;
      return ref.put(blob);
  }

/*   imageURLhandle(url) {
    this.setState(function() {
      return { image: url };
    })
  } */
  render() {
      const { navigation } = this.props;
      return (
        <View>
          <Button title="학생증 사진 선택" onPress={this.onChooseImagePress} />
          <Image style={styles.logo}source={this.state.image ? { uri : this.state.image} : null } />
          <Button
          title="가입 하기"
          onPress={() => {
              if (this.state.result) {
                navigation.navigate("회원 가입 완료")
              } else {
                Alert.alert("이미지 선택하지 않았습니다.")
              }
          }
        }
        />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 100,
  }
});

// Sign2 Class 삭제 예정
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

        <Button
          title="가입 하기"
          onPress={() => {
              if (this.state.result == false) {
                navigation.navigate("회원 가입 완료")
              } else {
                Alert.alert("이미지 선택하지 않았습니다.")
              }
          }
        }
        />
      </View>
    );
  }
}

// 승우 작업 끝

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
