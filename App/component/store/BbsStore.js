import AsyncStorage from "@react-native-community/async-storage";
import { observable } from "mobx";
import "mobx-react-lite/batchingForReactDom";
const firebase = require("firebase");
import _ from "lodash";
// import { bbsStore, userStore } from "store";
export default class BbsStore {
  // "availableA" : "int",
  // "bbskeyB" : "String",
  // "bbstypeC" : "int",
  // "chatD" : [ [ null, "usernameB", "timeC", "sayD" ] ],
  // "costE" : [ [ "costkeyA", "costvalueB", "paymentC" ] ],
  // "createdateF" : "timestamp",
  // "endplaceG" : "string:DB",
  // "genderH" : "int",
  // "leadernameI" : "string:DB",
  // "meetingdateJ" : "timestamp",
  // "personmaxK" : "int",
  // "personmemberL" : "Array",
  // "personpresentM" : "int",
  // "startplaceN" : "string:DB"
  @observable bbs = [];
  @observable bbsnow = []; //현재 접속중인 bbs의 정보
  @observable bbsuser = []; //접속중인 bbs안에 있는 유저들의 정보
  @observable selectedbbs = [];
  @observable test = []; //테스트

  bbsDB = (name) => firebase.database().ref("bbs/data/" + name);
  //async로 시작하는 함수는 bbsDB와 on으로 실시간연동이 되어있는 것을 뜻합니다.
  asyncAllBbs() {
    let result = [];
    this.bbsDB("").on("value", (snap) => {
      snap.forEach((i) => {
        result.push(JSON.parse(JSON.stringify(i.val())));
      });
    });
    this.bbs = result;
  }

  onbbstest() {
    //예시1 bbsDB를 이용하여 firebase에서 데이터를 가져옵니다.
    //on은 실시간 연동을 의미합니다.
    this.bbsDB("").on("value", (snap) => {
      this.test = snap.val();
    });
    //예시2 firebase함수를 이용하여 firebase에서 데이터를 가져옵니다.
    // firebase
    //   .database()
    //   .ref("bbs/data")
    //   .on("value", (snap) => {
    //     this.test = snap.val();
    //   });
    //위 두 예시의 결과는 같습니다.
  }
  getFilterBbs() {
    let result = [];
    firebase
      .database()
      .ref("bbs/data")
      .once("value", (snap) => {
        snap.forEach((i) => {
          result.push(JSON.parse(JSON.stringify(i)));
        });
      });
    this.selectedbbs = result;
  }
  async getAllBbs() {
    //onPress={() => BbsStore.getBbs("-MDrAW9yVgYg8BSehz4e")}
    let result = [];
    await firebase //bbs에서 데이터를 가져와서 firebase json 형식에서 flatlist하기 좋은 형식으로 키값을 JSON 안으로 넣는다.
      .database()
      .ref("bbs/data")
      .once("value", (snap) => {
        snap.forEach((i) => {
          //result.push(_.cloneDeep(i));
          result.push(JSON.parse(JSON.stringify(i.val())));
        });
      });
    this.bbs = result;
  }
  print() {
    alert(JSON.stringify(this.bbs));
  }

  addBbs( //c, g, h, i, j, k, n
    bbstype,
    endplace,
    gender,
    leadername,
    meetingdate,
    personmax,
    startplace,
    userkey
  ) {
    //시간 가져오기
    fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
      .then((res) => res.json())
      .then((result) => {
        //밀리초제거
        const datatime =
          result.datetime.slice(0, 21) + result.datetime.slice(26, 32);
        let localDate = new Date(datatime);
        const week = ["일", "월", "화", "수", "목", "금", "토"];
        const dayOfWeek = week[localDate.getDay()];
        const date =
          localDate.getFullYear() +
          "년" +
          (localDate.getMonth() + 1) +
          "월" +
          localDate.getDate() +
          "일" +
          dayOfWeek +
          "요일" +
          localDate.getHours() +
          "시" +
          localDate.getMinutes() +
          "분";
        let newBbs = {
          a: 1,
          c: bbstype,
          d: {
            "-MA_aaaaa": {
              da: "-MA_aaaaa",
              db: "SYSTEM",
              dc: datatime,
              dd: date.slice(0, 10) + " 방이 생성되었습니다.",
            },
          },
          f: datatime,
          g: endplace,
          h: gender,
          i: leadername,
          j: meetingdate,
          k: personmax,
          n: startplace,
        };
        let newkey = firebase.database().ref("bbs/data").push(newBbs).key;
        firebase
          .database()
          .ref("bbs/data/" + newkey + "/b")
          .set(newkey);
        this.bbs.push(newBbs);
        // 채팅데이터에 유저키 추가
        firebase
          .database()
          .ref("bbs/data/" + newkey + "/l/" + userkey)
          .set(1);
        // 유저 데이터에 새로운 방 추가
        firebase
          .database()
          .ref("user/data/" + userkey + "/c/" + newkey)
          .set(1);
      });
  }

  //#endregion
  // Hide bbs : 클라이언트에게 숨기기만함
  hideBbs(bbskey) {
    //onPress={() => BbsStore.hideBbs("-MDrAW9yVgYg8BSehz4e")}
    firebase
      .database()
      .ref("bbs/data/" + bbskey + "/a")
      .set(0);
    // this.bbs.pop();
  }
  // Remove bbs : 데이터를 완전히 지움
  removeBbs(bbskey) {
    //onPress={() => BbsStore.removeBbs("-MDrAW9yVgYg8BSehz4e")}
    firebase
      .database()
      .ref("bbs/data/" + bbskey)
      .set({});
    // this.bbs.pop();
  }
  outBbs(userkey, bbskey) {
    //클라이언트가 해당 방을 나감, 또는 추방.
    //bbs 데이터에서 고객명 지우기.
    firebase
      .database()
      .ref("bbs/data/" + bbskey + "/l/" + userkey)
      .set(0);
    firebase
      .database()
      .ref("user/data/" + userkey + "/c/" + bbskey)
      .set(0); //1은 방들어갈때 적용
  }
  changeBbsValue(bbskey, props, value) {
    //props는 a => available이런식
    firebase
      .database()
      .ref("bbs/data/" + bbskey + "/" + props)
      .set(value);
  }
  getBbs(bbskey) {
    let result = {};
    firebase
      .database()
      .ref("bbs/data/" + bbskey)
      .once("value", (s) => {
        result = s.val();
        return JSON.stringify(result);
      });
  }
  setbbs(result) {
    this.bbs = result;
  }
  async setbbsnow(bbskey) {
    firebase
      .database()
      .ref("bbs/data/" + bbskey)
      .once("value", (snapshot) => {
        this.bbsnow = JSON.parse(JSON.stringify(snapshot));
      });
  }
  async setbbsuser(userlist) {
    let result = [];
    await Object.keys(userlist).map(
      async (key) =>
        await firebase
          .database()
          .ref("user/data/" + key)
          .once("value", (s) => {
            result.push(JSON.parse(JSON.stringify(s.val())));
            this.bbsuser = result;
          })
    );
  }
}
