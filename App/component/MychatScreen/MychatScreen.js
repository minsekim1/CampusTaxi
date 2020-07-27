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
      roomList: [],
      userkey: "-MBRNLe85baaaaaaaab",
      tempList: [],
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
          firebase
            .database()
            .ref("bbs/data/" + snap.val())
            .once("value", (snap2) => {
              let resultarr2 = [];
              snap2.forEach((snap2) => {
                resultarr2.push(snap2.val());
              });
              this.setState({ tempList: resultarr2 });
            });
        });
        alert(this.state.tempList);
        // this.setState({
        //   roomList: this.state.roomList.push(this.state.tempList),
        // });
      });
  }
  //#region Hooks & functions

  render() {
    return (
      <FlatList
        keyExtractor={(item) => item.b}
        data={this.state.roomList}
        renderItem={({ item, index }) => {
          if (item != null) {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("채팅방", {
                    bbskey: item.b,
                    gender: item.h,
                    leadername: item.i,
                    startplace: item.n,
                    endplace: item.g,
                    mygender: mygender,
                    myname: myname,
                    meetingdate: item.j,
                    personmember: item.i,
                    personmax: item.k,
                  });
                }}
                style={{ backgroundColor: "white", padding: 10 }}
              >
                <View style={campusStyle.View.row}>
                  <View
                    style={{
                      borderRadius: 100,
                      width: 62,
                      height: 62,
                      backgroundColor:
                        item.h == "woman"
                          ? "#DE22A3"
                          : item.h == "man"
                          ? "#55A1EE"
                          : "#3A3A3A",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={campusStyle.Text.middleBold}>{index}</Text>
                    <Text style={campusStyle.Text.middleBold}>
                      {item.h == "woman"
                        ? "여자"
                        : item.h == "man"
                        ? "남자"
                        : "남 여"}
                    </Text>
                  </View>
                  <View style={{ flex: 6 }}>
                    <View style={campusStyle.View.row}>
                      <Image
                        style={{ width: 23, height: 15, marginLeft: 10 }}
                        source={crown}
                      />
                      <Text>{item.i}</Text>
                    </View>
                    <Text style={{ marginLeft: 10 }}>출발지:{item.n}</Text>
                    <Text style={{ marginLeft: 10 }}>도착지:{item.g}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    {(() => {
                      if (item.k === item.m)
                        return (
                          <Text style={campusStyle.Text.red}>
                            {item.m}/{item.k}
                          </Text>
                        );
                      else
                        return (
                          <Text>
                            {item.m}/{item.k}
                          </Text>
                        );
                    })()}
                  </View>
                  <View style={{ flex: 3, alignItems: "center" }}>
                    <Text style={campusStyle.Text.grayDDark}>출발시간▼</Text>
                    <Text style={campusStyle.Text.grayDDark}>
                      {String(item.j)
                        .replace("년", "/")
                        .replace("월", "/")
                        .replace("일", "(")
                        .replace("요일", ")")
                        .replace("시", ":")
                        .replace("분", "")}
                    </Text>
                    <Text style={campusStyle.Text.grayDDark}>{item.a}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }
        }}
      />
    );
  }
}
