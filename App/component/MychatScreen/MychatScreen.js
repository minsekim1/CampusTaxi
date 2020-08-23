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
  Text,
} from "react-native";
import { bbsStore, userStore } from "store";
import { Input, Badge } from "react-native-elements";
import campusStyle from "style";
import crown from "image/crown.png";
import { Observer } from "mobx-react";
const firebase = require("firebase");

export default function MychatScreen({ route, navigation }) {
  const [inital, setInital] = useState(true);
  const [userkey, setUserkey] = useState(userStore.userkey);

  useEffect(() => {
    userStore.setuserbbs(userStore.user.c);
    //userkey 넣기
    //route.params ? setUserkey(route.params.userkey) : null;
    //해당 유저의 keyy를 이용하여 내 채팅 목록을 채워넣음
    // userStore.updateUser(); //유저 정보 업데이트
    // let resultarr = [];
    // alert(userStore.user);
    // if (userStore.user.c != null)
    //   Object.values(userStore.user.c).forEach((i) => resultarr.push(i));
    // setInital(false);
  }, []);

  //새로고침
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    userStore.setuserbbs(userStore.user.c);
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  //#region 유저정보 업데이트
  //const [myname, setMyname] = useState();
  //const [mygender, setMygender] = useState();
  return (
    <>
      {inital && (
        <View style={campusStyle.View.default}>
          <Text>데이터를 받아오는 중입니다. 새로고침을 해주세요.</Text>
        </View>
      )}
      <Observer>
        {() => {
          if (userStore.userbbs != []) {
            console.log(userStore.userbbs);
            return (
              <Text style={campusStyle.Text.default}>
                {console.log(userStore.userbbs)}
                {userStore.userbbs.map(() => "asd")}
              </Text>
            );
          } else {
            return <Text style={campusStyle.Text.default}>null입니당</Text>;
          }
        }}
      </Observer>
      <FlatList
        keyExtractor={(item) => item.id}
        data={userStore.userbbs}
        extraData={userStore.userbbs}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item, index }) => {
          if (item != null) {
            return <Text style={campusStyle.Text.default}>{index}</Text>;
          }
        }}
      />
    </>
  );
}
