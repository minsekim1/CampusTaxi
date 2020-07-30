//#region imports
import React, { useState, useRef, Component, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
} from "react-native";
import { Header, Icon, Button } from "react-native-elements";
import campusStyle from "style";
import { TextInput } from "react-native-gesture-handler";
import crown from "image/crown.png";
const firebase = require("firebase");

//실제 유저들이 채팅하는 화면
export default function chatinfo({ route, navigation }) {
  let { bbskey } = route.params;
  const [chatinfo, setChatinfo] = useState([]);
  //멤버 배열, 대화상대(현재, 최대)
  //#region 변수들
  useEffect(() => {
    updateChatinfo(bbskey);
  }, [bbskey]);
  function updateChatinfo(bbskey) {
    firebase
      .database()
      .ref("bbs/data/" + bbskey)
      .once("value", (snapshot) => {
        // i:방장 h:성별 l.ma : 인간1 m:현재인원 k:최대인원
        let item = [];
        item.push(snapshot.val());
        setChatinfo(item);
        navigation.setOptions({
          title: "대화상대(" + snapshot.val().m + "/" + snapshot.val().k + ")",
        });
      });
  }
  //#endregion
  return (
    <>
      {/* 채팅 내용부분 */}
      <FlatList
        data={chatinfo}
        extraData={chatinfo}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>
            {/* {item.l.forEach((i) => {
              i;
            })} */}
            {item.l.map((i) => i)}
          </Text>
        )}
      />
    </>
  );
}

function RenderChatMember() {}
