//#region imports
import React, { Component, useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import campusStyle from "style";
import crown from "image/crown.png";
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
    
    const myname = this.props.myname;
    const mygender = this.props.mygender;
    const bbskey = this.props.bbskey;
    const leadername = this.props.leadername;

    //#endregion
    return (

    );
  }
}
