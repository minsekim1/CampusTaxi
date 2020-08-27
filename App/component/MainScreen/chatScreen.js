//#region imports
import React, { useState, useEffect } from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-community/picker";
import Modal from "react-native-modal";
import * as TimeAPI from '../Email/globalTimeAPI.js'
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
import campusStyle from "style";
import DateTimePicker from "@react-native-community/datetimepicker"; //방생성시간picker
import crown from "image/crown.png";
const firebase = require("firebase");
import { bbsStore, userStore } from "store";
import { Observer } from "mobx-react";
//#endregion
//채팅목록 화면
export default function chatScreen({ route, navigation }) {
  //#region Hooks & functions
  const userkey = userStore.user.f;
  bbsStore.asyncAllBbs();
  useEffect(() => {
    placeUpdate();
  }, [userkey]);
  const filter = route.params.filter;
  const [roomList, setRoomList] = useState(bbsStore.bbs);

  //#region 유저정보 업데이트
  const [myname, setname] = useState(userStore.user.h);
  const [mygender, setgender] = useState(userStore.user.d);
  //유저가 들어간 채팅방의 개수를 알려줍니다.
  const [myRoomCount, setMyRoomCount] = useState(0);
  async function checkUserEnterChatRoom() {
    //userStore.user.c
    return myRoomCount;
  }
  //#endregion
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [filterCategory, setFilterCategory] = useState(filter);
  const [filterStartplace, setFilterStartplace] = useState("무관");
  const [filterEndplace, setFilterEndplace] = useState("무관");
  const [filterMeetingTimeStart, setFilterMeetingTimeStart] = useState("전부");
  const [filterMeetingTimeEnd, setFilterMeetingTimeEnd] = useState("전부");
  const [filterPersonMin, setFilterPersonMin] = useState("1");
  const [filterPersonMax, setFilterPersonMax] = useState("4");
  // -- Filter function start
  function search(user){
    return Object.keys(this).every((key) => user[key] === this[key]);
  }

  function getFiltferBbs() {
    let result;
    result = bbsStore.bbs;

    let query = {
      c: filterCategory,
    };
    query.h = Number(filterPersonMin);
    query.k = Number(filterPersonMax);
    if (!(filterStartplace=="무관")) {
      query.n = filterStartplace;
    }
    if (!(filterEndplace=="무관")) {
      query.g = filterEndplace;
    }
    if (!(filterMeetingTimeStart == "전부")) {
      let filterMeetingTimeStart_time = TimeAPI.timetoint(filterMeetingTimeStart);
      result = result.filter(result => TimeAPI.hourandminute(result.f) > filterMeetingTimeStart_time);
    }
    if (!(filterMeetingTimeEnd == "전부")) {
      let filterMeetingTimeEnd_time = TimeAPI.timetoint(filterMeetingTimeEnd);
      result = result.filter(result => TimeAPI.hourandminute(result.f) < filterMeetingTimeEnd_time);
    }

    result = result.filter(search, query);
    setRoomList(result);
  }
  // -- Filter function end

  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isCreateRoomVisible, setCreateRoomVisible] = useState(false);
  const [createRoomCategory, setCreateRoomCategory] = useState(filter);
  const [createRoompersonmax, setCreateRoompersonmax] = useState(4);
  const [createRoomstartplace, setCreateRoomstartplace] = useState(
    anotherStore.placeStart
  );
  const [createRoomendplace, setCreateRoomendplace] = useState();
  const [createRoomGender, setCreateRoomGender] = useState(1);
  const [createSelectGender, setCreateSelectGender] = useState(2);

  const [startplace, setStartplace] = useState([]);
  const [endplace, setEndplace] = useState([]);
  //endplace와 startplace를 서버데이터로 업데이트합니다.
  function placeUpdate() {
    anotherStore.getPlaceOnce();
    setStartplace(anotherStore.placeStart);
    setEndplace(anotherStore.placeEnd);
  }

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

  const showDatepicker = () => showMode("date");
  const showTimepicker = () => showMode("time");
  const timeLineStart = [
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];
  const timeLineEnd = [
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];
  //#endregion Hooks & functions
  return (
    <>
      <Header
        containerStyle={{
          height: 64,
        }}
        backgroundColor="#0D3664"
        leftComponent={
          <Button
            type="clear"
            title=""
            icon={<Icon name="arrow-back" size={24} color="white" />}
            onPress={() => navigation.goBack()}
          ></Button>
        }
        centerComponent={{
          text: "모든 채팅방 목록",
          style: campusStyle.Text.middleBold,
        }}
        rightComponent={
          <View style={campusStyle.View.row}>
            <Button
              type="clear"
              title=""
              icon={<Icon name="filter-list" size={24} color="white" />}
              onPress={() => {
                setFilterVisible(true);
              }}
            />
            <Button
              type="clear"
              title=""
              icon={<Icon name="search" size={24} color="white" />}
              onPress={() => {
                setSearchVisible(true);
              }}
            />
          </View>
        }
      />
      {/* 채팅목록 출력부분 */}
      <Observer>
        {() => (
          <FlatList
            keyExtractor={(item) => item.b}
            data={bbsStore.bbs}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (true) {
                      //checkUserEnterChatRoom() < 2
                      firebase
                        .database()
                        .ref("bbs/data/" + item.b + "/l/" + userStore.userkey)
                        .set(1);
                      firebase
                        .database()
                        .ref("user/data/" + userStore.userkey + "/c/" + item.b)
                        .set(1);
                      navigation.navigate("채팅방", {
                        bbskey: item.b,
                        gender: item.h,
                        leadername: item.i,
                        startplace: item.n,
                        endplace: item.g,
                        mygender: mygender,
                        myname: myname,
                        meetingdate: item.j,
                        personmember: item.i,
                        personmax: item.k,
                      });
                    } else {
                      alert(
                        "채팅방은 최대 1개만 들어갈 수 있습니다. 내 채팅->채팅방->사람아이콘 클릭 에서 채팅방 나가기를 해주세요."
                      );
                    }
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
                          style={{ width: 23, height: 15, marginLeft: 10 }}
                          source={crown}
                        />
                        <Text>{item.i}</Text>
                      </View>
                      <Text style={{ marginLeft: 10 }}>출발지:{item.n}</Text>
                      <Text style={{ marginLeft: 10 }}>도착지:{item.g}</Text>
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
                        {anotherStore.toLocal(item.f)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </Observer>

      {/* 방만들기 버튼부분 */}
      <View style={campusStyle.View.createRoomView}>
        <TouchableOpacity
          style={campusStyle.Button.createRoomBtn}
          onPress={() => {
            setCreateRoomVisible(!isCreateRoomVisible);
          }}
        >
          <Icon name="add" size={32} color="white" />
          <Text style={campusStyle.Text.smallSize}>방만들기</Text>
        </TouchableOpacity>
      </View>
      {/* 모달창 */}
      {/* 방만들기모달창 */}
      {isCreateRoomVisible ? (
        <Modal
          backdropColor="rgba(0,0,0,0)"
          isVisible={isCreateRoomVisible}
          style={campusStyle.Modal.modalStyle}
        >
          <View style={campusStyle.Modal.view}>
            <Header
              containerStyle={campusStyle.Modal.container}
              centerComponent={{
                text: "방만들기",
                style: campusStyle.Modal.component,
              }}
            />
            <View style={{ padding: 10 }}>
              <Text>카테고리</Text>
              <Picker
                selectedValue={createRoomCategory}
                onValueChange={(itemValue) => {
                  setCreateRoomCategory(itemValue);
                }}
              >
                <Picker.Item color="gray" label={filter} />
                {menuList.map((item) =>
                  item != filter ? (
                    <Picker.Item label={item} value={item} />
                  ) : null
                )}
              </Picker>
              <Text>출발장소</Text>
              <Picker
                selectedValue={createRoomstartplace}
                onValueChange={(itemValue) => {
                  setCreateRoomstartplace(itemValue);
                }}
              >
                <Picker.Item value="" label="출발장소를 선택해주세요." />
                {anotherStore.placeStart.map((item) => (
                  <Picker.Item label={item} value={item} />
                ))}
              </Picker>
              <Text>도착장소</Text>
              <Picker
                selectedValue={createRoomendplace}
                onValueChange={(itemValue) => {
                  setCreateRoomendplace(itemValue);
                }}
              >
                <Picker.Item value="" label="도착장소를 선택해주세요." />
                {anotherStore.placeEnd.map((item) => (
                  <Picker.Item label={item} value={item} />
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
                  if (
                    createRoomendplace == null ||
                    createRoomstartplace == null
                  ) {
                    alert("출발지 또는 도착지를 선택해주세요.");
                  } else {
                    bbsStore.addBbs(
                      createRoomCategory,
                      createRoomendplace,
                      createSelectGender,
                      userStore.user.i,
                      date,
                      createRoompersonmax,
                      createRoomstartplace,
                      userStore.userkey
                    );
                    setCreateRoomVisible(!isCreateRoomVisible);
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
        </Modal>
      ) : null}

      {/* 검색모달창 */}
      {isSearchVisible ? (
        <Modal
          backdropColor="rgba(0,0,0,0)"
          isVisible={isSearchVisible}
          style={campusStyle.Modal.modalStyle}
        >
          <View style={campusStyle.Modal.view}>
            <Header
              containerStyle={campusStyle.Modal.container}
              centerComponent={{
                text: "검색",
                style: campusStyle.Modal.component,
              }}
            />
            <Input type="text" name="Search" autoFocus />
            <Button
              title="Hide modal"
              onPress={() => {
                setSearchVisible(!setSearchVisible);
              }}
            />
          </View>
        </Modal>
      ) : null}
      {/* 필터모달창 */}
      {isFilterVisible ? (
        <Modal
          backdropColor="rgba(0,0,0,0)"
          isVisible={isFilterVisible}
          style={campusStyle.Modal.modalStyle}
        >
          <View style={campusStyle.Modal.view}>
            <Header
              containerStyle={campusStyle.Modal.container}
              centerComponent={{
                text: "필터",
                style: campusStyle.Modal.component,
              }}
            />
            <View style={{ padding: 10 }}>
              <Text>카테고리</Text>
              <Picker
                selectedValue={filterCategory}
                style={{ height: 50 }}
                onValueChange={(itemValue) => {
                  setFilterCategory(itemValue);
                }}
              >
                <Picker.Item label="등교" value="등교" />
                <Picker.Item label="하교" value="하교" />
                <Picker.Item label="야작" value="야작" />
                <Picker.Item label="독서실" value="독서실" />
                <Picker.Item label="PC방" value="PC방" />
                <Picker.Item label="놀이동산" value="놀이동산" />
                <Picker.Item label="클럽" value="클럽" />
                <Picker.Item label="스키장" value="스키장" />
                <Picker.Item label="오션월드" value="오션월드" />
              </Picker>
              <Text>출발장소</Text>
              <Picker
                selectedValue={filterStartplace}
                style={{ height: 50 }}
                onValueChange={(itemValue) => {
                  setFilterStartplace(itemValue);
                }}
              >
                <Picker.Item label="무관" value="무관" />
                {startplace.map((item) => (
                  <Picker.Item label={item} value={item} />
                ))}
              </Picker>
              <Text>도착장소</Text>
              <Picker
                selectedValue={filterEndplace}
                style={{ height: 50 }}
                onValueChange={(itemValue) => {
                  setFilterEndplace(itemValue);
                }}
              >
                <Picker.Item label="무관" value="무관" />
                {endplace.map((item) => (
                  <Picker.Item label={item} value={item} />
                ))}
              </Picker>
              <Text>탑승시간</Text>
              <View style={campusStyle.View.row}>
                <View style={campusStyle.View.flex}>
                  <Picker
                    selectedValue={filterMeetingTimeStart}
                    onValueChange={(itemValue) => {
                      setFilterMeetingTimeStart(itemValue);
                    }}
                  >
                    <Picker.Item label="전부" value="전부" />
                    {timeLineStart.map((item) => (
                      <Picker.Item label={item} value={item} />
                    ))}
                  </Picker>
                </View>
                <View style={campusStyle.View.flex}>
                  <Picker
                    selectedValue={filterMeetingTimeEnd}
                    onValueChange={(itemValue) => {
                      setFilterMeetingTimeEnd(itemValue);
                    }}
                  >
                    <Picker.Item label="전부" value="전부" />
                    {timeLineEnd.map((item) => (
                      <Picker.Item label={item} value={item} />
                    ))}
                  </Picker>
                </View>
              </View>
              <Text>탑승인원</Text>
              <View style={campusStyle.View.row}>
                <View style={campusStyle.View.flex}>
                  <Picker
                    selectedValue={filterPersonMin}
                    onValueChange={(itemValue) => {
                      setFilterPersonMin(itemValue);
                    }}
                  >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                  </Picker>
                </View>
                <View style={campusStyle.View.flex}>
                  <Picker
                    selectedValue={filterPersonMax}
                    onValueChange={(itemValue) => {
                      setFilterPersonMax(itemValue);
                    }}
                  >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                  </Picker>
                </View>
              </View>
            </View>
            <Button
              title="Hide modal"
              onPress={() => {
                setFilterVisible(!isFilterVisible);
              }}
            />
            <Button title="Check" onPress={getFiltferBbs} />
          </View>
        </Modal>
      ) : null}
    </>
  );
}

//#region imports
import React, { useState, useEffect } from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-community/picker";
import Modal from "react-native-modal";
import * as TimeAPI from "../Email/globalTimeAPI.js";
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
import campusStyle from "style";
import DateTimePicker from "@react-native-community/datetimepicker"; //방생성시간picker
import crown from "image/crown.png";
const firebase = require("firebase");
import { bbsStore, userStore, anotherStore } from "store";
import { Observer } from "mobx-react";
//#endregion
