import React, { Component, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import "react-native-gesture-handler";
import crown from "image/crown.png";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  SectionList,
  Linking,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import TestFunc from "component/TestFunc";
// 데이터 및 다른 클래스

const alarmData = [
  //알림의 실제 데이터
  {
    id: 1,
    title: "이미지 없는 알림 1",
    content: "이미지 없는 알림의 내용 1",
    hour: 17,
    min: 20,
    date: 20200606,
    icon: "gift",
  },
  {
    id: 2,
    title: "이미지 있는 알림",
    content: "이미지 있는 알림의 내용",
    hour: 14,
    min: 20,
    date: "20200606",
    imageURL: crown,
    icon: "gift",
  },
  {
    id: 3,
    title: "이미지 없는 알림 2",
    content: "이미지 없는 알림의 내용 2",
    hour: 7,
    min: 20,
    date: "20200606",
    icon: "message1",
  },
  {
    id: 4,
    title: "이미지 없는 알림 3",
    content: "이미지 없는 알림의 내용 3",
    hour: 2,
    min: 20,
    date: "20200606",
    icon: "message1",
  },
];

//알림 아이템 View
function AlarmItem({ id, title, imgurl, content, hour, min, icon }) {
  let day = "오전";
  if (hour >= 12) {
    hour -= 12;
    day = "오후";
  }
  return imgurl == null || imgurl == "" ? ( //RN의 if문 (삼항 연산자로 대체)
    ///////이미지 없는 View///////

    <View style={ItemStyle.NonImg_container}>
      <TouchableOpacity onPress={() => {}}>
        <View style={ItemStyle.itemMain_container}>
          <View>
            <Ionicons name={icon} color="#3B589B" />
          </View>
          <Text style={ItemStyle.item_title}> {title} </Text>
          <Text style={ItemStyle.item_content}> {content} </Text>
        </View>

        <Text style={ItemStyle.item_time}>
          {day} {hour.toString()}:{min.toString()}
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    ///////이미지 있는 View///////

    <View style={ItemStyle.Img_container}>
      <TouchableOpacity onPress={() => {}}>
        <View style={ItemStyle.itemMain_container}>
          <View>
            <Ionicons name={icon} color="#3B589B" />
          </View>
          <Text style={ItemStyle.item_title}> {title} </Text>
          <Text style={ItemStyle.item_content}> {content} </Text>
        </View>
        <Text style={ItemStyle.item_time}>
          {day} {hour.toString()}:{min.toString()}
        </Text>

        <Image
          style={{ marginTop: 50, width: "100%", height: 200 }}
          source={imgurl}
        />
      </TouchableOpacity>
    </View>
  );
}
// 메인 클래스 //
const AlramScreen: () => React$Node = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.ContentContainer}>
        <FlatList
          data={alarmData}
          renderItem={({ item }) => (
            <AlarmItem
              id={item.id}
              title={item.title}
              content={item.content}
              hour={item.hour}
              min={item.min}
              imgurl={item.imageURL}
              icon={item.icon}
              date={item.date}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

// 스타일 //

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    paddingTop: 15,
  },
  header_container: {
    flex: 1,
    flexDirection: "column",
  },
  ContentContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  NoticeTitle: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -25,
  },
  bottomHairLine: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
});

const ItemStyle = StyleSheet.create({
  Img_container: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 50,
    width: "100%",
    height: 230,
  },
  NonImg_container: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 50,
    width: "100%",
    height: 70,
  },
  itemMain_container: {
    flex: 1,
    flexDirection: "column",
  },
  item_title: {
    alignSelf: "flex-start",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: -3,
    marginBottom: 20,
    marginLeft: 15,
  },
  item_content: {
    fontSize: 15,
    color: "#585864",
  },
  item_time: {
    justifyContent: "flex-start",
    alignSelf: "flex-end",
    fontSize: 11,
    color: "grey",
  },
});

export default AlramScreen;
