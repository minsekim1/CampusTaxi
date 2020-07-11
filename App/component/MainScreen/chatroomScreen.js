//#region imports
import React, { useState, useRef } from "react";
import { View, Text, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Header, Icon, Button } from "react-native-elements";
import campusStyle from "../../themes/campusStyle";
import { TextInput } from "react-native-gesture-handler";
import crown from "../../image/crown.png";
import chatFlatList from "./chatFlatList";

//채팅방 화면
export default function chatroomScreen({ route, navigation: { goBack } }) {
  //#region 변수들
  var firebase = require("firebase");
  var ref = firebase.database().ref();
  const bbskey = route.params.bbskey;
  const gender = route.params.gender;
  const startplace = route.params.startplace;
  const endplace = route.params.endplace;
  const leadername = route.params.leadername;
  const myname = route.params.myname;
  const mygender = route.params.mygender;

  const [textInput, setTextInput] = useState("");
  const flatList = useRef();
  // const personmember = route.params.personmember;
  // const personmax = route.params.personmax;
  // const meetingdate = route.params.meetingdate;
  //#endregion
  return (
    <>
      {/* 헤더부분 */}
      <View style={{ height: hp(20), marginBottom: 15 }}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: wp(100),
          }}
        >
          <Header
            containerStyle={{
              height: 170,
              alignItems: "stretch",
            }}
            backgroundColor={
              gender == "all"
                ? "#3A3A3A"
                : gender == "woman"
                ? "#DE22A3"
                : "#55A1EE"
            }
            leftComponent={
              <Button
                type="clear"
                title=""
                icon={<Icon name="arrow-back" size={24} color="white" />}
                onPress={() => goBack()}
              ></Button>
            }
            centerComponent={{
              text: (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 8,
                    }}
                  >
                    <Image source={crown} />
                    <Text style={campusStyle.Text.middleBold}>
                      {"  " + leadername}
                    </Text>
                  </View>
                  <Text style={campusStyle.Text.whiteInput}>
                    {"출발지:  " + startplace}
                  </Text>
                  <Text style={campusStyle.Text.whiteInput}>
                    {"도착지:  " + endplace}
                  </Text>
                </>
              ),
            }}
            rightComponent={
              <View style={campusStyle.View.row}>
                <Button
                  type="clear"
                  title=""
                  icon={<Icon name="search" size={24} color="white" />}
                  onPress={() => {
                    // setFilterVisible(true);
                  }}
                />
                <Button
                  type="clear"
                  title=""
                  icon={<Icon name="person" size={24} color="white" />}
                  onPress={() => {
                    // setSearchVisible(true);
                  }}
                />
              </View>
            }
          />
        </View>
      </View>

      {/* 채팅 내용부분 */}
      <chatFlatList
        bbskey={bbskey}
        leadername={leadername}
        myname={myname}
        mygender={mygender}
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
                    db: myname,
                    dc: datatime,
                    dd: textInput,
                  };
                  //채팅 내용 데이터를 파이어베이스에 넣습니다.
                  let newChatKey = firebase
                    .database()
                    .ref("bbs/data/" + bbskey + "/d")
                    .push(newChat);
                  //파이어베이스 임시 키값을 현재 키값으로 변경
                  tempchatkey = newChatKey.key;
                  newChat = {
                    da: tempchatkey,
                    db: myname,
                    dc: datatime,
                    dd: textInput,
                  };
                  //바뀐 키값으로 다시 올리기
                  firebase
                    .database()
                    .ref("bbs/data/" + bbskey + "/d")
                    .set(newChat);
                  //파이어베이스에 올린 버전으로 가져옵니다.
                  // firebase
                  //   .database()
                  //   .ref("bbs/data/" + bbskey + "/d")
                  //   .once("value", (snapshot) => {
                  //     let resultarr = [];
                  //     snapshot.forEach((snap) => {
                  //       let item = snap.val();
                  //       item.key = snap.key;
                  //       resultarr.push(item);
                  //     });
                  //     setChattingDate(resultarr);
                  //   });
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
                    db: myname,
                    dc: datatime,
                    dd: textInput,
                  };
                  //채팅 내용 데이터를 파이어베이스에 넣습니다.
                  let newChatKey = firebase
                    .database()
                    .ref("bbs/data/" + bbskey + "/d")
                    .push(newChat);
                  //파이어베이스 임시 키값을 현재 키값으로 변경
                  tempchatkey = newChatKey.key;
                  newChat = {
                    da: tempchatkey,
                    db: myname,
                    dc: datatime,
                    dd: textInput,
                  };
                  //바뀐 키값으로 다시 올리기
                  firebase
                    .database()
                    .ref("bbs/data/" + bbskey + "/d/" + tempchatkey)
                    .set(newChat);
                  //파이어베이스에 올린 버전으로 가져옵니다.
                  // firebase
                  //   .database()
                  //   .ref("bbs/data/" + bbskey + "/d")
                  //   .once("value", (snapshot) => {
                  //     let resultarr = [];
                  //     snapshot.forEach((snap) => {
                  //       let item = snap.val();
                  //       item.key = snap.key;
                  //       resultarr.push(item);
                  //     });
                  //     setChattingData(resultarr);
                  //   });
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
