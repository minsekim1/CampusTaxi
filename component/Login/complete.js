import * as React from "react";
import { Component, useState } from "react";
import { userStore } from "../store/store";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { AuthContext } from "../store/UserStore"
import { Button } from "react-native-paper";

export function complete({ route }) {
  const { signIn } = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", }}>
      {/* logo && title */}
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Image source={require("./icon.png")} />
      </View>
      <Text style={{ fontSize: 18 }}> CAMPUS TAXI </Text>
      <View style={{ marginVertical: 30, }}>
        <Text style={{ fontSize: 21, textAlign: "center", color: "#6060DC" }}>
          환영합니다!
          </Text>
      </View>
      <View style={{ flex: 2, }}>
        <View style={{ width: "80%" }}>
          <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 30, }}>
            해당 어플은 삼육대학교 창업동아리 '캠퍼스택시'가 제작하고 운영하는
            어플입니다.
            </Text>
          <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 30, }}>
            현재에는 채팅과 방만들기 기능만을 제공하고 있습니다.
            </Text>
          <Text style={{ fontSize: 18, textAlign: "center" }}>
            N분의 1 계산은 <Text style={{ color: "#0000ff" }}> TOSS앱 </Text>,
              택시 호출은 <Text style={{ color: "#ffd700" }}> 카카오 택시 </Text>
              를 이용해 주세요!
            </Text>
        </View>

        <View style={{ position: "absolute", bottom: 0, width: "100%", alignSelf: "center" }}>
          <View
            style={[button_style.next_button, { backgroundColor: "#CBCED7" }]}
          >
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text
                style={{
                  color: "#ffffff",
                  textAlign: "center",
                  fontSize: 17,
                }}
              >
                처음으로 돌아가기
                </Text>
            </TouchableOpacity>
          </View>
          <View style={button_style.next_button}>
            <TouchableOpacity
              onPress={async () => { signIn(route.params.id, route.params.pw); userStore.login(route.params.id, route.params.pw); }}
              color="#162A64"
            >
              <Text
                style={{
                  color: "#ffffff",
                  textAlign: "center",
                  fontSize: 17,
                }}
              >
                로 그 인
                </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const button_style = StyleSheet.create({
  next_button: {
    backgroundColor: "#162A64",
    height: 50,
    margin: 0,
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
  },
  gender_change: {
    borderRadius: 20,
    height: 27,
    width: "40%",
    margin: 10,
  },
});