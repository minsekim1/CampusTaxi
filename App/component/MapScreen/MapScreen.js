import React, { Component, useState, useEffect } from "react";
import campusStyle from "style";
import crown from "image/crown.png";

import { StyleSheet, Text, View, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
export default function MapScreen({ route, navigation }) {
  const { url } = route.params;
  const [value, onChangeText] = React.useState("Useless Placeholder");
  return (
    <WebView
      source={{
        uri: url,
      }}
      style={{ marginTop: 20 }}
    />
  );
}
