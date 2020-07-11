//#region imports
import React, { Component, useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import campusStyle from "../../themes/campusStyle";
import crown from "../../image/crown.png";
//#endregion

//채팅 대화들 FlatList
export default class chatFlatList extends React.PureComponent {
  state = { chattingData: [], flatList: false };
  scrollToItem = () => {
    this.flatListRef.scrollToEnd({ animated: true });
  };
  componentDidMount() {
    //once와 달린 on은 실시간으로 데이터를 받는다. 변경이 있을 시 채팅 내용을 계속해서 수신 받는다.
    let firebase = require("firebase");
    firebase
      .database()
      .ref("bbs/data/" + this.props.bbskey + "/d")
      .on("value", (snap) => {
        let resultarr = [];
        snap.forEach((snap) => {
          let item = snap.val();
          item.key = snap.key;
          resultarr.push(item);
        });
        this.setState(
          (state) => {
            return { chattingData: resultarr };
          },
          () => {
            this.flatListRef.scrollToEnd({ animated: true });
          }
        );
      });
  }
  render() {
    //#region 변수 & 함수
    class ChattingItem extends React.PureComponent {
      render() {
        const isLeader = this.props.leaderkey;
        const say = this.props.say;
        const name = this.props.name;
        const time = this.props.time;
        const isMychat = this.props.isMychat;

        let month = new Date(time).getMonth() + 1;
        let date = new Date(time).getDate();

        // 오후 오전 나누기
        const now = new Date();
        let hour = now.getHours().toString();
        const min = now.getMinutes().toString();
        let day = "오전";
        if (hour >= 12) {
          hour -= 12;
          day = "오후";
        }

        // 방장 일경우 왕관 이미지 넣기
        let image;
        if (isLeader) {
          image = <Image source={crown} />;
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
          itemSystem_Message: {
            flexDirection: "row",
            marginBottom: 10,
            justifyContent: "center",
            fontSize: 15,
            padding: 10,
            fontWeight: "400",
          },
        });
        let containerItem; //내 채팅일 경우 좌우반전

        // {now.getFullYear().toString()}
        //getMonth +1 월
        //getDate 일
        //getDay 요일(0:일, 1:월 ...)
        //getHours 0-23
        //getMinutes() 0-59
        if (name == "SYSTEM") {
          containerItem = (
            <View style={ItemStyle.itemSystem_Message}>
              <Text>{say}</Text>
            </View>
          );
        } else if (isMychat) {
          containerItem = (
            <View>
              <Text style={ItemStyle.item_titleReverse}>
                {image}
                {name}
              </Text>
              <View style={ItemStyle.itemMain_containerReverse}>
                <Text style={ItemStyle.item_time}>
                  {day + " " + hour + ":" + min}
                </Text>
                <Text style={ItemStyle.item_contentReverse}>{say}</Text>
              </View>
            </View>
          );
        } else {
          containerItem = (
            <View>
              <Text style={ItemStyle.item_title}>
                {image}
                {name}
              </Text>
              <View style={ItemStyle.itemMain_container}>
                <Text style={ItemStyle.item_content}>{say}</Text>
                <Text style={ItemStyle.item_time}>
                  {day + " " + hour + ":" + min}
                </Text>
              </View>
            </View>
          );
        }
        return <>{containerItem}</>;
      }
    }
    const myname = this.props.myname;
    const mygender = this.props.mygender;
    const bbskey = this.props.bbskey;
    const leadername = this.props.leadername;

    //#endregion
    return (
      <FlatList
        ref={(ref) => {
          this.flatListRef = ref;
        }}
        data={this.state.chattingData}
        keyExtractor={(item, index) => index}
        extraData={this.state}
        renderItem={({ item }) => (
          <ChattingItem
            isLeader={this.props.leaderkey == item.db ? true : false}
            say={item.dd}
            name={item.db}
            time={item.dc}
            isMychat={this.props.myname == item.db ? true : false}
          />
        )}
      />
    );
  }
}
