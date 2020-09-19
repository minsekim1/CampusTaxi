import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import campusStyle from "style";
import crown from "image/crown.png";
import { Button } from "react-native-elements";
import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import { Searchbar } from "react-native-paper";
import MapView, {
  Polyline,
  Overlay,
  AnimatedRegion,
  Animated,
  Marker,
} from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      onSubmitEditing={(r) => {
        axios(
          "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=%EC%8A%A4%ED%83%80&key=AIzaSyBVIfNVsdQk6J56bD4CwZSPDyYlxF_XBe0&location=37.532600,127.024612&radius=2000&types=establishment"
        ).then((res) => console.log(res));
      }}
      query={{
        key: "AIzaSyB8izLhjVNePmGIEeSRnohWsoMMOThhOQ4",
        language: "ko",
      }}
    />
  );
};
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
function MapScreen(props) {
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
  function placeSearch(keyword) {}
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
      });
    } else {
      alert("출발지 혹은 도착지 버튼을 누르고 지도 상에 위치를 클릭해주세요.");
    }
  }
  return (
    <>
      <GooglePlacesInput />
      <View style={{ alignItems: "center" }}>
        <Searchbar
          style={{
            marginTop: 30,
            width: "80%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
          placeholder="Search"
          onChangeText={(query) => setFirstQuery(query)}
          value={firstQuery}
          //onSubmitEditing={() => ()}
        />
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
        <Text
          style={{
            flex: 1,
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 2,
          }}
        >
          asd
        </Text>
      </MapView>
    </>
  );
}

export default MapScreen;
