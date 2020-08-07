import { observable } from "mobx";
const firebase = require("firebase");

class UserStore {
  // addressA: "string"
  // emailB: "string"
  // enterroomC
  // genderD: "int"
  // joindateE: "timestamp"
  // loginidF: "string"
  // loginpasswordG: "string"
  // nameH: "string"
  // nicknameI: "string"
  // phoneJ: "string"
  // studentcardK: "string"
  // univL: "string"
  // userkeyM: "-MBRNLe85baaaaaaaaa"
  // userstatusN: "int"

  @observable user = [];

  //#region  Add User 회원가입
  //EXAMPLE: onPress={() => BbsStore.addUser(2, 3, 4, 5, 6, 7, 8)}
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
    // this.bbs.pop();
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

  // Update Bbs : firebase에서 bbs를 가져와 store에 저장한다
  async updateUser(userkey) {
    let tempBbs = [];
    //bbs에서 데이터를 가져와서 firebase json 형식에서 flatlist하기 좋은 형식으로 키값을 JSON 안으로 넣는다.
    await firebase
      .database()
      .ref("user/data/" + userkey)
      .once("value", (snap) => {
        snap.forEach((item) => {
          // json을 string으로 바꾸었다가 다시 json 형식으로 표준화
          // 그냥하면 안됌
          tempBbs.push(JSON.parse(JSON.stringify(item)));
        });
      });
    this.user = tempBbs;
  }
  async login(userid, userpassword) {
    let tempBbs = {};
    //bbs에서 데이터를 가져와서 firebase json 형식에서 flatlist하기 좋은 형식으로 키값을 JSON 안으로 넣는다.
    await firebase
      .database()
      .ref("user/data/" + userid)
      .orderByValue("f")
      .equalTo(userpassword)
      .once("value", (snap) => {
        // json을 string으로 바꾸었다가 다시 json 형식으로 표준화
        // 그냥하면 안됌
        // alert(JSON.stringify(snap.val()));/
        tempBbs = JSON.parse(JSON.stringify(snap.val()));
      });
    this.user = tempBbs;
    // alert(JSON.stringify(this.user));
    alert(JSON.stringify(tempBbs));
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

export default new UserStore();
