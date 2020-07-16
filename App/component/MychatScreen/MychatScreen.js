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
  Badge,
} from "react-native";
import { Input } from "react-native-elements";
import campusStyle from "style";
import crown from "image/crown.png";
export default function MychatScreen() {
  const [roomList, setRoomList] = useState();
  let firebase = require("firebase");
  useEffect(() => {
    firebase
      .database()
      .ref("user/data/" + "-MBRNLe85baaaaaaaaa" + "/c")
      .once("value", (snap) => {
        let resultarr = [];
        snap.forEach((snap) => {
          let item = snap.val();
          item.key = snap.key;
          resultarr.push(item);
        });
        setRoomList(resultarr);
        alert(JSON.stringify(roomList));
      });
  }, []);
  return (
    <FlatList
      keyExtractor={(item, index) => index}
      data={roomList}
      extraData={roomList}
      renderItem={({ item, index }) => {
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("채팅방", {
              bbskey: item.b,
              gender: item.h,
              leadername: item.i,
              startplace: item.n,
              endplace: item.g,
              mygender: mygender,
              myname: myname,
            })
          }
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
              <Badge
                textStyle={campusStyle.Badge.textStyle}
                value={0}
                status="warning"
              />
            </View>
          </View>
        </TouchableOpacity>;
      }}
    />
  );
}
