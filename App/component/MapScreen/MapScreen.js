import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import campusStyle from "style";
import { bbsStore, userStore, anotherStore } from "store";
import { Button } from "react-native-elements";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Searchbar } from "react-native-paper";
import MapView, {
  Polyline,
  Overlay,
  AnimatedRegion,
  Animated,
  Marker,
} from "react-native-maps";
import * as Location from "expo-location";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

import Constants from "expo-constants";
function MapScreen(props, { navigation }) {
  //console.log(navigation);
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
  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      setErrorMsg(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }
        let location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      })();
    }
  }, []);
  const [place, setPlace] = useState(null);
  async function placeSearch(keyword) {
    if (typeof keyword != "string") keyword = keyword.nativeEvent.text;
    let url =
      "https://dapi.kakao.com/v2/local/search/keyword.json?page=1&size=4&query=" +
      keyword +
      "&x=" +
      region.longitude +
      "&y=" +
      region.latitude +
      "&radius=20000";
    //두번째api:"https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=127.106604&y=37.64116";
    let result = await fetch(url, {
      method: "post",
      headers: new Headers({
        Authorization: "KakaoAK 2ffd2e667110415efb87f207cb33b8be",
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.documents == "") {
          setPlace(null);
        } else {
          setPlace(responseData.documents);
        }
      })
      .done();
  }
  function placeSelect(data) {
    setFirstQuery(data.place_name);
    setPlace(null);
    setRegion({
      latitude: Number(data.y),
      longitude: Number(data.x),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    if (isStart) {
      setSMarket({
        latitude: Number(data.y),
        longitude: Number(data.x),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      if (startMarker != null && endMarker != null) search();
    } else {
      setEMarket({
        latitude: Number(data.y),
        longitude: Number(data.x),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
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

  function search() {
    if (startMarker != null && endMarker != null) {
      //https://api.mapbox.com/directions/v5/mapbox/walking/${출발지 longitude},${출발지latitude};${목적지 longitude},${목적지 latitude}?geometries=geojson&access_token=${Your_mapbox_Access_Token}
      axios(
        "https://api.mapbox.com/directions/v5/mapbox/walking/" +
          startMarker.longitude +
          "," +
          startMarker.latitude +
          ";" +
          endMarker.longitude +
          "," +
          endMarker.latitude +
          "?geometries=geojson&access_token=pk.eyJ1IjoibWluczk3IiwiYSI6ImNrZjljZnR2OTA2bGQyeHBleWQ3dnI4NzQifQ.JRKbjTvJM8a7wjqevYDReg"
      ).then((res) => {
        let coords = res.data.routes[0].geometry.coordinates.map((item, i) => {
          return { latitude: item[1], longitude: item[0] };
        });
        let start = coords[0];
        let end = coords[coords.length - 1];
        setRSMarket(start);
        setREMarket(end);
        setPath(coords);
        setDisplayData([
          res.data.routes[0].distance,
          res.data.routes[0].duration,
          anotherStore.taxiCost(
            res.data.routes[0].duration,
            res.data.routes[0].duration
          ),
        ]);
        anotherStore.fetchKakaomap();
      });
    } else {
      alert("출발지 혹은 도착지 버튼을 누르고 지도 상에 위치를 클릭해주세요.");
    }
  }
  //택시 거리, 예상 금액, 장소선택 창보여줌
  const [diplayData, setDisplayData] = useState(null);

  return (
    <>
      <View style={{ alignItems: "center" }}>
        <Searchbar
          style={{
            marginTop: 30,
            width: "80%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
          onCancel={() => alert("asd")}
          placeholder="출발지 혹은 도착지를 누른후 검색해주세요."
          onChangeText={(query) => changeText(query)}
          value={firstQuery}
          onSubmitEditing={(r) => placeSearch(r)}
        />
        {place != null ? (
          <View
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
              ? place.map((data, i) => (
                  <TouchableOpacity key={i} onPress={() => placeSelect(data)}>
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
            width: "80%",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>카카오T택시 기준</Text>

          <Text>거리: 약 {diplayData != null ? diplayData[1] : null} m</Text>
          <Text>시간: 약 {diplayData != null ? diplayData[0] : null} 초</Text>
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
              anotherStore.setPlacestart(realStartMarker);
              anotherStore.setPlaceend(realEndMarker);
              //console.log(navigation);
              //this.navigation.goBack();
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
        onRegionChangeComplete={(region) => setRegion(region)}
        onPress={(a) => {
          if (isStart) {
            setSMarket({
              latitude: a.nativeEvent.coordinate.latitude,
              longitude: a.nativeEvent.coordinate.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          } else {
            setEMarket({
              latitude: a.nativeEvent.coordinate.latitude,
              longitude: a.nativeEvent.coordinate.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          }
        }}
      >
        {startMarker != null ? (
          <Marker coordinate={startMarker} title={"출발점"} description={""} />
        ) : null}
        {endMarker != null ? (
          <Marker
            pinColor={pinColor}
            coordinate={endMarker}
            title={"도착점"}
            description={""}
          />
        ) : null}
        {realStartMarker != null ? (
          <Marker
            pinColor={pinColorRS}
            coordinate={realStartMarker}
            title={"실제출발점"}
            description={"방 생성시 들어가는 실제 출발점입니다."}
          />
        ) : null}
        {realEndMarker != null ? (
          <Marker
            pinColor={pinColorRE}
            coordinate={realEndMarker}
            title={"실제도착점"}
            description={"방 생성시 들어가는 실제 도착점입니다."}
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

export default MapScreen;
