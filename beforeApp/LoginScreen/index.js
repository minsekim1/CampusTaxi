import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Button } from "react-native";

const LoginScreen: () => React$Node = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>로그인 화면</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp("5%"),
    backgroundColor: "white",
  },
  wrapContent: {
    width: wp("90%"),
    height: wp("90%"),
    paddingBottom: wp("5%"),
  },
  content: {
    width: "100%",
    height: "100%",
    backgroundColor: "#46c3ad",
  },
});

export default LoginScreen;
