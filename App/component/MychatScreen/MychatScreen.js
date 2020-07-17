import React, { Component, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Text,
} from "react-native";
import { Input, Badge } from "react-native-elements";
import campusStyle from "style";
import crown from "image/crown.png";
const firebase = require("firebase");

export default class MychatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomList: [{ "-MA": "-MA" }],
      userkey: "-MBRNLe85baaaaaaaaa",
    };
  }

  componentDidMount() {
    this.getMyChat();
    const interval = setInterval(() => this.getMyChat(), 10000);
  }
  getMyChat() {
    firebase
      .database()
      .ref("user/data/" + this.state.userkey + "/c")
      .once("value", (snap) => {
        let resultarr = [];
        snap.forEach((snap) => {
          resultarr.push(snap.val());
        });
        this.setState({ roomList: resultarr });
        alert(this.state.roomList);
      });
  }
  render() {
    return (
      <FlatList
        keyExtractor={(item, index) => index}
        data={this.state.roomList}
        keyExtractor={(item) => item.da}
        extraData={this.state}
        renderItem={({ item, index }) => {
          <Text>asd</Text>;
        }}
        // renderItem={({ item, index }) => {
        //   <TouchableOpacity
        //     onPress={() =>
        //       navigation.navigate("채팅방", {
        //         bbskey: item.b,
        //         gender: item.h,
        //         leadername: item.i,
        //         startplace: item.n,
        //         endplace: item.g,
        //         mygender: mygender,
        //         myname: myname,
        //       })
        //     }
        //     style={{ backgroundColor: "white", padding: 10 }}
        //   >
        //     <View style={campusStyle.View.row}>
        //       <View
        //         style={{
        //           borderRadius: 100,
        //           width: 62,
        //           height: 62,
        //           backgroundColor:
        //             item.h == "woman"
        //               ? "#DE22A3"
        //               : item.h == "man"
        //               ? "#55A1EE"
        //               : "#3A3A3A",
        //           justifyContent: "center",
        //           alignItems: "center",
        //         }}
        //       >
        //         <Text style={campusStyle.Text.middleBold}>{index}</Text>
        //         <Text style={campusStyle.Text.middleBold}>
        //           {item.h == "woman"
        //             ? "여자"
        //             : item.h == "man"
        //             ? "남자"
        //             : "남 여"}
        //         </Text>
        //       </View>
        //       <View style={{ flex: 6 }}>
        //         <View style={campusStyle.View.row}>
        //           <Image
        //             style={{ width: 23, height: 15, marginLeft: 10 }}
        //             source={crown}
        //           />
        //           <Text>{item.i}</Text>
        //         </View>
        //         <Text style={{ marginLeft: 10 }}>출발지:{item.n}</Text>
        //         <Text style={{ marginLeft: 10 }}>도착지:{item.g}</Text>
        //       </View>
        //       <View style={{ flex: 1 }}>
        //         {(() => {
        //           if (item.k === item.m)
        //             return (
        //               <Text style={campusStyle.Text.red}>
        //                 {item.m}/{item.k}
        //               </Text>
        //             );
        //           else
        //             return (
        //               <Text>
        //                 {item.m}/{item.k}
        //               </Text>
        //             );
        //         })()}
        //       </View>
        //       <View style={{ flex: 3, alignItems: "center" }}>
        //         <Text style={campusStyle.Text.grayDDark}>출발시간▼</Text>
        //         <Text style={campusStyle.Text.grayDDark}>
        //           {String(item.j)
        //             .replace("년", "/")
        //             .replace("월", "/")
        //             .replace("일", "(")
        //             .replace("요일", ")")
        //             .replace("시", ":")
        //             .replace("분", "")}
        //         </Text>
        //         <Text style={campusStyle.Text.grayDDark}>{item.a}</Text>
        //         <Badge
        //           textStyle={campusStyle.Badge.textStyle}
        //           value={0}
        //           status="warning"
        //         />
        //       </View>
        //     </View>
        //   </TouchableOpacity>;
        // }}
      />
    );
  }
}
