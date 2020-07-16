import React, { Component, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
// import MaterialIcon from "react-native-vector-icons/dist/MaterialIcons";
import "react-native-gesture-handler";
import crown from "image/crown.png";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  SectionList,
  Linking,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

function TestFunc(props) {
  alert(JSON.stringify(this));
  useEffect(() => {
    // thisSetT(22);
  }, []);

  return (
    <View>
      <Text>Hello, I am {props.t}!</Text>
    </View>
  );
}

export default TestFunc;
