import React, { Component, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  RefreshControl,
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

export default function MychatScreen({ route, navigation }) {
  const [roomList, setRoomList] = useState();
  const userkey = "-MBRNLe85baaaaaaaaa";

  useEffect(() => {
    //해당 유저의 keyy를 이용하여 내 채팅 목록을 채워넣음
    firebase
      .database()
      .ref("user/data/" + userkey + "/c")
      .once("value", (snapshot) => {
        let resultarr = [];
        snapshot.forEach((snap) => {
          firebase //bbs에서 데이터를 가져와서 firebase json 형식에서 flatlist하기 좋은 형식으로 키값을 JSON 안으로 넣는다.
            .database()
            .ref("bbs/data/" + snap.val())
            .once("value", (snaptemp) => {
              let item = snaptemp.val();
              item.key = snaptemp.key;
              resultarr.push(item);
            });
          setRoomList(resultarr);
        });
      });
    updateUserdata(userkey);
  }, [userkey]);

  //새로고침
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //#region 유저정보 업데이트
  const [myname, setMyname] = useState();
  const [mygender, setMygender] = useState();
  function updateUserdata(userkey) {
    getMyname(userkey);
    getMygender(userkey);
  }
  function getMyname(userkey) {
    firebase
      .database()
      .ref("user/data/" + userkey + "/h")
      .once("value", (snapshot) => setMyname(snapshot.val()));
  }
  function getMygender(userkey) {
    firebase
      .database()
      .ref("user/data/" + userkey + "/d")
      .once("value", (snapshot) => setMygender(snapshot.val()));
  }
  //#region Hooks & functions
  return (
    <FlatList
      keyExtractor={(item) => item.b}
      data={roomList}
      extraData={roomList}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
