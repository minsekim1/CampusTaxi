export default function MychatScreen({ route, navigation }) {
  userStore.asyncUser();
  userStore.asyncuserbbs();
  return (
    <Observer>
      {() => (
        <FlatList
          keyExtractor={(item, i) => String(i)}
          data={userStore.userbbs}
          renderItem={({ item, index }) => {
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
                    <Text style={campusStyle.Text.middleBold}>{index}</Text>
                    <Text style={campusStyle.Text.middleBold}>
                      {item.h == 0 ? "남자" : item.h == 1 ? "여자" : "모두"}
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
                      <Text>{(String(item.i).length > 9) ? String(item.i).substring(0, 9) + "..." : item.i}</Text>
                    </View>
                    <Text style={{ marginLeft: 10 }}>출발지:{item.n.name}</Text>
                    <Text style={{ marginLeft: 10 }}>도착지:{item.g.name}</Text>
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
                    <Text style={campusStyle.Text.grayDDark}>탑승시간▼</Text>
                    <Text style={campusStyle.Text.grayDDark}>
                      {anotherStore.toRoomTime(item.j)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </Observer>
  );
}

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
