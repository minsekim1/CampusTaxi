import AsyncStorage from "@react-native-community/async-storage";
import { observable } from "mobx";
import "mobx-react-lite/batchingForReactDom";
const firebase = require("firebase");
export default class BbsStore {
  @observable bbs = [];
  @observable bbsnow = []; //현재 접속중인 bbs의 정보
  @observable bbsuser = []; //접속중인 bbs안에 있는 유저들의 정보
  @observable selectedbbs = [];
  @observable test = []; //테스트

  bbsDB = (name) => firebase.database().ref("bbs/data/" + name);
  userDB = (name) => firebase.database().ref("user/data/" + name);
  //async로 시작하는 함수는 bbsDB와 on으로 실시간연동이 되어있는 것을 뜻합니다.
  asyncAllBbs() {
    this.bbsDB("").on("value", (snap) =>
      this.val(snap).then((r) => (this.bbs = r))
    );
  }

  addBbs(c, g, h, i, j, k, n, userkey) {
    //시간 가져오기
    fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
      .then((res) => res.json())
      .then((result) => {
        //밀리초제거
        const datatime =
          result.datetime.slice(0, 21) + result.datetime.slice(26, 32);
        const date = this.toLocal(datatime).slice(0, 10);
        let newBbs = {
          a: 1,
          c: c,
          d: {
            "-MA_aaaaa": {
              da: "-MA_aaaaa",
              db: "SYSTEM",
              dc: datatime,
              dd: date + " 방이 생성되었습니다.",
            },
          },
          f: datatime,
          g: g,
          h: h,
          i: i,
          j: j,
          k: k,
          m: 1,
          n: n,
        };
        let newkey = this.bbsDB("").push(newBbs).key;
        this.bbsDB(newkey + "/b").set(newkey);
        // 채팅데이터에 유저키 추가
        this.bbsDB(newkey + "/l/" + userkey).set(1);
        // 유저 데이터에 새로운 방 추가
        this.userDB(userkey + "/c/" + newkey).set(1);
      });
  }
  //#endregion
  // Hide bbs : 클라이언트에게 숨기기만함
  hideBbs(bbskey) {
    this.bbsDB(bbskey + "/a").set(0);
  }
  // Remove bbs : 데이터를 완전히 지움
  removeBbs(bbskey) {
    this.bbsDB(bbskey).set({});
  }
  outBbs(userkey, bbskey) {
    //클라이언트가 해당 방을 나감, 또는 추방.
    this.bbsDB(bbskey + "/l/" + userkey).set(0);
    //bbs 데이터에서 고객명 지우기.
    this.userDB(userkey + "/c/" + bbskey).set(0);
  }
  changeBbsValue(bbskey, props, value) {
    this.bbsDB(bbskey + "/" + props).set(value);
  }
  getBbs(bbskey) {
    this.bbsDB(bbskey).once("value", (snap) =>
      this.val(snap).then((r) => {
        return r;
      })
    );
  }

  async setbbsnow(bbskey) {
    this.bbsDB(bbskey).once("value", (snap) => (this.bbsnow = snap.val()));
  }

  async setbbsuser(userlist) {
    let temp = [];
    await Object.keys(userlist).map(
      async (key) =>
        await this.userDB(key)
          .once("value", (snap) => {
            temp.push(snap);
          })
          .then(() => {
            this.bbsuser = temp;
          })
    );
  }

  print(value) {
    if (value == "bbs") alert(JSON.stringify(this.bbs));
    else if (value == "bbsnow") alert(JSON.stringify(this.bbsnow));
    else if (value == "bbsuser") alert(JSON.stringify(this.bbsuser));
    else if (value == "selectedbbs") alert(JSON.stringify(this.selectedbbs));
    else if (value == "test") alert(JSON.stringify(this.test));
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
  //시간함수입니다. 로컬(한국시간)과 글로벌(국제표준시)를 바꾸어줍니다.
  //_getLocaleStrting => toLocal
  toLocal(date) {
    const localDate = new Date(date.toString());
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = week[localDate.getDay()];
    const result =
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
    return result;
  }
  //#endregion store공통함수
}
