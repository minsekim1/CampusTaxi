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
import { bbsStore, userStore, anotherStore } from "store";
import { Input, Badge } from "react-native-elements";
import campusStyle from "style";
import crown from "image/crown.png";
import { Observer } from "mobx-react";
const firebase = require("firebase");

export default function MychatScreen({ route, navigation }) {
  const [inital, setInital] = useState(true);
  const [userkey, setUserkey] = useState(userStore.userkey);

  useEffect(() => {
    userStore.setuserbbs(userkey);
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
    userStore.setuserbbs(userkey);
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  //#region 유저정보 업데이트
  //const [myname, setMyname] = useState();
  //const [mygender, setMygender] = useState();
  return (
    <>
      <Observer>
        {() => {
          if (userStore.userbbs.length != 0) {
            return (
              <FlatList
                keyExtractor={(item, i) => String(i)}
                data={userStore.userbbs}
                extraData={userStore.userbbs}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                renderItem={({ item, index }) => {
                  if (item != null) {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          navigation.navigate("채팅방", {
                            bbskey: item.b,
                            gender: item.h,
                            leadername: item.i,
                            startplace: item.n,
                            endplace: item.g,
                            mygender: userStore.user.d,
                            myname: userStore.user.i,
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
                                item.h == 0
                                  ? "#579FEE"
                                  : item.h == 1
                                  ? "#C278DE"
                                  : "#3A3A3A",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text style={campusStyle.Text.middleBold}>
                              {index}
                            </Text>
                            <Text style={campusStyle.Text.middleBold}>
                              {item.h == 0
                                ? "남자"
                                : item.h == 1
                                ? "여자"
                                : "모두"}
                            </Text>
                          </View>
                          <View style={{ flex: 6 }}>
                            <View style={campusStyle.View.row}>
                              <Image
                                style={{
                                  width: 23,
                                  height: 15,
                                  marginLeft: 10,
                                }}
                                source={crown}
                              />
                              <Text>{item.i}</Text>
                            </View>
                            <Text style={{ marginLeft: 10 }}>
                              출발지:{item.n}
                            </Text>
                            <Text style={{ marginLeft: 10 }}>
                              도착지:{item.g}
                            </Text>
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
                            <Text style={campusStyle.Text.grayDDark}>
                              탑승시간▼
                            </Text>
                            <Text style={campusStyle.Text.grayDDark}>
                              {anotherStore.toLocal(item.f)}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                }}
              />
            );
          } else {
            return (
              <Text style={campusStyle.Text.default}>데이터가 없습니다.</Text>
            );
          }
        }}
      </Observer>
    </>
  );
}
