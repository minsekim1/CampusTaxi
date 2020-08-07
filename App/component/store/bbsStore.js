import { observable } from "mobx";
const firebase = require("firebase");
// import BbsStore from "store/bbsStore";

class BbsStore {
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
  //EXAMPLE: onPress={() => BbsStore.handleAddBbs(2, 3, 4, 5, 6, 7, 8)}
  addBbs( //c, g, h, i, j, k, n
    bbstype,
    endplace,
    gender,
    leadername,
    meetingdate,
    personmax,
    startplace
  ) {
    //시간 가져오기
    fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
      .then((res) => res.json())
      .then((result) => {
        const datatime =
          result.datetime.slice(0, 21) + result.datetime.slice(26, 32); //밀리초제거

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
        let newkey = firebase.database().ref("bbs/data").push().key;
        if (newkey != null) {
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
          firebase.database().ref("bbs/data").push(newBbs);
          this.bbs.push(newBbs);
        }
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

export default new BbsStore();
