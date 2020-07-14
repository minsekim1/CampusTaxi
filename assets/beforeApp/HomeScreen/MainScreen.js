//#region imports
import React, {
  Component,
  createRef,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  CheckBox,
  Picker,
} from "react-native";
import Modal from "react-native-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  Header,
  ListItem,
  Badge,
  Icon,
  Button,
  Card,
  ButtonGroup,
} from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import campusStyle from "style";
import DateTimePicker from "@react-native-community/datetimepicker"; //방생성시간picker
import { TextInput } from "react-native-gesture-handler";
import ad from "image/ad.png";
import school from "image/school.png";
import bus from "image/bus.png";
import pen from "image/pen.png";
import study from "image/study.png";
import game from "image/game.png";
import party from "image/party.png";
import club from "image/club.png";
import ski from "image/ski.png";
import ocean from "image/ocean.png";
import crown from "image/crown.png";
//#endregion

const Stack = createStackNavigator();

function ChatFlatList(props) {
  //#region 변수 & 함수
  let firebase = require("firebase");
  let ref = firebase.database().ref();

  const myname = props.myname;
  const mygender = props.mygender;
  const bbskey = props.bbskey;
  const leadername = props.leadername;
  const [chattingData, setChattingData] = useState([]);
  const flatList = useRef();
  useEffect(() => {
    let ref = firebase.database().ref("bbs/data/" + bbskey + "/d");
    //once와 달린 on은 실시간으로 데이터를 받는다. 변경이 있을 시 채팅 내용을 계속해서 수신 받는다.
    ref.on("value", (snap) => {
      let resultarr = [];
      snap.forEach((snap) => {
        let item = snap.val();
        item.key = snap.key;
        resultarr.push(item);
      });
      setChattingData(resultarr);
      console.log(flatList.current);
    });
  }, []);
  //채팅 말풍선 Items
  function ChattingItem(props) {
    // 오후 오전 나누기
    let hour = 12; //String(time).slice(1, 2);
    const min = 11; //String(time).slice(1, 2);
    let day = "오전";
    if (hour >= 12) {
      hour -= 12;
      day = "오후";
    }

    // 방장 일경우 왕관 이미지 넣기
    let image;
    if (props.isLeader) {
      image = <Image source={crown} />;
    }

    // 스타일 지정 및 내채팅 (Reverse) 구현
    const ItemStyle = StyleSheet.create({
      item_title: {
        alignSelf: "flex-start",
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
        marginLeft: 20,
      },
      item_titleReverse: {
        alignSelf: "flex-end",
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
        marginRight: 20,
      },
      item_content: {
        fontSize: 15,
        backgroundColor: "#E5E5E8",
        borderRadius: 9,
        padding: 10,
        fontWeight: "400",
        maxWidth: wp(77),
        marginLeft: 20,
      },
      item_contentReverse: {
        fontSize: 15,
        backgroundColor: "#E5E5E8",
        borderRadius: 9,
        padding: 10,
        fontWeight: "400",
        maxWidth: wp(77),
        marginRight: 20,
      },
      item_time: {
        justifyContent: "flex-start",
        alignSelf: "flex-end",
        fontSize: 11,
        marginLeft: 5,
        marginRight: 5,
        color: "grey",
      },
      itemMain_container: {
        flexDirection: "row",
        marginBottom: 10,
      },
      itemMain_containerReverse: {
        flexDirection: "row",
        marginBottom: 10,
        justifyContent: "flex-end",
      },
    });
    let containerItem; //내 채팅일 경우 좌우반전
    if (props.isMychat) {
      containerItem = (
        <>
          <View>
            <Text style={ItemStyle.item_titleReverse}>
              {image}
              {props.name}
            </Text>
            <View style={ItemStyle.itemMain_containerReverse}>
              <Text style={ItemStyle.item_time}>
                {day} {hour}:{min}
              </Text>
              <Text style={ItemStyle.item_contentReverse}>{props.say}</Text>
            </View>
          </View>
        </>
      );
    } else {
      containerItem = (
        <>
          <View>
            <Text style={ItemStyle.item_title}>
              {image}
              {props.name}
            </Text>
            <View style={ItemStyle.itemMain_container}>
              <Text style={ItemStyle.item_content}>{props.say}</Text>
              <Text style={ItemStyle.item_time}>
                {day} {hour}:{min}
              </Text>
            </View>
          </View>
        </>
      );
    }

    return <>{containerItem}</>;
  }
  //#endregion
  return (
    <FlatList
      ref={flatList}
      data={chattingData}
      keyExtractor={(item, index) => index}
      renderItem={({ item }) => (
        <>
          <ChattingItem
            isLeader={props.leaderkey == item.db ? true : false}
            say={item.dd}
            name={item.db}
            time={item.dc}
            isMychat={props.myname == item.db ? true : false}
          />
        </>
      )}
    />
  );
}
//채팅방 화면
export function chatroomScreen({ route, navigation: { goBack } }) {
  //#region 변수들
  var firebase = require("firebase");
  var ref = firebase.database().ref();
  const bbskey = route.params.bbskey;
  const gender = route.params.gender;
  const startplace = route.params.startplace;
  const endplace = route.params.endplace;
  const leadername = route.params.leadername;
  const myname = route.params.myname;
  const mygender = route.params.mygender;

  const [textInput, setTextInput] = useState("");
  const flatList = useRef();
  // const personmember = route.params.personmember;
  // const personmax = route.params.personmax;
  // const meetingdate = route.params.meetingdate;
  //#endregion
  return (
    <>
      {/* 헤더부분 */}
      <View style={{ height: hp(20), marginBottom: 15 }}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: wp(100),
          }}
        >
          <Header
            containerStyle={{
              height: 170,
              alignItems: "stretch",
            }}
            backgroundColor={
              gender == "all"
                ? "#3A3A3A"
                : gender == "woman"
                ? "#DE22A3"
                : "#55A1EE"
            }
            leftComponent={
              <Button
                type="clear"
                title=""
                icon={<Icon name="arrow-back" size={24} color="white" />}
                onPress={() => goBack()}
              ></Button>
            }
            centerComponent={{
              text: (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 8,
                    }}
                  >
                    <Image source={crown} />
                    <Text style={campusStyle.Text.middleBold}>
                      {"  " + leadername}
                    </Text>
                  </View>
                  <Text style={campusStyle.Text.whiteInput}>
                    {"출발지:  " + startplace}
                  </Text>
                  <Text style={campusStyle.Text.whiteInput}>
                    {"도착지:  " + endplace}
                  </Text>
                </>
              ),
            }}
            rightComponent={
              <View style={campusStyle.View.row}>
                <Button
                  type="clear"
                  title=""
                  icon={<Icon name="search" size={24} color="white" />}
                  onPress={() => {
                    // setFilterVisible(true);
                  }}
                />
                <Button
                  type="clear"
                  title=""
                  icon={<Icon name="person" size={24} color="white" />}
                  onPress={() => {
                    // setSearchVisible(true);
                  }}
                />
              </View>
            }
          />
        </View>
      </View>

      {/* 채팅 내용부분 */}
      <ChatFlatList
        bbskey={bbskey}
        leadername={leadername}
        myname={myname}
        mygender={mygender}
      />
      <View style={campusStyle.View.wideWhite}>
        <View style={{ flex: 4 }}>
          <TextInput
            value={textInput}
            onChangeText={(textEntry) => {
              setTextInput(textEntry);
            }}
            ////////////////////////////////////////////////////////////////////////////////////////////////
            onSubmitEditing={() => {
              //현재 시간을 가져옵니다.
              fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
                .then((res) => res.json())
                .then((result) => {
                  //채팅 내용입니다.

                  let datatime =
                    result.datetime.slice(0, 21) +
                    result.datetime.slice(26, 32);
                  let tempchatkey = "tempchatkey";
                  let newChat = {
                    da: tempchatkey,
                    db: myname,
                    dc: datatime,
                    dd: textInput,
                  };
                  //채팅 내용 데이터를 파이어베이스에 넣습니다.
                  let newChatKey = firebase
                    .database()
                    .ref("bbs/data/" + bbskey + "/d")
                    .push(newChat);
                  //파이어베이스 임시 키값을 현재 키값으로 변경
                  tempchatkey = newChatKey.key;
                  newChat = {
                    da: tempchatkey,
                    db: myname,
                    dc: datatime,
                    dd: textInput,
                  };
                  //바뀐 키값으로 다시 올리기
                  firebase
                    .database()
                    .ref("bbs/data/" + bbskey + "/d")
                    .set(newChat);
                  //파이어베이스에 올린 버전으로 가져옵니다.
                  // firebase
                  //   .database()
                  //   .ref("bbs/data/" + bbskey + "/d")
                  //   .once("value", (snapshot) => {
                  //     let resultarr = [];
                  //     snapshot.forEach((snap) => {
                  //       let item = snap.val();
                  //       item.key = snap.key;
                  //       resultarr.push(item);
                  //     });
                  //     setChattingDate(resultarr);
                  //   });
                  //친 채팅 내용을 지웁니다.
                  setTextInput("");
                });
            }}
            ////////////////////////////////////////////////////////////////////////////////////////////////
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title="전송"
            onPress={() => {
              ////////////////////////////////////////////////////////////////////////////////////////////////
              //현재 시간을 가져옵니다.
              fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
                .then((res) => res.json())
                .then((result) => {
                  //채팅 내용입니다.
                  const datatime =
                    result.datetime.slice(0, 21) +
                    result.datetime.slice(26, 32);
                  let tempchatkey = "tempchatkey";
                  let newChat = {
                    da: tempchatkey,
                    db: myname,
                    dc: datatime,
                    dd: textInput,
                  };
                  //채팅 내용 데이터를 파이어베이스에 넣습니다.
                  let newChatKey = firebase
                    .database()
                    .ref("bbs/data/" + bbskey + "/d")
                    .push(newChat);
                  //파이어베이스 임시 키값을 현재 키값으로 변경
                  tempchatkey = newChatKey.key;
                  newChat = {
                    da: tempchatkey,
                    db: myname,
                    dc: datatime,
                    dd: textInput,
                  };
                  //바뀐 키값으로 다시 올리기
                  firebase
                    .database()
                    .ref("bbs/data/" + bbskey + "/d/" + tempchatkey)
                    .set(newChat);
                  //파이어베이스에 올린 버전으로 가져옵니다.
                  // firebase
                  //   .database()
                  //   .ref("bbs/data/" + bbskey + "/d")
                  //   .once("value", (snapshot) => {
                  //     let resultarr = [];
                  //     snapshot.forEach((snap) => {
                  //       let item = snap.val();
                  //       item.key = snap.key;
                  //       resultarr.push(item);
                  //     });
                  //     setChattingData(resultarr);
                  //   });
                  //친 채팅 내용을 지웁니다.
                  setTextInput("");
                });
              ////////////////////////////////////////////////////////////////////////////////////////////////
            }}
          >
            <Image style={campusStyle.Image.middleSize} />
          </Button>
        </View>
      </View>
    </>
  );
}
//채팅목록 화면
function chatScreen({ route, navigation, navigation: { goBack } }) {
  //#region Hooks & functions
  var firebase = require("firebase");
  var ref = firebase.database().ref();
  const filter = route.params.filter;
  //사용자 정보
  const mygender = route.params.mygender;
  const myname = route.params.myname;
  const nextRoomNumber = 1;
  const [roomList, setRoomList] = useState();
  //채팅방만들기firebase로 전송함수
  useEffect(() => {
    //bbs에서 데이터를 가져와서 firebase json 형식에서 flatlist하기 좋은 형식으로 키값을 JSON 안으로 넣는다.
    firebase
      .database()
      .ref("bbs/data")
      .once("value", function (snapshot) {
        let resultRoom = [];
        snapshot.forEach(function (snap) {
          let item = snap.val();
          item.key = snap.key;
          resultRoom.push(item);
        });
        setRoomList(resultRoom);
      });

    fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
      .then((res) => res.json())
      .then((result) => setDate(new Date(result.datetime)));
  }, []);
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

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  //한글로 형식 변환하기
  function _getLocaleStrting(date) {
    const localDate = new Date(date.toString());
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = week[localDate.getDay()];
    const result =
      localDate.getFullYear() +
      "년" +
      (localDate.getMonth() + 1) +
      "월" +
      localDate.getDate() +
      "일" +
      dayOfWeek +
      "요일" +
      localDate.getHours() +
      "시" +
      localDate.getMinutes() +
      "분";
    return result;
  }
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [filterCategory, setFilterCategory] = useState(filter);
  const [filterStartplace, setFilterStartplace] = useState("무관");
  const [filterEndplace, setFilterEndplace] = useState("무관");
  const [filterMeetingTimeStart, setFilterMeetingTimeStart] = useState("전부");
  const [filterMeetingTimeEnd, setFilterMeetingTimeEnd] = useState("전부");
  const [filterPersonMin, setFilterPersonMin] = useState("1");
  const [filterPersonMax, setFilterPersonMax] = useState("4");

  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isCreateRoomVisible, setCreateRoomVisible] = useState(false);
  const [createRoomCategory, setCreateRoomCategory] = useState(filter);
  const [createRoompersonmax, setCreateRoompersonmax] = useState(4);
  const [createRoomstartplace, setCreateRoomstartplace] = useState();
  const [createRoomendplace, setCreateRoomendplace] = useState();
  const [createRoomGender, setCreateRoomGender] = useState(1);
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
  const startplace = ["삼육대", "태릉입구"];
  const endplace = ["삼육대", "태릉입구", "별내역", "구리역"];
  const timeLineStart = [
    "00:00부터",
    "00:30부터",
    "01:00부터",
    "01:30부터",
    "02:00부터",
    "02:30부터",
    "03:00부터",
    "03:30부터",
    "04:00부터",
    "04:30부터",
    "05:00부터",
    "05:30부터",
    "06:00부터",
    "06:30부터",
    "07:00부터",
    "07:30부터",
    "08:00부터",
    "08:30부터",
    "09:00부터",
    "09:30부터",
    "10:00부터",
    "10:30부터",
    "11:00부터",
    "11:30부터",
    "12:00부터",
    "12:30부터",
    "13:00부터",
    "13:30부터",
    "14:00부터",
    "14:30부터",
    "15:00부터",
    "15:30부터",
    "16:00부터",
    "16:30부터",
    "17:00부터",
    "17:30부터",
    "18:00부터",
    "18:30부터",
    "19:00부터",
    "19:30부터",
    "20:00부터",
    "20:30부터",
    "21:00부터",
    "21:30부터",
    "22:00부터",
    "22:30부터",
    "23:00부터",
    "23:30부터",
  ];
  const timeLineEnd = [
    "00:00까지",
    "00:30까지",
    "01:00까지",
    "01:30까지",
    "02:00까지",
    "02:30까지",
    "03:00까지",
    "03:30까지",
    "04:00까지",
    "04:30까지",
    "05:00까지",
    "05:30까지",
    "06:00까지",
    "06:30까지",
    "07:00까지",
    "07:30까지",
    "08:00까지",
    "08:30까지",
    "09:00까지",
    "09:30까지",
    "10:00까지",
    "10:30까지",
    "11:00까지",
    "11:30까지",
    "12:00까지",
    "12:30까지",
    "13:00까지",
    "13:30까지",
    "14:00까지",
    "14:30까지",
    "15:00까지",
    "15:30까지",
    "16:00까지",
    "16:30까지",
    "17:00까지",
    "17:30까지",
    "18:00까지",
    "18:30까지",
    "19:00까지",
    "19:30까지",
    "20:00까지",
    "20:30까지",
    "21:00까지",
    "21:30까지",
    "22:00까지",
    "22:30까지",
    "23:00까지",
    "23:30까지",
  ];

  //#endregion Hooks & functions
  return (
    <>
      {/* 모달창 */}
      <>
        {/* 방만들기모달창 */}
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
                {startplace.map((item) => (
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
                {endplace.map((item) => (
                  <Picker.Item label={item} value={item} />
                ))}
              </Picker>
              <Text>탑승 시간</Text>
              <Text style={campusStyle.Text.center}>
                {_getLocaleStrting(date)}
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
                onPress={(index) => setCreateRoomGender(index)}
                buttons={["동성만", "남녀모두"]}
              ></ButtonGroup>
            </View>
            <View style={campusStyle.View.rowflexBtnGroup}>
              <Button
                name="myButtonName"
                buttonStyle={campusStyle.Button.groupActive}
                title="방 생성"
                onPress={() => {
                  //worldTimeAPI사용하여 서버 시간을 가져옵니다.
                  //JS의 기본적인 비동기방식을 동기방식으로 구현(async await 뺴고 then이용)
                  fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
                    .then((res) => res.json())
                    .then((result) => {
                      const datatime =
                        result.datetime.slice(0, 21) +
                        result.datetime.slice(26, 32);
                      let tempbbskey = "tempbbskey";
                      let newRoom = {
                        a: "출발 대기", //available0
                        b: tempbbskey, //bbskey1
                        c: createRoomCategory, //bbstype2
                        d: {
                          da: "SYSTEM: makeRoom",
                          db: datatime,
                          dc: myname,
                        }, //chat3
                        e: { ea: 0, eb: "" }, //cost4
                        f: datatime, //createdate5
                        g: createRoomendplace, //endplace6
                        h: createRoomGender == 0 ? mygender : "all", //gender7
                        i: myname, //leadername8
                        j: _getLocaleStrting(date), //meetingdate9
                        k: createRoompersonmax, //personmax10
                        l: { ma: myname }, //personmember11
                        m: 1, //personpresent12
                        n: createRoomstartplace, //startplace13
                      };
                      //파이어베이스에 데이터를 올립니다. push
                      let newBbsKey = firebase
                        .database()
                        .ref("bbs/data")
                        .push(newRoom);
                      //파이어베이스 임시 키값을 현재 키값으로 변경
                      tempbbskey = newBbsKey.key;
                      newRoom = {
                        a: "출발 대기", //available0
                        b: tempbbskey, //bbskey1
                        c: createRoomCategory, //bbstype2
                        d: {
                          da: "SYSTEM: makeRoom",
                          db: datatime,
                          dc: myname,
                        }, //chat3
                        e: { ea: 0, eb: "" }, //cost4
                        f: datatime, //createdate5
                        g: createRoomendplace, //endplace6
                        h: createRoomGender == 0 ? mygender : "all", //gender7
                        i: myname, //leadername8
                        j: _getLocaleStrting(date), //meetingdate9
                        k: createRoompersonmax, //personmax10
                        l: { ma: myname }, //personmember11
                        m: 1, //personpresent12
                        n: createRoomstartplace, //startplace13
                      };
                      //바뀐 키값으로 다시 올리기
                      firebase
                        .database()
                        .ref("bbs/data/" + tempbbskey)
                        .set(newRoom);
                      //roomList를 파이어베이스에 올린 버전으로 가져옵니다.
                      firebase
                        .database()
                        .ref("bbs/data")
                        .once("value", function (snapshot) {
                          let resultRoom = [];
                          snapshot.forEach(function (snap) {
                            let item = snap.val();
                            item.key = snap.key;
                            resultRoom.push(item);
                          });
                          setRoomList(resultRoom);
                        });
                      // 유저 데이터에 새로운 방 추가
                      firebase
                        .database()
                        .ref("user/data")
                        .orderByChild("c")
                        .on("child_added", function (snapshot) {
                          const userkey = snapshot.key;
                          firebase
                            .database()
                            .ref("user/data/" + userkey + "/c")
                            .push({ ca: tempbbskey, cb: 1 });
                        });
                      setCreateRoomVisible(!isCreateRoomVisible);
                    });
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
        {/* 검색모달창 */}
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
            <Button
              title="Hide modal"
              onPress={() => {
                setSearchVisible(!setSearchVisible);
              }}
            />
          </View>
        </Modal>

        {/* 필터모달창 */}
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
          </View>
        </Modal>
      </>
      {/* 채팅목록 출력부분 */}
      <View style={{ height: hp(10) }}></View>
      <FlatList
        keyExtractor={(item, index) => index}
        data={roomList}
        renderItem={({ item, index }) => {
          if (item != null && filterCategory == item.c) {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("채팅방", {
                    bbskey: item.b,
                    gender: item.h,
                    leadername: item.i,
                    startplace: item.n,
                    endplace: item.g,
                    mygender: mygender,
                    myname: myname,
                  })
                }
              >
                <Card containerStyle={campusStyle.Card.container}>
                  <ListItem
                    leftAvatar={
                      <View
                        style={{
                          borderRadius: 100,
                          width: 62,
                          height: 62,
                          backgroundColor:
                            item.h == "woman"
                              ? "#DE22A3"
                              : item.h == "man"
                              ? "#55A1EE"
                              : "#3A3A3A",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={campusStyle.Text.middleBold}>{index}</Text>
                        <Text style={campusStyle.Text.middleBold}>
                          {item.h == "woman"
                            ? "여자"
                            : item.h == "man"
                            ? "남자"
                            : "남 여"}
                        </Text>
                      </View>
                    }
                    title={
                      <View style={campusStyle.View.row}>
                        <View style={{ flex: 6 }}>
                          <View style={campusStyle.View.row}>
                            <Image source={crown} />
                            <Text>{item.i}</Text>
                          </View>
                          <Text>출발지:{item.n}</Text>
                          <Text>도착지:{item.g}</Text>
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
                        <View style={{ flex: 2, alignItems: "flex-end" }}>
                          <Text style={campusStyle.Text.grayDDark}>
                            {item.j}
                          </Text>
                          <Text style={campusStyle.Text.grayDDark}>
                            {item.a}
                          </Text>
                          <Badge
                            textStyle={campusStyle.Badge.textStyle}
                            value={0}
                            status="warning"
                          />
                        </View>
                      </View>
                    }
                  />
                </Card>
              </TouchableOpacity>
            );
          }
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: wp(100),
        }}
      >
        <Header
          containerStyle={{
            height: hp(10),
          }}
          backgroundColor="#0D3664"
          leftComponent={
            <Button
              type="clear"
              title=""
              icon={<Icon name="arrow-back" size={24} color="white" />}
              onPress={() => goBack()}
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
      </View>
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
    </>
  );
}
//#region 작업완료
//스택 네비게이션 부분
function HomeScreen() {
  return (
    <Stack.Navigator initialRouteName="홈">
      <Stack.Screen
        options={{ headerShown: false }}
        name="홈"
        component={MainScreen}
      />
      <Stack.Screen
        name="모든 채팅방 목록"
        options={{ headerShown: false }}
        component={chatScreen}
      />
      <Stack.Screen
        name="채팅방"
        options={{ headerShown: false }}
        component={chatroomScreen}
      />
    </Stack.Navigator>
  );
}

// 첫 시작 메인화면
function MainScreen({ navigation }) {
  // 메인화면 버튼 부분
  function MenuItem({ navigation, imageURL, filter }) {
    return (
      <TouchableHighlight
        style={campusStyle.View.mainItemTouchItem}
        activeOpacity={0.5}
        underlayColor="#DDDDDD"
        onPress={() =>
          navigation.navigate("모든 채팅방 목록", {
            filter: filter,
            myname: "민성",
            mygender: "man",
          })
        }
      >
        <View style={campusStyle.View.default}>
          <Image source={imageURL} style={campusStyle.Image.middleSizemb10} />
          <Text>{filter}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  return (
    <View style={campusStyle.View.container}>
      <View style={campusStyle.View.backgroundColorBlue}>
        <View>
          <View style={campusStyle.View.mainHeaderBackground}>
            <View style={campusStyle.View.row}>
              <Text style={campusStyle.Text.middleSize}> CAMPUS TAXI</Text>
            </View>
            <Text style={campusStyle.Text.mainUnivText}>
              삼육 대학교
              <Text style={campusStyle.Text.smallSize}>[서울]</Text>
            </Text>
            <Image style={campusStyle.Image.mainImage} source={ad} />
          </View>
        </View>
      </View>
      {/* 메인메뉴버튼부분 */}
      <View style={campusStyle.View.mainItemView}>
        <View style={campusStyle.View.rowflex}>
          <View style={campusStyle.View.container}>
            <MenuItem filter="등교" imageURL={bus} navigation={navigation} />
          </View>
          <View style={campusStyle.View.container}>
            <MenuItem filter="하교" imageURL={bus} navigation={navigation} />
          </View>
          <View style={campusStyle.View.container}>
            <MenuItem filter="야작" imageURL={pen} navigation={navigation} />
          </View>
        </View>

        <View style={campusStyle.View.rowflex}>
          <View style={campusStyle.View.container}>
            <MenuItem
              filter="독서실"
              imageURL={study}
              navigation={navigation}
            />
          </View>
          <View style={campusStyle.View.container}>
            <MenuItem filter="PC방" imageURL={game} navigation={navigation} />
          </View>
          <View style={campusStyle.View.container}>
            <MenuItem
              filter="놀이동산"
              imageURL={party}
              navigation={navigation}
            />
          </View>
        </View>
        <View style={campusStyle.View.rowflex}>
          <View style={campusStyle.View.container}>
            <MenuItem filter="클럽" imageURL={club} navigation={navigation} />
          </View>
          <View style={campusStyle.View.container}>
            <MenuItem filter="스키장" imageURL={ski} navigation={navigation} />
          </View>
          <View style={campusStyle.View.container}>
            <MenuItem
              filter="오션월드"
              imageURL={ocean}
              navigation={navigation}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
//#endregion 작업완료
export default HomeScreen;
