// #사용법
// 1. import { bbsStore, userStore, anotherStore } from "store";
// 2. onPress={() => userStore.addUser(1, 2, 3, 4, 5, 6, 7, 8,9,10)}

export default class UserStore {
  @observable user = null; //현재 로그인된 유저
  @observable userbbs = []; //현재 로그인된 유저 안에 있는 bbs의 정보
  @observable userkey = null; //현재 로그인된 유저 아이디 or SNS로그인일 경우 토큰
  @observable develop = false; //개발전용모드
  //{userStore.develop == true ? "설정" : "홈"}

  //setKey: 유저키를 아이디/토큰으로 설정
  bbsDB = (name) => firebase.database().ref("bbs/data/" + name);
  userDB = (name) => firebase.database().ref("user/data/" + name);

  //chatInfo.js : 방장위임
  hostPass(hostNickName, toUserNickname, bbskey) {
    this.bbsDB(bbskey + "/i").set(toUserNickname);
    this.bbsDB(bbskey + "/d").push({
      da: "",
      db: "SYSTEM",
      dc: new Date(),
      dd:
        "방장이 " +
        hostNickName +
        " 님에서 " +
        toUserNickname +
        " 님으로 위임되었습니다.",
    });
  }
  asyncUser() {
    if (this.userkey != null) {
      this.userDB(this.userkey).on("value", (snap) => {
        this.user = this.Json(snap);
      });
    }
  }
  logout() {
    this.userkey = null;
    this.user = null; //
    this.userbbs = [];
    this.userkey = null;
    this.develop = true;
  }
  setKey(key) {
    this.userkey = key;
  }
  isKey() {
    if (this.userkey == null) {
      return false;
    } else {
      return true;
    }
  }
  //addUser: 회원가입 / 사용자 추가
  addUser(a, b, d, f, g, h, i, j, k, l, o) {
    //시간 가져오기
    fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
      .then((res) => res.json())
      .then((result) => {
        const datatime =
          result.datetime.slice(0, 21) + result.datetime.slice(26, 32); //밀리초제거
        let newkey = f;
        if (newkey != null) {
          let newUser = {
            a: a,
            b: b,
            d: d,
            e: datatime,
            f: f,
            g: g,
            h: h,
            i: i,
            j: j,
            k: k,
            l: l,
            m: newkey,
            n: 1,
            o: o,
          };
          this.userDB(f).set(newUser);
          this.user = newUser;
        }
      });
  }
  addUserToken(a, b, d, h, i, j, k, l, o, token) {
    //시간 가져오기
    fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
      .then((res) => res.json())
      .then((result) => {
        const datatime =
          result.datetime.slice(0, 21) + result.datetime.slice(26, 32); //밀리초제거
        let newkey = token;
        if (newkey != null) {
          let newUser = {
            a: a,
            b: b,
            d: d,
            e: datatime,
            f: "SNS",
            g: "SNS",
            h: h,
            i: i,
            j: j,
            k: k,
            l: l,
            m: newkey,
            n: 0,
            o: o,
          };
          this.userDB(token).set(newUser);
          this.user = newUser;
        }
      });
  }
  async login(id, pw) {
    //onPress={()=> UserStore.login("-s", "tkarnr78^@")}
    let tempdata = {};
    let result = false;
    //bbs에서 데이터를 가져와서 firebase json 형식에서 flatlist하기 좋은 형식으로 키값을 JSON 안으로 넣는다.
    if (id.length < 5 || pw.length < 5) {
      alert("아이디와 비밀번호는 5자리 이상이어야합니다.");
    } else {
      await this.userDB(id).once("value", (snap) => {
        tempdata = this.Json(snap);
        if (tempdata && snap.val() != null && tempdata.g == pw) {
          this.user = tempdata;
          this.userkey = id;
          result = true;
        } else {
          alert("없는 아이디이거나 비밀번호가 다릅니다.");
        }
      });
    }

    return result;
  }
  async loginToken(token) {
    //onPress={() => UserStore.loginToken("-s")}
    let tempdata = {};
    let result = false;
    //bbs에서 데이터를 가져와서 firebase json 형식에서 flatlist하기 좋은 형식으로 키값을 JSON 안으로 넣는다.
    await this.userDB(token).once("value", (snap) => {
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
    this.userDB(userkey + "/n").set(untilDate);
  }
  // removeUser : 사용자 데이터를 완전히 지움
  removeUser(userkey) {
    //this.bbsDB("").orderByChild(userkey)
    //this.userDB(userkey).set({});
  }
  changeUser(userkey, props, value) {
    this.userDB(userkey + "/" + props).set(value);
  }
  //회원정보바꾸기
  changeUserAll(
    userkey,
    b,
    d, //0 = 남자 1 = 여자
    h,
    i
  ) {
    //props는 a => available이런식
    let updateUser = {
      b: b,
      d: d,
      h: h,
      i: i,
    };
    this.userDB(userkey).update(updateUser);
    this.user.b = b;
    this.user.d = d;
    this.user.h = h;
    this.user.i = i;
  }
  //token: this.props.route.params.token,
  //navigation.navigate("회원 가입", { o: state, token: this.props.route.params.token });
  async getUser(userkey) {
    let result = {};
    await this.userDB(userkey).once("value", (s) => {
      result = s.val();
      return JSON.stringify(result);
    });
    return result;
  }

  //userStore.globalTimeTolocalTime(userStore.user.e)
  //=>anotherStore.toLocal(date)
  //userStore.setuserbbs()
  //=>userStore.asyncuserbbs()
  async asyncuserbbs() {
    let result = null;
    await this.userDB(this.userkey + "/c").on("value", (snap) => {
      if (snap.val() != null) {
        result = [];
        Object.entries(snap.val()).map((r) => {
          if (r[1] == 1) {
            this.bbsDB(r[0]).on("value", (snap2) => {
              if (snap2.val() != null)
                result.push(JSON.parse(JSON.stringify(snap2.val())));
            });
          }
        });
        //유저데이터 에서 하나씩 bbs를 가져옴
        this.userbbs = result;
      }
    });
  }
  //#region store공통함수
  //this.key(snap).then((r) => (this.placeStart = r));
  //this.val(snap).then((r) => (this.placeStart = r));
  //V = val() / K = key
  async key(snap) {
    let arr = [];
    snap.forEach((i) => {
      arr.push(i.key);
    });
    return arr;
  }
  async val(snap) {
    let arr = [];
    snap.forEach((i) => {
      arr.push(JSON.parse(JSON.stringify(i.val())));
    });
    return arr;
  }
  Json(snap) {
    return JSON.parse(JSON.stringify(snap));
  }
  //#endregion store공통함수
}

// import Storage from "./Storage";
import { observable, action } from "mobx";
const firebase = require("firebase");
import AsyncStorage from "@react-native-community/async-storage";
import "mobx-react-lite/batchingForReactDom";
