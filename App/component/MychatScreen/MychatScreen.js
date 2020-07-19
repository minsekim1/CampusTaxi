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
      varRoom: [],
      userkey: "-MBRNLe85baaaaaaaab",
    };
  }
  getMyChat() {
    firebase
      .database()
      .ref("user/data/" + this.state.userkey + "/c")
      .once("value", (snap) => {
        let resultarr = [];
        snap.forEach((snap) => {
          firebase //bbs에서 데이터를 가져와서 firebase json 형식에서 flatlist하기 좋은 형식으로 키값을 JSON 안으로 넣는다.
            .database()
            .ref("bbs/data/" + snap.val())
            .once("value", (snapshot) => {
              // ####

              alert(this.state.varRoom);
              snapshot.forEach((snapTemp) => {
                //하나의 방의 데이터를 순서대로 집어넣습니다.
                this.setState({ varRoom: "dsa" }); //임시로 하나의 방의 데이터 초기화합니다.
                // this.setState({
                // varRoom: this.state.varRoom.push(snapTemp.val()),
                // });
              });
              // ####
            });
        });
      });
  }
  componentDidMount() {
    this.getMyChat();
    // const interval = setInterval(() => this.getMyChat(), 10000);
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
