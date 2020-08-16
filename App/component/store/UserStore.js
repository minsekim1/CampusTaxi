// #사용법
// 1. import { bbsStore, userStore } from "store";
// 2. onPress={() => userStore.addUser(1, 2, 3, 4, 5, 6, 7, 8,9,10)}

export default class UserStore {
  @observable user = null;
  //addUser: 회원가입 / 사용자 추가
  addUser(
    address,
    email,
    gender, //0 = 남자 1 = 여자
    loginid,
    loginpassword,
    name,
    nickname,
    phone,
    studentcard,
    univ,
    policy
  ) {
    //시간 가져오기
    fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
      .then((res) => res.json())
      .then((result) => {
        const datatime =
          result.datetime.slice(0, 21) + result.datetime.slice(26, 32); //밀리초제거
        let newkey = loginid;
        if (newkey != null) {
          let newUser = {
            a: address,
            b: email,
            d: gender,
            e: datatime,
            f: loginid,
            g: loginpassword,
            h: name,
            i: nickname,
            j: phone,
            k: studentcard,
            l: univ,
            m: newkey,
            n: 0, //학생증 인증 대기중
            o: policy,
          };
          firebase
            .database()
            .ref("user/data/" + loginid)
            .set(newUser);
          this.user = newUser;
        }
      });
  }
  // lockUser : 해당 기간까지 클라이언트 계정 정지
  lockUser(userkey, untilDate) {
    firebase
      .database()
      .ref("bbs/data/" + userkey + "/n")
      .set(untilDate);
  }
  // removeUser : 사용자 데이터를 완전히 지움
  removeUser(userkey) {
    firebase
      .database()
      .ref("user/data/" + userkey)
      .set({});
  }
  changeUser(userkey, props, value) {
    //props는 a => available이런식
    firebase
      .database()
      .ref("bbs/data/" + userkey + "/" + props)
      .set(value);
  }
  getUser(userkey) {
    let result = {};
    firebase
      .database()
      .ref("user/data/" + userkey)
      .once("value", (s) => {
        result = s.val();
        return JSON.stringify(result);
      });
  }

  // Update User : firebase에서 user를 가져와 store에 저장한다
  async updateUser(userkey) {
    let tempdata = [];
    //bbs에서 데이터를 가져와서 firebase json 형식에서 flatlist하기 좋은 형식으로 키값을 JSON 안으로 넣는다.
    await firebase
      .database()
      .ref("user/data/" + userkey)
      .once("value", (snap) => {
        snap.forEach((item) => {
          // json을 string으로 바꾸었다가 다시 json 형식으로 표준화
          // 그냥하면 안됌
          tempdata.push(JSON.parse(JSON.stringify(item)));
        });
      });
    this.user = tempdata;
    this.storeData(this.user);
  }

  async updateUser() {
    let tempdata = [];
    //bbs에서 데이터를 가져와서 firebase json 형식에서 flatlist하기 좋은 형식으로 키값을 JSON 안으로 넣는다.
    await firebase
      .database()
      .ref("user/data/" + this.user.m)
      .once("value", (snap) => {
        snap.forEach((item) => {
          // json을 string으로 바꾸었다가 다시 json 형식으로 표준화
          // 그냥하면 안됌
          tempdata.push(JSON.parse(JSON.stringify(item)));
        });
      });
    this.user = tempdata;
    this.storeData(this.user);
  }

  async login(userid, userpassword) {
    //onPress={() => UserStore.login("-s", "tkarnr78^@")}
    let tempdata = {};
    let result = false;
    //bbs에서 데이터를 가져와서 firebase json 형식에서 flatlist하기 좋은 형식으로 키값을 JSON 안으로 넣는다.
    if (userid.length < 5 || userpassword.length < 5) {
      alert("아이디와 비밀번호는 5자리 이상이어야합니다.");
    } else {
      await firebase
        .database()
        .ref("user/data/" + userid)
        .once("value", (snap) => {
          // json을 string으로 바꾸었다가 다시 json 형식으로 표준화
          tempdata = JSON.parse(JSON.stringify(snap));
          if (tempdata && snap.val() != null && tempdata.g == userpassword) {
            this.user = tempdata;
            alert("정상적으로 로그인되었습니다.");
            result = true;
          } else {
            alert("없는 아이디이거나 비밀번호가 다릅니다.");
          }
        });
    }
    return result;
  }

  print() {
    alert(JSON.stringify(this.user));
  }
  async findUserByAttributes(attributes, value) {
    //   onPress={() => {
    //     userStore
    //       .findUserByAttributes("a", "서울 노원구")
    //       .then((result) => alert(result));
    const ref = firebase
      .database()
      .ref("user/data")
      .orderByChild(attributes)
      .equalTo(value);
    let userid = null;
    await ref.once("value", (snap) => {
      snap.forEach((childSnapshot) => {
        userid = childSnapshot.key;
      });
    });
    return userid;
  }
}

// import Storage from "./Storage";
import { observable, action } from "mobx";
const firebase = require("firebase");
import AsyncStorage from "@react-native-community/async-storage";
