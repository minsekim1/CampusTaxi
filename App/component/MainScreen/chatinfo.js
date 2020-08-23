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
import { bbsStore, userStore } from "store";
//채팅방의 유저 목록
export default function chatinfo({ route, navigation }) {
  let { bbskey } = route.params;
  const [chatinfo, setChatinfo] = useState([]);
  const [chatuserinfo, setChatuserinfo] = useState([]);
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

        //현재 인원 재 계산
        let snap3 = snapshot.val();
        let m = 0;
        if (snap3.l != null) {
          Object.values(snap3.l).map(() => m++);
        }
        snap3.m = m;

        navigation.setOptions({
          title: "대화상대(" + snap3.m + "/" + snapshot.val().k + ")",
        });
      });
  }
  //#endregion
  return (
    <>
      <FlatList
        data={chatinfo}
        extraData={chatinfo}
        keyExtractor={(item, i) => String(i)}
        renderItem={({ item }) => (
          <Text>
            {Object.keys(item.l).map((key) => key)}
            {/* {Object.keys(item.l).map((key) =>
              userStore.getUser(key).then((r) => r.a)
            )} */}
          </Text>
        )}
      />
      <View
        stlye={{
          position: "absolute",
          bottom: 0,
        }}
      >
        <Button
          style={campusStyle.Button.default}
          onPress={async () => {
            await bbsStore.outBbs(userStore.userkey, bbskey);
            navigation.pop(2);
          }}
          title="방나가기"
        />
      </View>
    </>
  );
}

function RenderChatMember() {}
/*
<FlatList
  data={chatinfo}
  extraData={chatinfo}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <Text>
       {item.l.forEach((i) => {
              i;
            })} 
      {item.l.map((i) => i)}
    </Text>
  )}
/>;

*/
