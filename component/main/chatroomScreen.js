//실제 유저들이 채팅하는 화면

export default class chatroomScreen extends Component {
  //#region 초기값
  constructor(props) {
    super(props);
    this.state = {
      personmember: this.props.route.params.bbs.personmember,
      bbs: this.props.route.params.bbs,
      textInput: "",
    };
  }
  componentDidMount() {
    userStore.login("loginid 1", "loginpassword 1");
    userStore.getBbs(this.props.route.params.bbs.bbsid).then(r => this.setState({ bbs: r }));
  }
  async sendMessage(bbs) {
    //alert(this.state.bbsStore.bbs.bbskey.h);
    if (this.state.textInput != "") {
      await userStore.appendChat(bbs, this.state.textInput).then(r => this.setState({ bbs: r })); //채팅 데이터를 넣습니다.
      this.setState({ textInput: "" }); //Input의 채팅 내용을 지웁니다.
      this.flatListRef.scrollToEnd({ animated: true }); // 채팅을 가장 아래로 내립니다.
    }
  }
  //#endregion
  render() {
    const { navigation } = this.props;
    const style = {
      view: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1
      },
      header: {
        color: this.state.bbs.gender == 2
          ? "#3A3A3A"
          : this.state.bbs.gender == 1
            ? "#DE22A3"
            : "#55A1EE",
        container: {
          height: 170,
          alignItems: "stretch"
        },
        centerComponent:
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View style={campusStyle.View.top5}>
              <View style={campusStyle.View.row}>
                <Image
                  source={crown}
                  style={{ width: 23, height: 15, marginTop: 3 }}
                />
                <Text style={campusStyle.Text.middleBold}>
                  {this.state.bbs.leardername}
                </Text>
              </View>
            </View>
            <Text style={campusStyle.Text.whiteInput}>
              출발지:{this.state.bbs.startplace}
            </Text>
            <Text style={campusStyle.Text.whiteInput}>
              도착지:{this.state.bbs.endplace}
            </Text>
            <Text style={campusStyle.Text.smallCenter}>
              {this.state.bbs.meetingdate} 출발예정
						</Text>
          </View>,
        leftComponent: <Button
          type="clear"
          title=""
          icon={<Icon name="arrow-back" size={24} color="white" />}
          onPress={() => navigation.goBack()}
        ></Button>
        , rightComponent: <View style={campusStyle.View.row}>
          <Button
            type="clear"
            title=""
            icon={<Icon name="map" size={24} color="white" />}
            onPress={() => {
              navigation.navigate("지도", {
                url:
                  "https://m.map.naver.com/directions/#/publicTransit/detail/%25ED%2583%259C%25EB%25A6%2589%25EC%259E%2585%25EA%25B5%25AC%25EC%2597%25AD%25206%25ED%2598%25B8%25EC%2584%25A0,127.0747201,37.6173467,127.0744909,37.6174622,false,13479509/%25EC%2582%25BC%25EC%259C%25A1%25EB%258C%2580%25ED%2595%2599%25EA%25B5%2590,127.1042695,37.6429793,127.1074000,37.6386000,false,11591563/0/0/map/0",
              });
            }}
          />
          <Button
            type="clear"
            title=""
            icon={<Icon name="person" size={24} color="white" />}
            onPress={() => {
              navigation.navigate("채팅방정보", {
                bbsid: this.state.bbs.bbsid,
              });
            }}
          />
        </View>
      }
    };
    return (
      <>
        <View style={{ height: "20%", marginBottom: 15 }}>
          <View
            style={style.view}
          >
            <Header
              containerStyle={style.header.container}
              backgroundColor={style.header.color}
              leftComponent={style.header.leftComponent}
              centerComponent={style.header.centerComponent}
              rightComponent={style.header.rightComponent}
            />
          </View>
        </View>
        {/* 채팅 내용부분 */}
        <FlatList
          data={this.state.bbs.chats}
          keyExtractor={(item, i) => String(i)}
          ref={(ref) => {
            this.flatListRef = ref;
          }}
          renderItem={({ item }) => (
            <ChattingItem
              isLeader={this.state.bbs.leardername == item.nickname ? true : false}
              isMychat={userStore.user.nickname == item.nickname ? true : false}
              item={item}
            />
          )}
        />
        {/* 채팅 Input 부분 */}
        <View style={campusStyle.View.wideWhite}>
          <View style={{ flex: 4 }}>
            <TextInput
              value={this.state.textInput}
              onChangeText={(textEntry) => {
                this.setState({ textInput: textEntry });
              }}
              onSubmitEditing={() => this.sendMessage(this.state.bbs)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button title="전송" onPress={() => this.sendMessage(this.state.bbs)}>
              <Image style={campusStyle.Image.middleSize} />
            </Button>
          </View>
        </View>
      </>
    );
  }
}

class ChattingItem extends React.PureComponent {
  render() {
    const isLeader = this.props.isLeader;
    const item = this.props.item;
    const isMychat = this.props.isMychat;
    // const now = new Date(item.time);
    // let hour = now.getHours().toString();
    // let min = now.getMinutes().toString();
    // if (min.length == 1) min = "0" + min;
    // let day = "오전";
    // if (hour >= 12) {
    //   if (hour != 12) hour -= 12;
    //   day = "오후";
    // }
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
        maxWidth: "77%",
        marginLeft: 20,
      },
      item_contentReverse: {
        fontSize: 15,
        backgroundColor: "#E5E5E8",
        borderRadius: 9,
        padding: 10,
        fontWeight: "400",
        maxWidth: "77%",
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
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: "center",
        alignSelf: "center",
        fontSize: 15,
        padding: 10,
        fontWeight: "400",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        borderRadius: 10,
      },
    });
    // 방장 일경우 왕관 이미지 넣기
    let image;
    if (isLeader) {
      image = <Image source={crown} />;
    }
    let containerItem; //내 채팅일 경우 좌우반전
    //getMonth +1 월
    //getDate 일
    //getDay 요일(0:일, 1:월 ...)
    //getHours 0-23
    //getMinutes() 0-59
    if (item.isSys == 1) {
      containerItem = (
        <View style={ItemStyle.itemSystem_Message}>
          <Text>{item.say}</Text>
        </View>
      );
    } else if (item.isSys == 2) {
      containerItem = (
        <View style={ItemStyle.itemSystem_Message}>
          <Text>{item.nickname}{item.say}</Text>
        </View>
      );
    } else if (isMychat) {
      containerItem = (
        <View>
          <Text style={ItemStyle.item_titleReverse}>
            {image}
            {item.nickname}
          </Text>
          <View style={ItemStyle.itemMain_containerReverse}>
            <Text style={ItemStyle.item_time}>
              {/* {day + " " + hour + ":" + min} */}
              {item.time}
            </Text>
            <Text style={ItemStyle.item_contentReverse}>{item.say}</Text>
          </View>
        </View>
      );
    } else {
      containerItem = (
        <View>
          <Text style={ItemStyle.item_title}>
            {image}
            {item.nickname}
          </Text>
          <View style={ItemStyle.itemMain_container}>
            <Text style={ItemStyle.item_content}>{item.say}</Text>
            <Text style={ItemStyle.item_time}>
              {/* {day + " " + hour + ":" + min} */}
              {item.time}
            </Text>
          </View>
        </View>
      );
    }
    return <>{containerItem}</>;
  }
}
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { Header, Icon, Button } from "react-native-elements";
import campusStyle from "./campusStyle";
import { TextInput } from "react-native-gesture-handler";
import crown from "./image/crown.png";
import { userStore } from "../store/store";
