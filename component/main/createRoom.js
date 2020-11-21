import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button, ButtonGroup } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-community/picker";
import campusStyle from "./campusStyle";
import { userStore } from "../store/store";

export default function createRoom({ route, navigation }) {
  const bbstype = route.params.bbstype;
  const [createRoomCategory, setCreateRoomCategory] = useState(bbstype);
  const [createRoompersonmax, setCreateRoompersonmax] = useState(4);
  const [createRoomGender, setCreateRoomGender] = useState(1);
  const [createSelectGender, setCreateSelectGender] = useState(2);
  const [cost, setCost] = useState(0);
  const [placeStart, setPlaceStart] = useState(null);
  const [placeEnd, setPlaceEnd] = useState(null);
  //채팅방만들기시간선택
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  React.useEffect(() => {
    if (route.params.start != null)
      setPlaceStart(route.params.start);
    if (route.params.cost != null)
      setCost(route.params.cost);
    if (route.params.end != null)
      setPlaceEnd(route.params.end);
    if (route.params.createRoomCategory != null)
      setCreateRoomCategory(route.params.createRoomCategory);
    if (route.params.createRoompersonmax != null)
      setCreateRoompersonmax(route.params.createRoompersonmax);
    if (route.params.createRoomGender != null)
      setCreateRoomGender(route.params.createRoomGender);
    if (route.params.date != null)
      setDate(new Date(route.params.date));
  }, []);


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
      <View style={{ padding: 20, paddingTop: 50 }}>
        <Text>카테고리</Text>
        <Picker
          selectedValue={createRoomCategory}
          onValueChange={itemValue => setCreateRoomCategory(itemValue)}>
          {
            menuList.map((item) =>
              <Picker.Item
                key={i => String(i)}
                label={item}
                value={item}
                color={item != createRoomCategory ? "gray" : "black"}
              />
            )
          }
        </Picker>

        {placeStart != null && placeEnd != null ? (
          <>
            <Text>출발지:{placeStart.name}</Text>
            <Text>도착지:{placeEnd.name}</Text>
          </>
        ) : (
            <Text>출발지 / 도착지를 선택해주세요.</Text>
          )
        }

        <Button
          style={campusStyle.Button.default}
          title={
            placeStart == null || placeEnd == null
              ? "이곳에서 출발지/도착지를 선택해주세요."
              : "출발지/도착지 재입력하기"
          }
          onPress={() => {
            navigation.navigate("지도검색", {
              bbstype: bbstype, createRoomCategory: createRoomCategory,
              createRoompersonmax: createRoompersonmax, createRoomGender: createRoomGender, date: String(date)
            });
          }}
        />
        <Text>탑승 시간</Text>
        <Text style={campusStyle.Text.center}>
          {userStore.tokoreanTime(date)}
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
              setCreateSelectGender(userStore.user.get('gender'));
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
            if (
              placeEnd == null ||
              placeStart == null
            ) {
              alert("출발지 또는 도착지를 선택해주세요.");
            } else {
              userStore.isCreate(bbstype)
                .then(r => {
                  if (r) {
                    userStore.createBbs(createRoomCategory, date, createRoompersonmax, createSelectGender, placeStart, placeEnd, cost)
                      .then(() => alert("방이 생성되었습니다. 내 채팅에서 확인해주세요."));
                  } else {
                    alert(
                      "채팅방은 카테고리별로 1개만 들어갈 수 있습니다. 내 채팅->채팅방->사람아이콘 클릭에서 채팅방 나가기를 해주세요."
                    );
                  }
                  setPlaceEnd(null);
                  setPlaceStart(null);
                  navigation.navigate('모든 채팅방 목록');
                });
            }
          }}
        />
        <Button
          name="myButtonName"
          buttonStyle={campusStyle.Button.groupCancel}
          title="취소"
          onPress={() => {
            setPlaceEnd(null);
            setPlaceStart(null);
            navigation.navigate('모든 채팅방 목록');
          }}
        />
      </View>
    </>
  );
}
