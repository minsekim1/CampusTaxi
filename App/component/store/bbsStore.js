import { observable } from "mobx";
const firebase = require("firebase");

class BbsStore {
  // "availableA" : "int",
  // "bbskeyB" : "String",
  // "bbstypeC" : "int",
  // "chatD" : [ [ null, "usernameB", "timeC", "sayD" ] ],
  // "costE" : [ [ "costkeyA", "costvalueB", "paymentC" ] ],
  // "createdateF" : "timestamp",
  // "endplaceG" : "int",
  // "genderH" : "int",
  // "leadernameI" : "string",
  // "meetingdateJ" : "timestamp",
  // "personmaxK" : "int",
  // "personmemberL" : "Array",
  // "personpresentM" : "int",
  // "startplaceN" : "int"
  @observable bbs = [];

  // Add bbs
  //EXAMPLE: onPress={() => BbsStore.handleAddBbs({ index })}
  handleAddBbs = () => {
    //c, g, h, i, j, k, l, n
    alert("a");
    //시간 가져오기
    fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
      .then((res) => res.json())
      .then((result) => {
        const datatime =
          result.datetime.slice(0, 21) + result.datetime.slice(26, 32);

        let newBbsKey = firebase.database().ref("bbs/data").push();

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
        // this.bbs.push({
        //   counterNum: 0,
        //   a: 1,
        //   b: newBbsKey.key,
        //   // c: c,
        //   d: {
        //     "-MA_aaaaa": {
        //       da: "-MA_aaaaa",
        //       db: "SYSTEM",
        //       dc: datatime,
        //       dd:
        //         _getLocaleStrting(datatime).slice(0, 10) +
        //         " 방이 생성되었습니다.",
        //     },
        //   },
        //   e: { ea: 0, eb: "" },
        //   f: datatime,
        //   // g: g,
        //   // h: h,
        //   // i: i,
        //   // j: j,
        //   // k: k,
        //   // l: l,
        //   m: 1,
        //   // n: n,
        // });
      });
  };

  // Remove bbs
  handleRemoveCounter = () => {
    this.bbs.pop();
  };

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
  // Update Bbs : firebase에서 bbs를 가져온다.
  handleUpdateBbs = async () => {
    let tempBbs = [];
    //bbs에서 데이터를 가져와서 firebase json 형식에서 flatlist하기 좋은 형식으로 키값을 JSON 안으로 넣는다.
    await firebase
      .database()
      .ref("bbs/data")
      .once("value", (snap) => {
        snap.forEach((item) => {
          // json을 string으로 바꾸었다가 다시 json 형식으로 표준화
          // 그냥하면 안됌
          tempBbs.push(JSON.parse(JSON.stringify(item)));
        });
      });
    this.bbs = tempBbs;
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
