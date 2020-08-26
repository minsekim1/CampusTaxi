// import { bbsStore, userStore, anotherStore } from "store";
export default class AnotherStore {
  @observable placeStart = null;
  @observable placeEnd = null;
  @observable test = null;
  placeDB = (name) => firebase.database().ref("place/data/" + name);
  test$DB = (name) => firebase.database().ref("test/data/" + name);

  getPlaceOnce() {
    this.placeDB("endplace").once("value", (snap) => {
      this.array(snap).then((r) => (this.placeEnd = r));
    });

    this.placeDB("startplace").once("value", (snap) => {
      this.array(snap).then((r) => (this.placeStart = r));
      /*해당 주석 부분은 위의 this.array 와 결과가 같습니다.
      let arr = [];
      snapshot.forEach((snap) => {
        arr.push(snap.key);
      });*/
    });
  }
  /*
  //async로 시작하는 함수는 bbsDB와 on으로 실시간연동이 되어있는 것을 뜻합니다.
  asynctest() {
    //예시1 bbsDB를 이용하여 firebase에서 데이터를 가져옵니다.
    //on은 실시간 연동을 의미합니다.
    this.test$DB("").on("value", (snap) => {
      this.test = snap.val();
    });
  }
*/
  //jsonToArray
  async array(snap) {
    let arr = [];
    snap.forEach((i) => {
      arr.push(i.key);
    });
    return arr;
  }
  print(value) {
    if (value == "place") alert(JSON.stringify(this.place));
    else if (value == "test") alert(JSON.stringify(this.test));
  }
  //시간함수입니다. 로컬(한국시간)과 글로벌(국제표준시)를 바꾸어줍니다.
  //_getLocaleStrting => toLocal
    function toLocal(date) {
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
}

import AsyncStorage from "@react-native-community/async-storage";
import { observable } from "mobx";
import "mobx-react-lite/batchingForReactDom";
const firebase = require("firebase");
