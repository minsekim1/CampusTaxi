import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
//속성 :
//text = 해당 텍스트 출력
//type = h1 : 큰제목, blank : 빈 페이지 시험용

//예시 :
//import MyText from '../Components/myText';
//<MyText text="텍스트출력" type="h1" />

function MyText(p) {
  const styles = StyleSheet.create({
    default: {
      fontSize: 18,
      marginBottom: p.marginBottom,
      color: p.color,
    },
    h1: {
      fontSize: 24,
      marginBottom: p.marginBottom,
      color: p.color,
    },
    blank: {
      width: "100%",
      height: "100%",
      backgroundColor: "#46c3ad",
      color: p.color,
    },
    smallwhite: {
      fontSize: 17,
      fontWeight: "bold",
      color: "white",
    },
    whiteInput: {
      fontSize: 13,
      color: "black",
      backgroundColor: "white",
      padding: 10,
      borderRadius: 3,
      marginTop: 8,
      width: wp(80),
    },
    small: {
      fontSize: 17,
      fontWeight: "bold",
      color: p.color,
    },
    subtitle: {
      fontSize: 11,
      color: "#7D849B",
      marginBottom: p.marginBottom,
    },
  });

  if (p.type == "" || p.type == null) {
    return <Text style={styles.default}>{p.text}</Text>;
  } else if (p.type == "h1") {
    return <Text style={styles.h1}>{p.text}</Text>;
  } else if (p.type == "blank") {
    return <Text style={styles.blank}>{p.text}</Text>;
  } else if (p.type == "smallwhite") {
    return <Text style={styles.smallwhite}>{p.text}</Text>;
  } else if (p.type == "small") {
    return <Text style={styles.small}>{p.text}</Text>;
  } else if (p.type == "whiteInput") {
    return <Text style={styles.whiteInput}>{p.text}</Text>;
  } else if (p.type == "subtitle") {
    return <Text style={styles.subtitle}>{p.text}</Text>;
  } else {
    return <Text style={styles.default}>No Text Type !</Text>;
  }
}

export default MyText; // Don’t forget to use export default!
