//#region imports
import React, { useState, useRef, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Header, Icon, Button } from "react-native-elements";
import campusStyle from "style";
import { TextInput } from "react-native-gesture-handler";
import crown from "image/crown.png";

//채팅방 화면
export default class chatroomScreen extends Component {
  //#region 변수들
  constructor(props) {
    super(props);
    this.state = {
      textInput: "",
      bbskey: this.props.route.params.bbskey,
      gender: this.props.route.params.gender,
      startplace: this.props.route.params.startplace,
      endplace: this.props.route.params.endplace,
      leadername: this.props.route.params.leadername,
      myname: this.props.route.params.myname,
      mygender: this.props.route.params.mygender,
      personmember: this.props.route.params.personmember,
      personmax: this.props.route.params.personmax,
      meetingdate: this.props.route.params.meetingdate,
      chattingData: {},
      flatList: false,
      time: new Date(),
    };
  }
  componentDidMount() {
    let firebase = require("firebase");
    firebase
      .database()
      .ref("bbs/data/" + this.state.bbskey + "/d")
      .on("value", (snap) => {
        let resultarr = {};
        snap.forEach((snap) => {
          let item = snap.val();
          item.key = snap.key;
          resultarr.push(item);
        });
        alert("bbs/data/" + this.state.bbskey + "/d");
        this.setState({ chattingData: resultarr });
        // this.flatListRef.scrollToEnd({ animated: true });
      });
  }
  // scrollToItem() {
  //   this.flatListRef.scrollToEnd({ animated: true });
  // }
  getServerTime() {
    fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
      .then((res) => res.json())
      .then((result) => {
        let time = result.datetime.slice(0, 21) + result.datetime.slice(26, 32);
        this.setState({ time: time });
      });
  }
  sendMessage() {
    const firebase = require("firebase");
    //현재 시간을 가져옵니다.
    this.getServerTime();
    //채팅 내용입니다.
    //채팅 내용 데이터를 파이어베이스에 넣습니다.
    let newChatKey = firebase
      .database()
      .ref("bbs/data/" + this.state.bbskey + "/d")
      .push();
    //파이어베이스 임시 키값을 현재 키값으로 변경
    //바뀐 키값으로 다시 올리기
    firebase
      .database()
      .ref("bbs/data/" + this.state.bbskey + "/d/" + newChatKey.key)
      .set({
        da: newChatKey.key,
        db: this.state.myname,
        dc: this.state.time,
        dd: this.state.textInput,
      });
    //파이어베이스에 올린 버전으로 가져옵니다.
    firebase
      .database()
      .ref("bbs/data/" + this.state.bbskey + "/d")
      .once("value", (snapshot) => {
        let resultarr = [];
        snapshot.forEach((snap) => {
          let item = snap.val();
          item.key = snap.key;
          resultarr.push(item);
        });
        this.setState({ chattingData: resultarr });
      });
    //친 채팅 내용을 지웁니다.
    this.setState({ textInput: "" });
  }

  //#endregion
  render() {
    const DATA = [
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Third Item",
      },
    ];
    const Item = ({ da }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{da}</Text>
      </View>
    );
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
      item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
    });
    alert(JSON.stringify(this.state));
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
                this.state.gender == "all"
                  ? "#3A3A3A"
                  : this.state.gender == "woman"
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
                        {"  " + this.state.leadername}
                      </Text>
                    </View>
                    <Text style={campusStyle.Text.whiteInput}>
                      {"출발지:  " + this.state.startplace}
                    </Text>
                    <Text style={campusStyle.Text.whiteInput}>
                      {"도착지:  " + this.state.endplace}
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
        {/* <FlatList
          data={this.state.chattingData}
          renderItem={({ item }) => <Text>asd</Text>}
          keyExtractor={(item) => item.da}
          ref={(ref) => {
            this.flatListRef = ref;
          }}
        /> */}

        {/* <FlatList
          // ref={(ref) => {
          //   this.flatListRef = ref;
          // }}
          data={this.state.chattingData}
          keyExtractor={(item) => item.da}
          renderItem={({ item }) => (
            <Text>asd</Text>
            <ChattingItem
              isLeader={this.state.leaderkey == item.db ? true : false}
              say={item.dd}
              name={item.db}
              time={item.dc}
              isMychat={this.state.myname == item.db ? true : false}
            />
          )}
        /> */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
          }}
        >
          <View style={campusStyle.View.wideWhite}>
            <View style={{ flex: 4 }}>
              <TextInput
                value={this.state.textInput}
                onChangeText={(textEntry) => {
                  this.setState({ textInput: textEntry });
                }}
                onSubmitEditing={() => this.sendMessage()}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button title="전송" onPress={() => this.sendMessage()}>
                <Image style={campusStyle.Image.middleSize} />
              </Button>
            </View>
          </View>
        </View>
      </>
    );
  }
}

class ChattingItem extends React.PureComponent {
  render() {
    const isLeader = this.props.leaderkey;
    const say = this.props.say;
    const name = this.props.name;
    const time = this.props.time;
    const isMychat = this.props.isMychat;

    let month = new Date(time).getMonth() + 1;
    let date = new Date(time).getDate();

    // 오후 오전 나누기
    const now = new Date();
    let hour = now.getHours().toString();
    const min = now.getMinutes().toString();
    let day = "오전";
    if (hour >= 12) {
      hour -= 12;
      day = "오후";
    }

    // 방장 일경우 왕관 이미지 넣기
    let image;
    if (isLeader) {
      image = <Image source={crown} />;
    }

    // 스타일 지정 및 내채팅 (Reverse) 구현

    let containerItem; //내 채팅일 경우 좌우반전

    // {now.getFullYear().toString()}
    //getMonth +1 월
    //getDate 일
    //getDay 요일(0:일, 1:월 ...)
    //getHours 0-23
    //getMinutes() 0-59
    if (name == "SYSTEM") {
      containerItem = (
        <View style={ItemStyle.itemSystem_Message}>
          <Text>{say}</Text>
        </View>
      );
    } else if (isMychat) {
      containerItem = (
        <View>
          <Text style={ItemStyle.item_titleReverse}>
            {image}
            {name}
          </Text>
          <View style={ItemStyle.itemMain_containerReverse}>
            <Text style={ItemStyle.item_time}>
              {day + " " + hour + ":" + min}
            </Text>
            <Text style={ItemStyle.item_contentReverse}>{say}</Text>
          </View>
        </View>
      );
    } else {
      containerItem = (
        <View>
          <Text style={ItemStyle.item_title}>
            {image}
            {name}
          </Text>
          <View style={ItemStyle.itemMain_container}>
            <Text style={ItemStyle.item_content}>{say}</Text>
            <Text style={ItemStyle.item_time}>
              {day + " " + hour + ":" + min}
            </Text>
          </View>
        </View>
      );
    }
    return <>{containerItem}</>;
  }
}

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
  itemSystem_Message: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center",
    fontSize: 15,
    padding: 10,
    fontWeight: "400",
  },
});
