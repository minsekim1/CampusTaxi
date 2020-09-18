import React, { Component, useState } from "react";
import { TextInput, View } from "react-native";
import {
  Header,
  ListItem,
  Icon,
  Text,
  Card,
  Button,
  ButtonGroup,
  Input,
} from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker"; //방생성시간picker
import { FlatList, Image, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-community/picker";
import campusStyle from "style";
import { bbsStore, userStore, anotherStore } from "store";
export default function createRoom({ route, navigation }) {
  const [startplace, setStart] = React.useState("");
  const [endplace, setEnd] = React.useState("");
  const [isCreateRoomVisible, setCreateRoomVisible] = useState(false);
  const filter = route.params.filter;
  const [createRoomCategory, setCreateRoomCategory] = useState(null);
  const [createRoompersonmax, setCreateRoompersonmax] = useState(4);
  const [createRoomstartplace, setCreateRoomstartplace] = useState(
    anotherStore.placeStart
  );
  const [createRoomendplace, setCreateRoomendplace] = useState();
  const [createRoomGender, setCreateRoomGender] = useState(1);
  const [createSelectGender, setCreateSelectGender] = useState(2);
  //채팅방만들기시간선택
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const menuList = [
    "등교",
    "하교",
    "야작",
    "독서실",
    "PC방",
    "놀이동산",
    "클럽",
    "스키장",
    "오션월드",
  ];
  const showDatepicker = () => showMode("date");
  const showTimepicker = () => showMode("time");
  return (
    <>
      <View style={campusStyle.Modal.view}>
        <View style={{ padding: 10 }}>
          <Text>카테고리</Text>
          <Picker
            selectedValue={createRoomCategory}
            onValueChange={(itemValue) => {
              setCreateRoomCategory(itemValue);
            }}
          >
            <Picker.Item key={"gray"} color="gray" label={filter} />
            {menuList.map((item) =>
              item != filter ? (
                <Picker.Item
                  key={(item, i) => String(i)}
                  label={item}
                  value={item}
                />
              ) : null
            )}
          </Picker>
          <Text>출발장소</Text>
          <Button
            style={campusStyle.Button.default}
            title="검색"
            onPress={() => {
              //anotherStore
                navigation.navigate("검색");
            }}
          />

          <Picker
            selectedValue={createRoomstartplace}
            onValueChange={(itemValue) => {
              setCreateRoomstartplace(itemValue);
            }}
          >
            <Picker.Item key={""} value="" label="출발장소를 선택해주세요." />
            {anotherStore.placeStart.map((item) => (
              <Picker.Item
                key={(item, i) => String(i)}
                label={item}
                value={item}
              />
            ))}
          </Picker>
          <Text>도착장소</Text>
          <Button
            style={campusStyle.Button.default}
            title="검색"
            onPress={() => {
              //anotherStore
              console.log("a");
            }}
          />
          <Picker
            selectedValue={createRoomendplace}
            onValueChange={(itemValue) => {
              setCreateRoomendplace(itemValue);
            }}
          >
            <Picker.Item key={""} value="" label="도착장소를 선택해주세요." />
            {anotherStore.placeEnd.map((item) => (
              <Picker.Item
                key={(item, i) => String(i)}
                label={item}
                value={item}
              />
            ))}
          </Picker>
          <Text>탑승 시간</Text>
          <Text style={campusStyle.Text.center}>
            {anotherStore.toLocal(date)}
          </Text>
          <View style={campusStyle.View.row}>
            <View style={campusStyle.View.flex}>
              <Button
                buttonStyle={campusStyle.Button.marginTopAndBottom5}
                onPress={showDatepicker}
                title="날짜 선택"
              />
            </View>
            <View style={campusStyle.View.flex}>
              <Button
                buttonStyle={campusStyle.Button.marginTopAndBottom5}
                onPress={showTimepicker}
                title="시간 선택"
              />
            </View>
          </View>
          {/* 날짜선택 Picker창 */}
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <Text>탑승 인원</Text>
          <ButtonGroup
            selectedButtonStyle={{ backgroundColor: "#F8BD3C" }}
            textStyle={{ fontSize: 20 }}
            selectedIndex={createRoompersonmax - 2}
            onPress={(index) => setCreateRoompersonmax(index + 2)}
            buttons={["2", "3", "4"]}
          ></ButtonGroup>
          <Text>입장 제한 성별</Text>
          <ButtonGroup
            selectedButtonStyle={{ backgroundColor: "#F8BD3C" }}
            textStyle={{ fontSize: 16 }}
            selectedIndex={createRoomGender}
            onPress={(index) => {
              if (index == 0) {
                setCreateRoomGender(0);
                setCreateSelectGender(Number(userStore.user.d));
              } else {
                setCreateRoomGender(1);
                setCreateSelectGender(2);
              }
            }}
            buttons={["동성만", "남녀모두"]}
          ></ButtonGroup>
        </View>
        <View style={campusStyle.View.rowflexBtnGroup}>
          <Button
            name="myButtonName"
            buttonStyle={campusStyle.Button.groupActive}
            title="방 생성"
            onPress={() => {
              setLoadingModal(true);
              if (createRoomendplace == null || createRoomstartplace == null) {
                alert("출발지 또는 도착지를 선택해주세요.");
              } else {
                let result = true;
                firebase
                  .database()
                  .ref("user/data/" + userStore.userkey + "/c")
                  .once("value", async (snap) => {
                    if (snap != null)
                      for (const [key, value] of Object.entries(snap.val())) {
                        if (value == 1) {
                          // 접속한 방 중에서 다른 방을 조사
                          await firebase
                            .database()
                            .ref("bbs/data/" + key + "/c")
                            .once("value", (snap2) => {
                              //다른방이 같은 filter 일경우 만듬
                              if (snap2.val() == filter) {
                                result = false;
                              }
                            });
                        }
                      }
                  });
                if (result) {
                  bbsStore
                    .addBbs(
                      createRoomCategory,
                      createRoomendplace,
                      createSelectGender,
                      userStore.user.i,
                      date,
                      createRoompersonmax,
                      createRoomstartplace,
                      userStore.userkey
                    )
                    .then((bbskey) => {
                      alert("방이 생성되었습니다. 내 채팅에서 확인해주세요.");
                      setCreateRoomVisible(false);
                      setLoadingModal(false);
                    });
                } else {
                  alert(
                    "채팅방은 카테고리별로 1개만 들어갈 수 있습니다. 내 채팅->채팅방->사람아이콘 클릭에서 채팅방 나가기를 해주세요."
                  );
                  setCreateRoomVisible(false);
                  setLoadingModal(false);
                }
              }
            }}
          />
          <Button
            name="myButtonName"
            buttonStyle={campusStyle.Button.groupCancel}
            title="취소"
            onPress={() => setCreateRoomVisible(!isCreateRoomVisible)}
          />
        </View>
      </View>
    </>
  );
}
