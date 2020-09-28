// import { bbsStore, userStore, anotherStore } from "store";
export default class AnotherStore {
  @observable placeStart = null;
  @observable placeEnd = null;
  @observable myplace = null;
  placeDB = (name) => firebase.database().ref("place/data/" + name);

  placeInit() {
    this.placeStart = null;
    this.placeEnd = null;
  }
  async getMyPlace() {
    let location = await Location.getCurrentPositionAsync({});
    this.myplace = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }
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

  //네이버 택시요금/거리/시간/경로
  async fetchNaverDirect5(start, end) {
    let result = null;
    let url =
      "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=" +
      start.longitude +
      "," +
      start.latitude +
      "&goal=" +
      end.longitude +
      "," +
      end.latitude +
      "&option=1";
    await fetch(url, {
      headers: {
        "X-Ncp-Apigw-Api-Key": "rjPLuetFr7RwrIltZFNwfJHFrVeDK7jM1qDUXxOx",
        "X-Ncp-Apigw-Api-Key-Id": "6a3i8h7n6z",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        let re = json.route.traoptimal[0].summary;
        result = {
          distance: re.distance,
          duration: re.duration,
          taxiFare: re.taxiFare,
          path: json.route.traoptimal[0].path,
        };
      });
    return result;
  }
  //네이버  좌표중심 주소변환
  async fetchNaverReverseGeocode(pos) {
    let result = null;

    let url =
      "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=" +
      pos.longitude +
      "," +
      pos.latitude +
      "&/sourcecrs=epsg:4326&output=json&orders=roadaddr,legalcode,admcode,addr";
    await fetch(url, {
      headers: {
        "X-Ncp-Apigw-Api-Key": "rjPLuetFr7RwrIltZFNwfJHFrVeDK7jM1qDUXxOx",
        "X-Ncp-Apigw-Api-Key-Id": "6a3i8h7n6z",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        let re = json.results[0].region;
        result = re.area1.name + re.area2.name + re.area3.name + re.area4.name;
      });
    return result;
  }
}
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { observable } from "mobx";
import "mobx-react-lite/batchingForReactDom";
const firebase = require("firebase");
import * as Location from "expo-location";
