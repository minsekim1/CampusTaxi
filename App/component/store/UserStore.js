// #사용법
// 1. import { bbsStore, userStore } from "store";
// 2. onPress={() => userStore.addUser(1, 2, 3, 4, 5, 6, 7, 8,9,10)}
import "mobx-react-lite/batchingForReactDom";
export default class UserStore {
  @observable user = null; //현재 로그인된 유저
  @observable userbbs = []; //현재 로그인된 유저 안에 있는 bbs의 정보
  @observable userkey = null; //현재 로그인된 유저 아이디 or SNS로그인일 경우 토큰
  @observable develop = true; //개발전용모드
  //{userStore.develop == true ? "설정" : "홈"}
  //setKey: 유저키를 아이디/토큰으로 설정
  userDB = (name) => firebase.database().ref("user/data/" + name);
  asyncUser() {
    if (userkey != null) {
      userDB(userkey).on("value", (snap) => {
        this.user = JSON.parse(JSON.stringify(snap));
      });
    }
  }

  setKey(key) {
    this.userkey = key;
  }
  isKey() {
    //로그인되어있음
    if (this.userkey == null) return false;
    else return true; //로그인 안되어있음
  }
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
  addUserToken(
    address,
    email,
    gender, //0 = 남자 1 = 여자
    name,
    nickname,
    phone,
    studentcard,
    univ,
    policy,
    token
  ) {
    //시간 가져오기
    fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
      .then((res) => res.json())
      .then((result) => {
        const datatime =
          result.datetime.slice(0, 21) + result.datetime.slice(26, 32); //밀리초제거
        let newkey = token;
        if (newkey != null) {
          let newUser = {
            a: address,
            b: email,
            d: gender,
            e: datatime,
            f: "SNS",
            g: "SNS",
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
            .ref("user/data/" + token)
            .set(newUser);
          this.user = newUser;
        }
      });
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
            result = true;
          } else {
            alert("없는 아이디이거나 비밀번호가 다릅니다.");
          }
        });
    }
    this.userkey = userid;
    return result;
  }
  async loginToken(token) {
    //onPress={() => UserStore.loginToken("-s")}
    let tempdata = {};
    let result = false;
    //bbs에서 데이터를 가져와서 firebase json 형식에서 flatlist하기 좋은 형식으로 키값을 JSON 안으로 넣는다.
    await firebase
      .database()
      .ref("user/data/" + token)
      .once("value", (snap) => {
        // json을 string으로 바꾸었다가 다시 json 형식으로 표준화
        tempdata = JSON.parse(JSON.stringify(snap));
        if (tempdata && snap.val() != null) {
          this.user = tempdata;
          //alert("정상적으로 로그인되었습니다.");
          result = true;
        } else {
          alert("없는 아이디이거나 비밀번호가 다릅니다.");
        }
      });
    this.userkey = token;
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
    firebase
      .database()
      .ref("user/data/" + userkey + "/" + props)
      .set(value);
  }
  //회원정보바꾸기
  changeUserAll(
    userkey,
    email,
    gender, //0 = 남자 1 = 여자
    name,
    nickname
  ) {
    //props는 a => available이런식
    let updateUser = {
      b: email,
      d: gender,
      h: name,
      i: nickname,
    };
    firebase
      .database()
      .ref("user/data/" + userkey)
      .update(updateUser);
    this.user.b = email;
    this.user.d = gender;
    this.user.h = name;
    this.user.i = nickname;
  }
  //token: this.props.route.params.token,
  //navigation.navigate("회원 가입", { policy: state, token: this.props.route.params.token });
  async getUser(userkey) {
    let result = {};
    await firebase
      .database()
      .ref("user/data/" + userkey)
      .once("value", (s) => {
        result = s.val();
        alert(result);
        return JSON.stringify(result);
      });
    return result;
  }

  //userStore.globalTimeTolocalTime(userStore.user.e)
  //=>anotherStore.toLocal(date)

  async setuserbbs(userkey) {
    let result = [];
    await firebase
      .database()
      .ref("user/data/" + userkey + "/c")
      .once("value", (snap) => {
        if (snap.val() != null) {
          this.user.c = JSON.parse(JSON.stringify(snap));
          //유저데이터 에서 하나씩 bbs를 가져옴
          Object.keys(this.user.c).map(async (snapkey) => {
            if (snapkey != null) {
              await firebase
                .database()
                .ref("bbs/data/" + snapkey)
                .once("value", (snap2) => {
                  //현재 인원 재 계산
                  result.push(JSON.parse(JSON.stringify(snap2.val())));
                });
              this.userbbs = result;
            }
          });
        }
      });
  }
}

// import Storage from "./Storage";
import { observable, action } from "mobx";
const firebase = require("firebase");
import AsyncStorage from "@react-native-community/async-storage";
