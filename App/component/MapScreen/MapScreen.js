import React, { Component, useState, useEffect } from "react";
import campusStyle from "style";
import crown from "image/crown.png";

import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import MapView, { Overlay } from "react-native-maps";

export default function MapScreen() {
  const [value, onChangeText] = React.useState("Useless Placeholder");
  return (
    <View>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Overlay
          image="https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"
          bounds={[
            { latitude: 40.712216, longitude: -74.22655 },
            { latitude: 40.773941, longitude: -74.12544 },
          ]}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchview: {
    position: "absolute",
    top: 100,
  },
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
