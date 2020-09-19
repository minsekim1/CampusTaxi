import React, { Component, useState, useEffect } from "react";
import campusStyle from "style";
import crown from "image/crown.png";
import { Button } from "react-native-elements";
import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import { Searchbar } from "react-native-paper";
import MapView, {
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
function MapScreen(props) {
  const [location, setLocation] = useState(null);
  const [startMarker, setSMarket] = useState(null);
  const [endMarker, setEMarket] = useState(null);
  const [firstQuery, setFirstQuery] = useState("");
  const [isStart, setStart] = useState(true);
  const [region, setRegion] = useState({
    latitude: 37.64116,
    longitude: 127.106604,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const pinColor = "blue";
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

  return (
    <>
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
            type={isStart ? "outline" : "clear"}
            buttonStyle={
              isStart
                ? { backgroundColor: "rgba(255, 255, 255, 0.8)" }
                : { backgroundColor: "rgba(100, 100, 100, 0.5)" }
            }
            title="출발지"
            onPress={() => setStart(true)}
          />
          <Button
            containerStyle={{ width: "30%" }}
            type={!isStart ? "outline" : "clear"}
            buttonStyle={
              !isStart
                ? { backgroundColor: "rgba(255, 255, 255, 0.8)" }
                : { backgroundColor: "rgba(100, 100, 100, 0.5)" }
            }
            title="도착지"
            onPress={() => setStart(false)}
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
