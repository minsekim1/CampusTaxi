//#region imports
import React, { Component, useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import campusStyle from "../campusStyle";
//#endregion

//채팅 말풍선 Items
function ChattingItem({ time, name, say, isLeader, isMychat }) {
  // 오후 오전 나누기
  const hour = time.toString().slice(1, 2);
  const min = time.toString().slice(1, 2);
  let day = "오전";
  if (hour >= 12) {
    hour -= 12;
    day = "오후";
  }

  // 방장 일경우 왕관 이미지 넣기
  let image;
  if (isLeader) {
    image = <Image source={require("../../Assets/Images/crown.png")} />;
  }

  // 스타일 지정 및 내채팅 (Reverse) 구현
  const ItemStyle = StyleSheet.create({
    item_title: {
      alignSelf: "flex-start",
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 5,
      marginLeft: 20,
    },
    item_titleReverse: {
      alignSelf: "flex-end",
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 5,
      marginRight: 20,
    },
    item_content: {
      fontSize: 15,
      backgroundColor: "#E5E5E8",
      borderRadius: 9,
      padding: 10,
      fontWeight: "400",
      maxWidth: wp(77),
      marginLeft: 20,
    },
    item_contentReverse: {
      fontSize: 15,
      backgroundColor: "#E5E5E8",
      borderRadius: 9,
      padding: 10,
      fontWeight: "400",
      maxWidth: wp(77),
      marginRight: 20,
    },
    item_time: {
      justifyContent: "flex-start",
      alignSelf: "flex-end",
      fontSize: 11,
      marginLeft: 5,
      marginRight: 5,
      color: "grey",
    },
    itemMain_container: {
      flexDirection: "row",
      marginBottom: 10,
    },
    itemMain_containerReverse: {
      flexDirection: "row",
      marginBottom: 10,
      justifyContent: "flex-end",
    },
  });
  let containerItem; //내 채팅일 경우 좌우반전
  if (isMychat) {
    containerItem = (
      <>
        <View>
          <Text style={ItemStyle.item_titleReverse}>
            {image}
            {name}
          </Text>
          <View style={ItemStyle.itemMain_containerReverse}>
            <Text style={ItemStyle.item_time}>
              {day} {hour.toString()}:{min.toString()}
            </Text>
            <Text style={ItemStyle.item_contentReverse}>{say}</Text>
          </View>
        </View>
      </>
    );
  } else {
    containerItem = (
      <>
        <View>
          <Text style={ItemStyle.item_title}>
            {image}
            {name}
          </Text>
          <View style={ItemStyle.itemMain_container}>
            <Text style={ItemStyle.item_content}>{say}</Text>
            <Text style={ItemStyle.item_time}>
              {day} {hour.toString()}:{min.toString()}
            </Text>
          </View>
        </View>
      </>
    );
  }

  return <>{containerItem}</>;
}

//채팅 대화들 FlatList
export default function ChatFlatList(props) {
  //#region  변수 & functions
  let firebase = require("firebase");
  // useEffect(() => {
  //   //해당 bbs의 채팅 내용을 가져옵니다. 로딩마다 1회.
  //   firebase
  //     .database()
  //     .ref("bbs/data/" + bbsKey + "/d")
  //     .once("value", (snapshot) => {
  //       let resultarr = [];
  //       snapshot.forEach((snap) => {
  //         let item = snap.val();
  //         item.key = snap.key;
  //         resultarr.push(item);
  //       });
  //       setChattingDate(resultarr);
  //     });
  // }, []);
  const [chattingData, setChattingDate] = useState([]);
  const [textInput, setTextInput] = useState("");
  const bbsKey = props.bbskey;
  const leaderkey = props.leaderkey;
  const flatlist = useRef();
  const myname = "민성";
  const mykey = "-MBRNLe85baaaaaaaaa";

  //#endregion
  return (
    <>
      <FlatList
        // ref={flatlist}
        data={chattingData}
        keyExtractor={(item) => item.da}
        // onContentSizeChange={() => flatList.scrollToEnd()}
        initialScrollIndex={chattingData.length - 1}
        renderItem={({ item }) => (
          <>
            <ChattingItem
              isLeader={leaderkey == item.db ? true : false}
              say={item.dd}
              name={item.db}
              time={item.dc}
              isMychat={mykey == item.db ? true : false}
            />
          </>
        )}
      />

      <View style={campusStyle.View.wideWhite}>
        <View style={{ flex: 4 }}>
          <TextInput
            value={textInput}
            onChangeText={(textEntry) => {
              setTextInput(textEntry);
            }}
            ////////////////////////////////////////////////////////////////////////////////////////////////
            onSubmitEditing={() => {
              //현재 시간을 가져옵니다.
              fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
                .then((res) => res.json())
                .then((result) => {
                  //채팅 내용입니다.

                  let datatime =
                    result.datetime.slice(0, 21) +
                    result.datetime.slice(26, 32);
                  let tempchatkey = "tempchatkey";
                  let newChat = {
                    da: tempchatkey,
                    db: mykey,
                    dc: datatime,
                    dd: textInput,
                  };
                  //채팅 내용 데이터를 파이어베이스에 넣습니다.
                  let newChatKey = firebase
                    .database()
                    .ref("bbs/data/" + bbsKey + "/d")
                    .push(newChat);
                  //파이어베이스 임시 키값을 현재 키값으로 변경
                  tempchatkey = newChatKey.key;
                  newChat = {
                    da: tempchatkey,
                    db: mykey,
                    dc: datatime,
                    dd: textInput,
                  };
                  //바뀐 키값으로 다시 올리기
                  firebase
                    .database()
                    .ref("bbs/data/" + bbsKey + "/d")
                    .set(newChat);
                  //파이어베이스에 올린 버전으로 가져옵니다.
                  firebase
                    .database()
                    .ref("bbs/data/" + bbsKey + "/d")
                    .once("value", (snapshot) => {
                      let resultarr = [];
                      snapshot.forEach((snap) => {
                        let item = snap.val();
                        item.key = snap.key;
                        resultarr.push(item);
                      });
                      setChattingDate(resultarr);
                    });
                  //친 채팅 내용을 지웁니다.
                  setTextInput("");
                });
            }}
            ////////////////////////////////////////////////////////////////////////////////////////////////
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title="전송"
            onPress={() => {
              ////////////////////////////////////////////////////////////////////////////////////////////////
              //현재 시간을 가져옵니다.
              fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
                .then((res) => res.json())
                .then((result) => {
                  //채팅 내용입니다.
                  const datatime =
                    result.datetime.slice(0, 21) +
                    result.datetime.slice(26, 32);
                  let tempchatkey = "tempchatkey";
                  let newChat = {
                    da: tempchatkey,
                    db: mykey,
                    dc: datatime,
                    dd: textInput,
                  };
                  //채팅 내용 데이터를 파이어베이스에 넣습니다.
                  let newChatKey = firebase
                    .database()
                    .ref("bbs/data/" + bbsKey + "/d")
                    .push(newChat);
                  //파이어베이스 임시 키값을 현재 키값으로 변경
                  tempchatkey = newChatKey.key;
                  newChat = {
                    da: tempchatkey,
                    db: mykey,
                    dc: datatime,
                    dd: textInput,
                  };
                  //바뀐 키값으로 다시 올리기
                  firebase
                    .database()
                    .ref("bbs/data/" + bbsKey + "/d")
                    .set(newChat);
                  //파이어베이스에 올린 버전으로 가져옵니다.
                  firebase
                    .database()
                    .ref("bbs/data/" + bbsKey + "/d")
                    .once("value", (snapshot) => {
                      let resultarr = [];
                      snapshot.forEach((snap) => {
                        let item = snap.val();
                        item.key = snap.key;
                        resultarr.push(item);
                      });
                      setChattingDate(resultarr);
                    });
                  //친 채팅 내용을 지웁니다.
                  setTextInput("");
                });
              ////////////////////////////////////////////////////////////////////////////////////////////////
            }}
          >
            <Image style={campusStyle.Image.middleSize} />
          </Button>
        </View>
      </View>
    </>
  );
}
