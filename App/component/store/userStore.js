import Storage from "store/Storage";
import { observable, action } from "mobx";
const firebase = require("firebase");

// import UserStore from "store/userStore";
// const userStore = new UserStore();
// import { observer, inject } from "mobx-react";
// @inject("bbs")
// @inject("user")
// @observer
export default class UserStore {
  @observable user = null;

  storeData(value) {
    Storage.storeData("user", value);
  }
  getData() {
    alert("getData");
    alert(Storage.getData("user"));
    // return Storage.getData("user");
  }
  //#region  Add User 회원가입
  //EXAMPLE: onPress={() => UserStore.addUser(2, 3, 4, 5, 6, 7, 8)}
  //<Button onPress={() => UserStore.storeData()} title="asd"/>/
  addUser(
    address,
    email,
    gender,
    loginid,
    loginpassword,
    name,
    nickname,
    phone,
    studentcard,
    univ
  ) {
    //시간 가져오기
    fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
      .then((res) => res.json())
      .then((result) => {
        const datatime =
          result.datetime.slice(0, 21) + result.datetime.slice(26, 32); //밀리초제거
        let newkey = firebase.database().ref("user/data").push().key;
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
            n: 1,
          };
          firebase.database().ref("user/data").push(newUser);
          this.user.push(newUser);
          this.storeData(newUser);
        }
      });
  }
  //#endregion
  // lockUser : 해당 기간까지 클라이언트 계정 정지
  //onPress={() => BbsStore.hideBbs("-MDrAW9yVgYg8BSehz4e")}
  lockUser(userkey, untilDate) {
    firebase
      .database()
      .ref("bbs/data/" + userkey + "/n")
      .set(untilDate);
  }
  // Remove bbs : 데이터를 완전히 지움
  removeUser(userkey) {
    //onPress={() => BbsStore.removeUser("-MDrAW9yVgYg8BSehz4e")}
    firebase
      .database()
      .ref("user/data/" + userkey)
      .set({});
  }
  changeUserValue(userkey, props, value) {
    //props는 a => available이런식
    firebase
      .database()
      .ref("bbs/data/" + userkey + "/" + props)
      .set(value);
  }
  getUser(userkey) {
    //onPress={() => BbsStore.getBbs("-MDrAW9yVgYg8BSehz4e")}
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
    //bbs에서 데이터를 가져와서 firebase json 형식에서 flatlist하기 좋은 형식으로 키값을 JSON 안으로 넣는다.
    if (userid.length < 5 || userpassword.length < 5) {
      alert("아이디와 비밀번호는 5자리 이상이어야합니다.");
    } else {
      await firebase
        .database()
        .ref("user/data/" + userid)
        .once("value", (snap) => {
          // json을 string으로 바꾸었다가 다시 json 형식으로 표준화
          // 그냥하면 안됌
          // alert(JSON.stringify(snap.val()));/
          tempdata = JSON.parse(JSON.stringify(snap));
          if (snap.val() != null && tempdata.g == userpassword) {
            this.user = tempdata;
          } else {
            alert("없는 아이디이거나 비밀번호가 다릅니다.");
          }
        });
    }
    this.storeData(this.user);
  }

  printUserStore() {
    alert(JSON.stringify(this.user));
  }
  //
  //
  //
  //
  //
  //
  //
  //
  // 샘플

  // Increment counterNum
  handleIncrement = ({ index }) => {
    this.user = [
      ...this.user.slice(0, index),
      {
        counterNum: this.user[index].counterNum + 1,
      },
      ...this.user.slice(index + 1, this.user.length),
    ];
  };
  // Decrement counterNum
  handleDecrement = ({ index }) => {
    this.user = [
      ...this.user.slice(0, index),
      {
        counterNum: this.user[index].counterNum - 1,
      },
      ...this.user.slice(index + 1, this.user.length),
    ];
  };
}
