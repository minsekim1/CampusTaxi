//#region imports
import React, { useState, useEffect } from "react";
import { View, FlatList, Image, TouchableOpacity, Picker } from "react-native";
import Modal from "react-native-modal";
import {
  Header,
  ListItem,
  Badge,
  Icon,
  Text,
  Card,
  Button,
  ButtonGroup,
} from "react-native-elements";
import campusStyle from "style";
import DateTimePicker from "@react-native-community/datetimepicker"; //방생성시간picker
import crown from "image/crown.png";

//#endregion

//채팅목록 화면
export default function chatScreen({ route, navigation }) {
  //#region Hooks & functions
  const [roomList, setRoomList] = useState();
  var firebase = require("firebase");
  //bbs에서 데이터를 가져와서 firebase json 형식에서 flatlist하기 좋은 형식으로 키값을 JSON 안으로 넣는다.
  firebase
    .database()
    .ref("bbs/data")
    .once("value", function (snapshot) {
      let resultRoom = [];
      snapshot.forEach(function (snap) {
        let item = snap.val();
        item.key = snap.key;
        resultRoom.push(item);
      });
      setRoomList(resultRoom);
    });
  //#endregion Hooks & functions
  return (
    <>
      {/* 채팅목록 출력부분 */}
      <FlatList
        keyExtractor={(item) => item.b}
        data={roomList}
        renderItem={({ item, index }) => {
          if (
            item != null
            // && filterCategory == item.c
          ) {
            return (
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
              </TouchableOpacity>
            );
          }
        }}
      />
      {/* 방만들기 버튼부분 */}
      <View style={campusStyle.View.createRoomView}>
        <TouchableOpacity
          style={campusStyle.Button.createRoomBtn}
          onPress={() => {
            setCreateRoomVisible(!isCreateRoomVisible);
          }}
        >
          <Icon name="add" size={32} color="white" />
          <Text style={campusStyle.Text.smallSize}>방만들기</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
