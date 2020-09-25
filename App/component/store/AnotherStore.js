// import { bbsStore, userStore, anotherStore } from "store";
export default class AnotherStore {
  @observable placeStart = null;
  @observable placeEnd = null;
  @observable test = null;
  placeDB = (name) => firebase.database().ref("place/data/" + name);
  test$DB = (name) => firebase.database().ref("test/data/" + name);

  async servertime() {
    let time = null;
    await fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
      .then((res) => res.json())
      .then((result) => (time = result));
    time = time.datetime.slice(0, 19); //양식: 2020-09-09T10:47:32
    return time;
  }
  //let servertime = await anotherStore.servertime();
  //new Date(servertime)
  //2020-09-09T10:47:32.000Z
  setPlacestart(val) {
    this.placeStart = val;
  }
  setPlaceend(val) {
    this.placeEnd = val;
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

  //택시요금 계산함수
  taxiCost(duration, distance) {
    if (distance < 2000) {
      return 3800;
    } else {
      //100 * (duration / 31)
      return 3800 + 100 * (distance / 132);
    }
  }
  //카카오 택시요금/거리/시간/경로
  fetchKakaomap(startplace, endplace) {
    axios(
      "https://map.kakao.com/?map_type=TYPE_MAP&target=car&rt=523464%2C1151120%2C516643%2C1144136&rt1=%EC%82%BC%EC%9C%A1%EB%8C%80%ED%95%99%EA%B5%90&rt2=%ED%83%9C%EB%A6%89%EC%9E%85%EA%B5%AC%EC%97%AD+7%ED%98%B8%EC%84%A0&rtIds=7927244%2CSES2719&rtTypes=PLACE%2CSUBWAYSTATION"
    ).then((res) => {
      res = res.data;
      let find1 = "택시";
      let pos = res.indexOf(find1);
      console.log("pos" + pos);
      console.log(res.slice(pos, pos + 200));
    });
  }
}
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { observable } from "mobx";
import "mobx-react-lite/batchingForReactDom";
const firebase = require("firebase");
