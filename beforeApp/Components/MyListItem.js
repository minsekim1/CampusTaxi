import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
//속성 :
//type = chat

//예시
//Import MyListItem from '../Components/MyListItem';
//<MyListItem type="" />

//p => props
function MyListItem(p) {
  const widthResponsive = p.width == null ? 60 : p.width;

  if (p.type == "" || p.type == null || p.type == "chat") {
    return <Text />;
  } else {
    return <Text />;
  }
}
const styles = StyleSheet.create({});
export default MyListItem; // Don’t forget to use export default!
