import AsyncStorage from "@react-native-community/async-storage";
import { observable } from "mobx";
const firebase = require("firebase");
// import BbsStore from "store/BbsStore";

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

  //#region  Add bbs
  /*
  EXAMPLE:
  onPress={() => BbsStore.addBbs(bbstype,endplace,gender,leadername,meetingdate,personmax,startplace,makerKey)}
  */
  addNum() {
    this.bbs = [22];
  }
  addNum2() {
    this.bbs = [33];
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
        let localDate = new Date(result);
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
          l: [leadername],
          m: 1,
          n: startplace,
        };
        let newkey = firebase.database().ref("bbs/data").push(newBbs).key;
        firebase
          .database()
          .ref("bbs/data/" + newkey + "/b")
          .set(newkey);
        this.bbs.push(newBbs);
        // 유저 데이터에 새로운 방 추가
        firebase
          .database()
          .ref("user/data/" + userkey + "/c")
          .push(newkey);
      });
  }

  // fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
  //   .then((res) => res.json())
  //   .then((result) => {
  //     const datatime =
  //       result.datetime.slice(0, 21) +
  //       result.datetime.slice(26, 32);
  //     const localtime = _getLocaleStrting(date);
  //     //파이어베이스에 데이터를 올립니다. push
  //     let newBbsKey = firebase
  //       .database()
  //       .ref("bbs/data")
  //       .push();
  //     //파이어베이스 임시 키값을 현재 키값으로 변경
  //     let newRoom = {
  //       a: "출발 대기", //available0
  //       b: newBbsKey.key, //bbskey1
  //       c: createRoomCategory, //bbstype2
  //       d: {
  //         "-MA_aaaaa": {
  //           da: "-MA_aaaaa",
  //           db: "SYSTEM",
  //           dc: datatime,
  //           dd:
  //             localtime.slice(0, 10) + " 방이 생성되었습니다.",
  //         },
  //       }, //chat3
  //       e: { ea: 0, eb: "" }, //cost4
  //       f: datatime, //createdate5
  //       g: createRoomendplace, //endplace6
  //       h: createRoomGender == 0 ? mygender : "all", //gender7
  //       i: myname, //leadername8
  //       j: localtime, //meetingdate9
  //       k: createRoompersonmax, //personmax10
  //       l: [userkey], //personmember11
  //       m: 1, //personpresent12
  //       n: createRoomstartplace, //startplace13
  //     };
  //     //바뀐 키값으로 다시 올리기
  //     firebase
  //       .database()
  //       .ref("bbs/data/" + newBbsKey.key)
  //       .set(newRoom);
  //     //roomList를 파이어베이스에 올린 버전으로 가져옵니다.
  //     firebase
  //       .database()
  //       .ref("bbs/data")
  //       .once("value", function (snapshot) {
  //         let resultRoom = [];
  //         snapshot.forEach(function (snap) {
  //           let item = snap.val();
  //           item.key = snap.key;
  //           resultRoom.push(item);
  //         });
  //         setRoomList(resultRoom);
  //       });
  //     // 유저 데이터에 새로운 방 추가
  //     firebase
  //       .database()
  //       .ref("user/data/" + userkey + "/c")
  //       .push(newBbsKey.key);
  //     setCreateRoomVisible(!isCreateRoomVisible);
  //   });

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
  changeBbsValue(bbskey, props, value) {
    //props는 a => available이런식
    firebase
      .database()
      .ref("bbs/data/" + bbskey + "/" + props)
      .set(value);
  }
  getBbs(bbskey) {
    //onPress={() => BbsStore.getBbs("-MDrAW9yVgYg8BSehz4e")}
    let result = {};
    firebase
      .database()
      .ref("bbs/data/" + bbskey)
      .once("value", (s) => {
        result = s.val();
        return JSON.stringify(result);
      });
  }

  printBbsStore() {
    alert(this.bbs);
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
    this.bbs = [
      ...this.bbs.slice(0, index),
      {
        counterNum: this.bbs[index].counterNum + 1,
      },
      ...this.bbs.slice(index + 1, this.bbs.length),
    ];
  };
  // Decrement counterNum
  handleDecrement = ({ index }) => {
    this.bbs = [
      ...this.bbs.slice(0, index),
      {
        counterNum: this.bbs[index].counterNum - 1,
      },
      ...this.bbs.slice(index + 1, this.bbs.length),
    ];
  };
}
