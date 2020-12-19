import React, { useState, useEffect } from "react";
import { Button } from "react-native-elements";
import { Text, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import MapView, { Polyline, Marker } from "react-native-maps";
import Constants from "expo-constants";
//import * as Location from "expo-location";

export default function selectPlace(props, { navigation }) {
  //#region 변수&함수
  const bbstype = props.route.params.bbstype;
  const createRoomCategory = props.route.params.createRoomCategory;
  const createRoompersonmax = props.route.params.createRoompersonmax;
  const createRoomGender = props.route.params.createRoomGender;
  const date = props.route.params.date;

  const [myplace, setMyPlace] = useState(null);
  const [startMarker, setSMarket] = useState(null);
  const [endMarker, setEMarket] = useState(null);
  const [realStartMarker, setRSMarket] = useState(null);
  const [realEndMarker, setREMarket] = useState(null);

  const [firstQuery, setFirstQuery] = useState("");
  const [isStart, setStart] = useState(true);
  const [path, setPath] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.64116,
    longitude: 127.106604,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  // red, tomato, orange, yellow, green, gold, wheat, linen, tan, blue, aqua, teal, violet, purple, indigo, turquoise, navy and plum 만 가능
  const pinColor = "blue";
  const pinColorRS = "orange";
  const pinColorRE = "turquoise";
  // async function getMyPlace() {
  //   let { coords } = await Location.getCurrentPositionAsync({});
  //   setMyPlace({
  //     latitude: coords.latitude,
  //     longitude: coords.longitude,
  //     latitudeDelta: 0.01,
  //     longitudeDelta: 0.01,
  //   });
  //   setRegion({
  //     latitude: coords.latitude,
  //     longitude: coords.longitude,
  //     latitudeDelta: 0.01,
  //     longitudeDelta: 0.01,
  //   });
  //   return coords;
  // }
  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      alert("Oops, this will not work on Sketch in an Android emulator. Try it on your device!");
    } else {
      (async () => {
        // let { status } = await Location.requestPermissionsAsync();
        // if (status === 'granted') {
        //   getMyPlace();
        // } else {
          setRegion({
            latitude: 37.64116,
            longitude: 127.106604,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        // }
      })();
    }
  }, [navigation]);

  const [place, setPlace] = useState(null);
  //네이버 택시요금/거리/시간/경로
  async function fetchNaverDirect5(start, end) {
    let result = null;
    let url = "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=" + start.longitude + "," + start.latitude + "&goal=" + end.longitude + "," + end.latitude + "&option=1";
    await fetch(url, {
      headers: {
        "X-Ncp-Apigw-Api-Key": "rjPLuetFr7RwrIltZFNwfJHFrVeDK7jM1qDUXxOx",
        "X-Ncp-Apigw-Api-Key-Id": "6a3i8h7n6z",
      },
    }).then((response) => response.json()).then((json) => {
      let re = json.route.traoptimal[0].summary;
      result = {
        distance: re.distance, duration: re.duration, taxiFare: re.taxiFare, path: json.route.traoptimal[0].path,
      };
    });
    return result;
  }
  function placeSearch(keyword) {
    if (typeof keyword != "string") keyword = keyword.nativeEvent.text;
    let url =
      "https://dapi.kakao.com/v2/local/search/keyword.json?page=1&size=4&query=" +
      keyword + "&x=" + region.longitude + "&y=" + region.latitude + "&radius=20000";
    fetch(url, {
      method: "post",
      headers: new Headers({
        Authorization: "KakaoAK 2ffd2e667110415efb87f207cb33b8be",
      }),
    }).then((response) => response.json()).then((responseData) => {
      if (responseData.documents == "") setPlace(null);
      else setPlace(responseData.documents);
    }).done();
  }
  function placeSelect(data) {
    setRegion({
      latitude: Number(data.y),
      longitude: Number(data.x),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      name: data.place_name,
    });
    setFirstQuery(data.place_name);
    setPlace(null);
    if (isStart) {
      setSMarket({
        latitude: Number(data.y),
        longitude: Number(data.x),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: data.place_name,
      });
      if (startMarker != null && endMarker != null) search();
    } else {
      setEMarket({
        latitude: Number(data.y),
        longitude: Number(data.x),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        name: data.place_name,
      });
      if (startMarker != null && endMarker != null) search();
    }
  }
  function changeText(query) {
    setFirstQuery(query);
    if (query != "") {
      placeSearch(query);
    } else {
      setPlace(null);
    }
  }
  //네이버  좌표중심 주소변환
  async function fetchNaverReverseGeocode(pos) {
    let result = null;
    let url =
      "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=" +
      pos.longitude + "," + pos.latitude +
      "&/sourcecrs=epsg:4326&output=json&orders=roadaddr,legalcode,admcode,addr";
    await fetch(url, {
      headers: {
        "X-Ncp-Apigw-Api-Key": "rjPLuetFr7RwrIltZFNwfJHFrVeDK7jM1qDUXxOx",
        "X-Ncp-Apigw-Api-Key-Id": "6a3i8h7n6z",
      },
    })
      .then((response) => response.json()).then((json) => {
        let re = json.results[0].region;
        result = re.area1.name + re.area2.name + re.area3.name + re.area4.name;
      });
    return result;
  }

  function search() {
    if (startMarker != null && endMarker != null) {
      fetchNaverDirect5(startMarker, endMarker).then(async (r) => {
        setDisplayData([r.distance, r.duration, r.taxiFare]);
        let coords = await r.path.map((item, i) => {
          return { latitude: item[1], longitude: item[0] };
        });
        let start = coords[0];
        let end = coords[coords.length - 1];
        setRSMarket({
          latitude: start.latitude,
          longitude: start.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          name: startMarker.name,
        });
        setREMarket({
          latitude: end.latitude,
          longitude: end.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          name: endMarker.name,
        });
        setPath(coords);
      });
    } else {
      alert("출발지 혹은 도착지 버튼을 누르고 지도 상에 위치를 클릭해주세요.");
    }
  }
  //택시 거리, 예상 금액, 장소선택 창보여줌
  const [diplayData, setDisplayData] = useState(null);
  //#endregion
  return (
    <>
      <View style={{ alignItems: "center" }}>
        <TextInput style={{
          marginTop: 30,
          width: "80%",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
          placeholder="출발지 혹은 도착지를 누른후 검색해주세요."
          onChangeText={(query) => changeText(query)}
          value={firstQuery}
          onSubmitEditing={(r) => placeSearch(r)}
        />
        {place != null ? (
          <View
            key={"View"}
            style={{
              width: "80%",
              padding: 3,
              position: "absolute",
              top: 80,
              zIndex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            {place != null
              ? place.map((data) => (
                <TouchableOpacity
                  key={String(data.place_url)}
                  onPress={() => placeSelect(data)}>
                  <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: "row" }} numberOfLines={1}>
                      <Text style={{ fontWeight: "bold" }}>
                        {data.place_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "gray",
                          marginLeft: 5,
                          textAlignVertical: "center",
                        }}
                      >
                        {data.category_name}
                      </Text>
                    </View>
                    <Text style={{ color: "#555555" }}>
                      {data.road_address_name}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "rgb(0,162,232)" }}>
                        {data.phone}
                      </Text>
                      <Text style={{ color: "#555555" }}>
                        {data.distance}m
                        </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
              : null}
          </View>
        ) : null}
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            width: "80%",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            containerStyle={{ width: "30%" }}
            type={!isStart ? "outline" : "clear"}
            buttonStyle={
              !isStart
                ? { backgroundColor: "rgba(255, 255, 255, 0.8)" }
                : { backgroundColor: "rgba(100, 100, 100, 0.5)" }
            }
            title="출발지"
            onPress={() => setStart(true)}
          />
          <Button
            containerStyle={{ width: "30%" }}
            type={isStart ? "outline" : "clear"}
            buttonStyle={
              isStart
                ? { backgroundColor: "rgba(255, 255, 255, 0.8)" }
                : { backgroundColor: "rgba(100, 100, 100, 0.5)" }
            }
            title="도착지"
            onPress={() => setStart(false)}
          />
          <Button
            containerStyle={{ width: "30%" }}
            type={!isStart ? "outline" : "clear"}
            buttonStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
            title="경로탐색"
            onPress={() => search()}
          />
        </View>
      </View>

      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          alignItems: "center",
          padding: 10,
        }}
      >
        <View
          style={{
            width: "80%",
            padding: 3,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            alignItems: "center",
            borderRadius: 40,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>네이버맵 기준</Text>
          <Text>
            거리: 약
            {diplayData != null ? (diplayData[0] / 1000).toFixed(1) : null} km
          </Text>
          <Text>
            시간: 약
            {diplayData != null ? (diplayData[1] / 60000).toFixed(1) : null} 분
          </Text>
          <Text>* 시간은 교통량에 따라 달라질 수 있습니다.</Text>
          <Text>
            예상요금: 약 {diplayData != null ? diplayData[2] : null} 원
          </Text>
          <Text>택시이미지</Text>
          <Button
            containerStyle={{ width: "30%" }}
            type="outline"
            buttonStyle={{ backgroundColor: "rgba(255, 255, 255, 0.0)" }}
            title="장소 선택하기"
            onPress={() => {
              if (realStartMarker != null && realEndMarker != null) {
                props.navigation.push('방 만들기', {
                  bbstype: bbstype, start: realStartMarker, end: realEndMarker
                  , createRoomCategory: createRoomCategory
                  , createRoompersonmax: createRoompersonmax
                  , createRoomGender: createRoomGender
                  , date: date
                  , cost: diplayData != null ? diplayData[2] : null

                });
              } else {
                alert(
                  "출발지 혹은 도착지를 눌러 지도에서 선택하고 경로탐색 버튼을 눌러 경로를 찾아주세요."
                );
              }
            }}
          />
        </View>
      </View>
      <MapView
        style={{
          flex: 1,
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
        region={region}
        onRegionChangeComplete={(r) => setRegion(r)}
        onPress={(a) => {
          let pos = a.nativeEvent.coordinate;
          if (isStart) {
            fetchNaverReverseGeocode(pos).then((r) =>
              setSMarket({
                latitude: pos.latitude,
                longitude: pos.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
                name: r,
              })
            );
          } else {
            fetchNaverReverseGeocode(pos).then((r) =>
              setEMarket({
                latitude: pos.latitude,
                longitude: pos.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
                name: r,
              })
            );
          }
        }}
      >
        {startMarker != null ? (
          <Marker
            coordinate={startMarker}
            title={"출발점"}
            description={
              "장소이름:" +
              startMarker.name +
              "장소위치:[" +
              startMarker.latitude.toFixed(3) +
              "," +
              startMarker.longitude.toFixed(3) +
              "]"
            }
          />
        ) : null}
        {endMarker != null ? (
          <Marker
            pinColor={pinColor}
            coordinate={endMarker}
            title={"도착점"}
            description={
              "장소이름:" +
              endMarker.name +
              "장소위치:[" +
              endMarker.latitude.toFixed(3) +
              "," +
              endMarker.longitude.toFixed(3) +
              "]"
            }
          />
        ) : null}
        {realStartMarker != null ? (
          <Marker
            pinColor={pinColorRS}
            coordinate={realStartMarker}
            title={"실제출발점"}
            description={
              "방 생성시 들어가는 실제 출발점입니다." +
              "장소이름:" +
              realStartMarker.name +
              "장소위치:[" +
              realStartMarker.latitude.toFixed(3) +
              "," +
              realStartMarker.longitude.toFixed(3) +
              "]"
            }
          />
        ) : null}
        {realEndMarker != null ? (
          <Marker
            pinColor={pinColorRE}
            coordinate={realEndMarker}
            title={"실제도착점"}
            description={
              "방 생성시 들어가는 실제 도착점입니다." +
              "장소이름:" +
              realEndMarker.name +
              "장소위치:[" +
              realEndMarker.latitude.toFixed(3) +
              "," +
              realEndMarker.longitude.toFixed(3) +
              "]"
            }
          />
        ) : null}
        {path != null ? (
          <Polyline
            coordinates={path} // 연결될 선들의 좌표
            strokeColor="red"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={4}
          />
        ) : null}
      </MapView>
    </>
  );
}