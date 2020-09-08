// import { bbsStore, userStore, anotherStore } from "store";
export default class AnotherStore {
  @observable placeStart = null;
  @observable placeEnd = null;
  @observable test = null;
  placeDB = (name) => firebase.database().ref("place/data/" + name);
  test$DB = (name) => firebase.database().ref("test/data/" + name);

  filterIntToString(value) {
    switch (value) {
      case 1:
        return "등교";
        break;
      case 2:
        return "하교";
        break;
      case 3:
        return "야작";
        break;
      case 4:
        return "독서실";
        break;
      case 5:
        return "PC방";
        break;
      case 6:
        return "놀이동산";
        break;
      case 7:
        return "클럽";
        break;
      case 8:
        return "스키장";
        break;
      case 9:
        return "오션월드";
        break;
      default:
        return null;
    }
  }
  filterStringToInt(string) {
    switch (string) {
      case "등교":
        return 1;
        break;
      case "하교":
        return 2;
        break;
      case "야작":
        return 3;
        break;
      case "독서실":
        return 4;
        break;
      case "PC방":
        return 5;
        break;
      case "놀이동산":
        return 6;
        break;
      case "클럽":
        return 7;
        break;
      case "스키장":
        return 8;
        break;
      case "오션월드":
        return 9;
        break;
      default:
        return null;
    }
  }
  getPlaceOnce() {
    this.placeDB("endplace").once("value", (snap) => {
      this.key(snap).then((r) => (this.placeEnd = r));
    });

    this.placeDB("startplace").once("value", (snap) => {
      this.key(snap).then((r) => (this.placeStart = r));
    });
  }

  print(value) {
    if (value == "place") alert(JSON.stringify(this.place));
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

import AsyncStorage from "@react-native-community/async-storage";
import { observable } from "mobx";
import "mobx-react-lite/batchingForReactDom";
const firebase = require("firebase");
