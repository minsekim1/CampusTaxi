//실제 유저들이 채팅하는 화면
export default class chatroomScreen extends Component {
  //#region 초기값
  constructor(props) {
    super(props);
    this.state = { bbs: this.props.route.params.bbs, chats: [], textInput: "" };
  }

  componentDidMount() {
    this.refresh();
    this.onGetChat;
  }
  onRef() {
    let a = setInterval(() => {
      this.flatListRef.scrollToEnd({ animated: true });
    }, 100);
    setTimeout(() => { clearInterval(a) }, 1500);
  }
  onGetChat = setInterval(()=>{
    userStore.readChats(this.state.bbs).then(r => {
      if(this.state.chats != r){this.setState({ chats: r })}})
  }, 1000);
  async endGetChat(){
    setTimeout(() => { clearInterval(this.onGetChat) }, 1500);
  }
  async refresh() {
    userStore.readChats(this.state.bbs).then(r =>{
      if(this.state.chats != r){this.setState({ chats: r })}})
    userStore.readBbs_objid(JSON.parse(JSON.stringify(this.state.bbs)).objectId).then(r => this.setState({ bbs: r }))
      .then(this.onRef());
  }
  sendMessage() {
    if (this.state.textInput != "") {
      userStore.appendChat(this.state.bbs, this.state.textInput).then(r => {
        let temp = this.state.chats;
        temp.push(r);
        this.setState({ chats: temp });
      }).then(this.onRef());
      this.setState({ textInput: "" });

    }
  }
  //#endregion
  render() {
    const { navigation } = this.props;
    // React.useEffect(() => {
    //   const unsubscribe = navigation.addListener('focus', () => {
    //     userStore.readBbs_objid(JSON.parse(JSON.stringify(this.state.bbs)).objectId).then(r => this.setState({ bbs: r }));
    //   });
    //   return unsubscribe;
    // }, [navigation]);
    const style = {
      view: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1
      },
      header: {
        color: this.state.bbs.get('gender') == 2
          ? "#3A3A3A" : this.state.bbs.get('gender') == 1
            ? "#DE22A3" : "#55A1EE",
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
                  {this.state.bbs.get('leader').get('nickname')}
                </Text>
              </View>
            </View>
            <Text style={campusStyle.Text.whiteInput}>
              출발지:{this.state.bbs.get('startplace').name}
            </Text>
            <Text style={campusStyle.Text.whiteInput}>
              도착지:{this.state.bbs.get('endplace').name}
            </Text>
            <Text style={campusStyle.Text.smallCenter}>
              {userStore.tokoreanTime(String(this.state.bbs.get('meetingdate')))} 출발예정
						</Text>
          </View>,
        leftComponent: <Button
          type="clear"
          title=""
          icon={<Ionicons name="md-arrow-back" size={24} color="white" />}
          onPress={async() => {await this.endGetChat(); navigation.goBack()}}
        ></Button>
        , rightComponent: <View style={{ flexDirection: "row" }}>
          <Button
            type="clear"
            title=""
            icon={<Ionicons name="md-refresh" size={24} color="white" />}
            onPress={() => this.refresh()}
            buttonStyle={{ marginRight: 3 }} />
          <Button
            type="clear"
            title=""
            icon={<Ionicons name="md-map" size={24} color="white" />}
            onPress={async () => {
              const url = "https://m.map.naver.com/directions/#/drive/list/"
                + encodeURI(encodeURI(this.state.bbs.get('startplace').name)) + ","
                + this.state.bbs.get('startplace').longitude + ","
                + this.state.bbs.get('startplace').latitude + ","
                + ","
                + ",false,13479509/"
                + encodeURI(encodeURI(this.state.bbs.get('endplace').name)) + ","
                + this.state.bbs.get('endplace').longitude + ","
                + this.state.bbs.get('endplace').latitude + ","
                + ","
                + ",false,11591563/2";
                await this.endGetChat();
              navigation.navigate("지도", { url: url });
            }}
            buttonStyle={{ marginRight: 3 }}
          />
          <Button
            type="clear"
            title=""
            icon={<Ionicons name="md-person" size={24} color="white" />}
            onPress={async() => { await this.endGetChat();navigation.navigate("채팅방정보", { bbs: this.state.bbs }) }}
            buttonStyle={{ marginRight: 3 }}
          />
        </View>
      }
    };
    return (
      <>
        <View style={{ height: "20%", marginBottom: 30 }}>
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
          data={this.state.chats}
          keyExtractor={(item, i) => String(i)}
          ref={(ref) => this.flatListRef = ref}
          renderItem={({ item }) => <ChattingItem item={item} bbs={this.state.bbs} />}
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
            <Button title="전송" buttonStyle={{ backgroundColor: "#1e45c7" }} onPress={() => this.sendMessage(this.state.bbs)}>
              {/* <Image style={campusStyle.Image.middleSize} /> */}
            </Button>
          </View>
        </View>
      </>
    );
  }
}

class ChattingItem extends React.PureComponent {
  render() {
    const item = this.props.item;
    const bbs = this.props.bbs;
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
    let image;
    if (bbs.get('leader').get('nickname') == item.get('user').get('nickname')) {
      image = <Image source={crown} />;
    }
    let containerItem;
    if (item.isSys == 1) {
      containerItem = (
        <View style={ItemStyle.itemSystem_Message}>
          <Text>{item.get('say')}</Text>
        </View>
      );
    } else if (item.get('isSys') == 2) {
      containerItem = (
        <View style={ItemStyle.itemSystem_Message}>
          <Text>{item.get('user').get('nickname')}{item.get('say')}</Text>
        </View>
      );
    } else if (userStore.user.get('nickname') == item.get('user').get('nickname')) {
      containerItem = (
        <View>
          <Text style={ItemStyle.item_titleReverse}>
            {image}
            {item.get('user').get('nickname')}
          </Text>
          <View style={ItemStyle.itemMain_containerReverse}>
            <Text style={ItemStyle.item_time}>
              {/* {day + " " + hour + ":" + min} */}
              {userStore.toTime(String(item.get('createdAt')))}
            </Text>
            <Text style={ItemStyle.item_contentReverse}>{item.get('say')}</Text>
          </View>
        </View>
      );
    } else {
      containerItem = (
        <View>
          <Text style={ItemStyle.item_title}>
            {image}
            {item.get('user').get('nickname')}
          </Text>
          <View style={ItemStyle.itemMain_container}>
            <Text style={ItemStyle.item_content}>{item.get('say')}</Text>
            <Text style={ItemStyle.item_time}>
              {userStore.toTime(String(item.get('createdAt')))}
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
import { Header, Button } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import campusStyle from "./campusStyle";
import { TextInput } from "react-native-gesture-handler";
import crown from "./image/crown.png";
import { userStore } from "../store/store";

