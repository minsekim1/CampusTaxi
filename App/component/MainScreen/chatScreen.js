//채팅목록 화면
export default function chatScreen({ route, navigation }) {
  //#region Hooks & functions
  const userkey = userStore.user.f;
  const filter = route.params.filter;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      userStore.asyncUser();
      userStore.asyncuserbbs();
      bbsStore.asyncTypeBbs(filter);
      bbsStore.asyncAllBbs();
    });

    return unsubscribe;
  }, []);

  //#region 유저정보 업데이트
  const myname = userStore.user.i;
  const mygender = userStore.user.d;
  async function checkUserEnterChatRoom(bbsGender, bbskey, filter) {
    if (bbsGender != 2 && userStore.user.d != bbsGender) {
      //2: 모든 성별도아니고 or 게시판과 같은 성별도 아닐경우
      alert("성별 제한이 걸려있습니다.");
      return false;
    } else {
      let result = true;
      if (userStore.user.c != "undefined") {
        for (const [key, value] of Object.entries(userStore.user.c)) {
          if (value == 1 && bbskey != key) {
            //접속한 방 중에서 다른 방을 조사
            for (const [bkey, bvalue] of Object.entries(bbsStore.bbs[0])) {
              if (bkey == "c" && bvalue == filter) {
                result = false;
              }
            }
          }
        } //
        if (!result)
          alert(
            "채팅방은 카테고리별로 1개만 들어갈 수 있습니다. 내 채팅->채팅방->사람아이콘 클릭에서 채팅방 나가기를 해주세요."
          );
      } else {
        alert("삭제된 방입니다.");
        return false;
      }
      return result;
    }
    //userStore.user.c
    //return myRoomCount;
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
  function search(user) {
    return Object.keys(this).every((key) => user[key] === this[key]);
  }
  function getFiltferBbs() {
    let result;

    result = bbsStore.typebbs;

    let query = {
      c: filterCategory,
    };
    query.h = Number(filterPersonMin);
    query.k = Number(filterPersonMax);
    if (!(filterStartplace == "무관")) {
    }
    if (!(filterEndplace == "무관")) {
      query.g = filterEndplace;
    }
    if (!(filterMeetingTimeStart == "전부")) {
      let filterMeetingTimeStart_time = TimeAPI.timetoint(
        filterMeetingTimeStart
      );
      result = result.filter(
        (result) =>
          TimeAPI.hourandminute(result.f) > filterMeetingTimeStart_time
      );
    }
    if (!(filterMeetingTimeEnd == "전부")) {
      let filterMeetingTimeEnd_time = TimeAPI.timetoint(filterMeetingTimeEnd);
      result = result.filter(
        (result) => TimeAPI.hourandminute(result.f) < filterMeetingTimeEnd_time
      );
    }

    result = result.filter(search, query);

    bbsStore.setbbs(result);
    //setRoomList(result);
  }
  // -- Filter function end
  const [isSearchVisible, setSearchVisible] = useState(false);
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
  const [loading, setLoadingModal] = useState(false);
  return (
    <>
      {loading == false ? (
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
              text: filter + " 채팅방 목록",
              style: campusStyle.Text.middleBold,
            }}
            // rightComponent={
            //   <View style={campusStyle.View.row}>
            //     <Button
            //       type="clear"
            //       title=""
            //       icon={<Icon name="filter-list" size={24} color="white" />}
            //       onPress={() => {
            //         setFilterVisible(true);
            //       }}
            //     />
            //     <Button
            //       type="clear"
            //       title=""
            //       icon={<Icon name="search" size={24} color="white" />}
            //       onPress={() => {
            //         setSearchVisible(true);
            //       }}
            //     />
            //   </View>
            // }
          />
          {/* 채팅목록 출력부분 */}
          <Observer>
            {() => {
              return (
                <ScrollView>
                  {bbsStore.typebbs.map((item, TouchableOpacityKey) => (
                    <TouchableOpacity
                      key={TouchableOpacityKey}
                      onPress={async () => {
                        let isEnter = await checkUserEnterChatRoom(
                          item.h,
                          item.b,
                          filter
                        );
                        if (isEnter) {
                          bbsStore.enterBbs(userStore.userkey, item.b);
                          navigation.navigate("채팅방", {
                            bbskey: item.b,
                            gender: item.h,
                            leadername: item.i,
                            startplace: item.n,
                            endplace: item.g,
                            mygender: mygender,
                            myname: myname,
                            meetingdate: item.j,
                            personmax: item.k,
                          });
                        }
                      }}
                      style={{
                        backgroundColor: "white",
                        padding: 10,
                      }}
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
                            {TouchableOpacityKey}
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
                            출발지:{item.n.name}
                          </Text>
                          <Text style={{ marginLeft: 10 }}>
                            도착지:{item.g.name}
                          </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          {(() => {
                            if (item.l != null) {
                              let presentMemberCount = bbsStore.countMember(
                                item.l
                              );
                              if (item.k <= presentMemberCount)
                                return (
                                  <Text style={campusStyle.Text.red}>
                                    {presentMemberCount}/{item.k}
                                  </Text>
                                );
                              else
                                return (
                                  <Text>
                                    {presentMemberCount}/{item.k}
                                  </Text>
                                );
                            }
                          })()}
                        </View>
                        <View style={{ flex: 3, alignItems: "center" }}>
                          <Text style={campusStyle.Text.grayDDark}>
                            탑승시간▼
                          </Text>
                          <Text style={campusStyle.Text.grayDDark}>
                            {anotherStore.toRoomTime(item.j)}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              );
            }}
          </Observer>

          {/* 방만들기 버튼부분 */}
          <View style={campusStyle.View.createRoomView}>
            <TouchableOpacity
              style={campusStyle.Button.createRoomBtn}
              onPress={() =>
                navigation.navigate("방 만들기", {
                  filter: filter,
                })
              } //setCreateRoomVisible(!isCreateRoomVisible);
            >
              <Icon name="add" size={32} color="white" />
              <Text style={campusStyle.Text.smallSize}>방만들기</Text>
            </TouchableOpacity>
          </View>
          {/* 모달창
          검색모달창
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
          필터모달창
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

                  <Text>도착장소</Text>

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
          ) : null} */}
        </>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
}

//#region imports
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
import crown from "image/crown.png";
const firebase = require("firebase");
import { bbsStore, userStore, anotherStore } from "store";
import { Observer } from "mobx-react";
import LoadingComponent from "../Login/LoadingComponent";
//#endregion
