//실제 유저들이 채팅하는 화면
const { AsyncStorage } = require('react-native');
const Parse = require('parse/react-native');
Parse.setAsyncStorage(AsyncStorage);
Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'QIxx0z05s7WTf8IDw3vejf6IBS2Zi6n29e8UOUtE', // This is your Application ID
  'tlWTYuPFV70yWFnSGPni91d1zL1etwwCIwYqDh3m' // This is your Javascript key
);
const client = new Parse.LiveQueryClient({
  applicationId: 'QIxx0z05s7WTf8IDw3vejf6IBS2Zi6n29e8UOUtE',
  serverURL: 'wss://' + 'chatting.b4a.io',
  javascriptKey: 'tlWTYuPFV70yWFnSGPni91d1zL1etwwCIwYqDh3m'
});
export default class chatroomScreen extends Component {
  //#region 초기값
  constructor(props) {
    super(props);
    this.state = {
      bbs: this.props.route.params.bbs, chats: [], textInput: "", showMenu: false,
      showMenu_x: new Animated.Value(wp(100)), showPopover: false, popNickname: null, popIsmandate: false
    };
    console.log("client open");
    client.open();
    var query = new Parse.Query('chat');
    query.equalTo('bbs', this.props.route.params.bbs);
    var subscription = client.subscribe(query);
    subscription.on('create', (r) => {
      if (typeof r == 'object') {
        this.setState({ chats: [...this.state.chats, r] },
          () => setTimeout(() => this.onRef(), 1000)
        )
      }
    })
    //open/create/update/enter/leave/delete/close
    subscription.on('delete', () =>
      userStore.readChats(this.props.route.params.bbs).then(r => this.setState({ chats: r })))
  }
  componentDidMount() {
    userStore.readChats(this.props.route.params.bbs).then(r => this.setState({ chats: r }, () => this.onRef()));
    setTimeout(() => this.onRef(), 3000);
  }
  showMenu = () => {
    Animated.timing(
      this.state.showMenu_x, {
      toValue: 0,
      duration: 200,
      delay: 0,
      easing: Easing.ease,
      useNativeDriver: true
    }).start();
  }
  hideMenu = () => {
    Animated.timing(
      this.state.showMenu_x, {
      toValue: wp(100),
      duration: 200,
      delay: 0,
      useNativeDriver: true
    }).start(() => {
      this.setState({ showMenu: !this.state.showMenu })
    });
  }
  onRef() {
    if (!!this.flatListRef && !!this.flatListRef.scrollToEnd)
      this.flatListRef.scrollToEnd({ animated: true });
    console.log("onref");
  }
  async endChat() {
    console.log("clinet close");
    client.close();
  }
  sendMessage() {
    if (this.state.textInput != "") {
      this.setState({ textInput: "" });
      userStore.appendChat(this.state.bbs, this.state.textInput)
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
        color: this.state.bbs.get('gender') == 2
          ? "#3A3A3A" : this.state.bbs.get('gender') == 1
            ? "#DE22A3" : "#55A1EE",
      }
    };
    const _getStyle = () => {
      return {
        backgroundColor: "rgba(100,100,100,0.5)",
        width: wp(200),
        position: "absolute",
        right: 0,
        zIndex: 2,
        height: hp(100),
        transform: [
          { translateX: this.state.showMenu_x },
        ]
      }
    }

    const chatroomScreen_style = StyleSheet.create({
      background: {
        width: wp(100),
        height: hp(100),
      },
      menu_text: {
        fontSize: 18,
        margin: 10,
      },
      menu: {
        backgroundColor: "white",
        width: wp(70),
        right: 0,
        position: "absolute",
        zIndex: 3,
        height: hp(100),
      },
      menu_back: {

      },
      menu_btnC: {
        marginLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0"
      },
    });
    function ft_showMap() {
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
      this.endChat();
      navigation.navigate("지도", { url: url });
    };
    const ft_callTaxi = () => {
      let url = "https://t.kakao.com/launch?type=taxi" +
        "&origin_lat=" + this.state.bbs.get('startplace').latitude +
        "&origin_lng=" + this.state.bbs.get('startplace').longitude +
        "&dest_lat=" + this.state.bbs.get('endplace').latitude +
        "&dest_lng=" + this.state.bbs.get('endplace').longitude
      Linking.openURL(url)
    };
    const ft_kick = (bbs, userNickname) => {
      this.hideMenu();
      this.setState({ showPopover: false })
      userStore.kickUser(bbs, userNickname);
      console.log("kick " + userNickname);
    };
    const ft_ban = (name) => {
      console.log("ban " + name);
    };
    const ft_report = (name) => {
      let myname = userStore.user.get('nickname');
      this.hideMenu();
      this.setState({ showPopover: false })
      SendEmail("캠퍼스택시 신고 / 내닉네임(" + myname + ") / 상대닉네임(" + name + ") ", "양식에 맞추어 이메일을 보내주세요.\n\n \n내닉네임(" + myname + ")\n상대닉네임(" + name + ")\n\n\n신고사유:\n")
      console.log("report " + name);
    };
    const ft_mandate = (name) => {
      _.isUndefined(name) ? console.log("잘못된 사용자입니다! 설정 -> 문의하기를 이용해 알려주세요!")
        : userStore.readUser_filter('nickname', name).then((r) => {
          let result = _.create(this.state.bbs);
          result.set('leader', r[0]);
          result.save().then(() => console.log('mandated to ' + name))
          this.hideMenu();
          this.setState({ showPopover: false })
        });
      console.log("mandate " + name);
    };
    const ft_showPop = (item, username) => {
      const isMandate = !(_.isUndefined(this.state.bbs.get('leader'))) && this.state.bbs.get('leader').get('nickname') == userStore.user.get('nickname') &&
        item.get('nickname') != userStore.user.get('nickname') ? false : true;
      this.setState({ showPopover: true, popNickname: username, popIsmandate: isMandate })
    }
    const Menu_Btn = (props) => <TouchableOpacity style={chatroomScreen_style.menu_btnC} onPress={props.onPress} ><Ionicons style={{ color: "black" }} name={props.icon} size={24} color="white" />
      <Text style={{ marginLeft: 10 }}>{props.title}</Text></TouchableOpacity>;
    const Button_styled = (props) => <Button onPress={props.onPress} title={props.title} containerStyle={{ margin: 10 }} buttonStyle={{ borderRadius: 10, }} titleStyle={{ paddingLeft: wp(15), paddingRight: wp(15) }} />;
    const FlatList_member = () =>
      <FlatList
        data={this.state.bbs.get('personmember')}
        extraData={this.state.bbs}
        key={(item, i) => String(i)}
        keyExtractor={(item, i) => String(i)}
        renderItem={({ item }) => {
          const hostIcon = hostSVG;
          const username = _.isUndefined(item.get('nickname')) ? null : item.get('nickname') ? item.get('nickname') : "등록되지 않은 사용자";
          const useruniv = _.isUndefined(item.get('univ')) ? null : item.get('univ') ? item.get('univ') : "등록되지 않은 학교";
          const image = _.isUndefined(this.state.bbs.get('leader')) ? null : this.state.bbs.get('leader').get('nickname') == username
            ? item.get('gender') == 0 ? manCrownSVG : womanCrownSVG : item.get('gender') == 0 ? manSVG : womanSVG;
          return (
            <TouchableOpacity delayLongPress={400} onLongPress={() => ft_showPop(item, username)} activeOpacity={0.2}>
              <View style={{ flexDirection: "row", padding: 10 }}>
                <View>
                  <Text>{image}</Text>
                </View>
                <View style={{ paddingLeft: 10, justifyContent: "center", width: "80%" }}>
                  <Text numberOfLines={1} ellipsizeMode='tail'>{username}</Text>
                  <Text numberOfLines={1} ellipsizeMode='tail'>{useruniv}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />;
    return (
      <>
        {/*  팝업유저 강퇴/차단/신고/위임기능 */}
        <Popover from={new Rect(0, hp(60), wp(100), hp(10))} isVisible={this.state.showPopover} onRequestClose={() => this.setState({ showPopover: false })}>
          <View style={{ margin: 10 }}>
            {!this.state.popIsmandate ? null : <Text>{this.state.popNickname}</Text>}
            {!this.state.popIsmandate ? null : <Button_styled title="강퇴하기" onPress={() => ft_kick(this.state.bbs, this.state.popNickname)} />}
            {false ? null : <Button_styled title="밴 하기" onPress={() => ft_ban(this.state.popNickname)} />}
            <Button_styled title="신고하기" onPress={() => ft_report(this.state.popNickname)} />
            {this.state.popIsmandate ? null : <Button_styled title="방장위임" onPress={() => ft_mandate(this.state.popNickname)} />}
          </View>
        </Popover>

          {/* 채팅방 메뉴 */}
          {this.state.showMenu ?
            <Animated.View style={_getStyle()}>
              <TouchableOpacity style={chatroomScreen_style.background} onPress={() => this.hideMenu()} activeOpacity={0.2} />
              <View style={chatroomScreen_style.menu}>
                <Text style={chatroomScreen_style.menu_text}>채팅방 메뉴</Text>
                <Menu_Btn title="지도 보기" icon="md-map" onPress={ft_showMap} />
                <Menu_Btn title="카카오택시 호출" icon="ios-car" onPress={ft_callTaxi} />
                <Text style={chatroomScreen_style.menu_text}>대화 상대</Text>
                <FlatList_member />
              </View>
            </Animated.View>
            : null}
{/* Header */}

<View style={{ alignItems: "center",  backgroundColor:style.header.color,paddingTop:10,paddingBottom:10,width:wp(100)}} >
<View style={{ flexDirection: "row", alignSelf:"stretch" }}>
            <View style={{ }}>
        <Button
          type="clear"
          title=""
          buttonStyle={{ marginLeft: 10 }}
          icon={<Ionicons name="md-arrow-back" size={24} color="white" />}
          onPress={async () => { await this.endChat(); navigation.goBack() }}
        ></Button>
         </View>
         <View style={{ alignItems:"center", flex:1 }}>
            <View style={campusStyle.View.top5}>
              <View style={campusStyle.View.row}>
                <Image
                  source={crown}
                  style={{ width: 23, height: 15, marginTop: 3 }}
                />
                <Text style={campusStyle.Text.middleBold}>
                  {_.isUndefined(this.state.bbs.get('leader')) ? null : this.state.bbs.get('leader').get('nickname')}
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
            </View>
         <View style={{ }}>
          <Button
            type="clear"
            title=""
            icon={<Ionicons name="md-menu" size={24} color="white" />}
            onPress={() => { this.showMenu(); this.setState({ showMenu: !this.state.showMenu }) }}
            buttonStyle={{ marginRight: 10 }}
          />
          </View>
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
            style={{height:50}}
              value={this.state.textInput}
              onChangeText={(textEntry) => {
                this.setState({ textInput: textEntry });
              }}
              onSubmitEditing={() => this.sendMessage(this.state.bbs)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button title="전송" buttonStyle={{ padding:0,margin:0,height:50,backgroundColor: "#1e45c7" }} onPress={() => this.sendMessage(this.state.bbs)}>
              {/* <Image style={campusStyle.Image.middleSize} /> */}
            </Button>
          </View>
        </View>
      </ >
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
    if (_.isUndefined(item.get('leader')) ? false : bbs.get('leader').get('nickname') == item.get('user').get('nickname')) {
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
  Image, Linking, Animated, Easing, Modal
} from "react-native";
import { Header, Button } from "react-native-elements";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import campusStyle from "./campusStyle";
import { TextInput, TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";
import crown from "./image/crown.png";
import { userStore } from "../store/store";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Constants from 'expo-constants';
import styled from 'styled-components/native';
import { RadioButton } from "react-native-paper";
import Svg, { G, Circle, Path } from "react-native-svg";
import Popover, { PopoverMode, PopoverPlacement, Rect } from 'react-native-popover-view';
import SendEmail from "../setting/EmailComposer";
import _ from 'lodash'
const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;
//#region SVG파일들
const womanCrownSVG = (
  <Svg width={46} height={53} viewBox="0 0 46 53">
    <Path d="M23 7A23 23 0 110 30 23 23 0 0123 7z" fill="#c278de" />
    <Path
      d="M22.09 50a2 2 0 01-2-2V37.956h-2.991a2 2 0 01-1.745-2.977l5.848-10.444a6.9 6.9 0 01-5.187-6.652A6.934 6.934 0 0123 11a6.934 6.934 0 016.984 6.882 6.9 6.9 0 01-5.186 6.652l5.848 10.444a2 2 0 01-1.745 2.977h-2.99V48a2 2 0 01-2 2z"
      fill="#fff"
    />
    <Path
      d="M30.49 12.26h-14.4a.665.665 0 01-.549-.29c-1.9-2.786-2.046-8.145-2.057-8.941v-.094a.665.665 0 01.664-.665.665.665 0 01.665.662v.113a3.524 3.524 0 007.046-.111.665.665 0 01.665-.665h1.528a.665.665 0 01.665.665 3.524 3.524 0 007.046.106v-.108a.665.665 0 01.665-.663.665.665 0 01.664.665v.094c-.011.8-.157 6.155-2.057 8.941a.665.665 0 01-.545.291z"
      fill="#fff780"
    />
    <Path
      d="M32.433 2.269a.665.665 0 00-.665.662v.108a3.524 3.524 0 01-7.046-.106.665.665 0 00-.665-.665h-.771v9.99h7.2a.665.665 0 00.549-.29c1.9-2.786 2.046-8.146 2.057-8.941v-.094a.665.665 0 00-.659-.664z"
      fill="#ffc02e"
    />
    <Path
      d="M23.291 0a2.149 2.149 0 102.149 2.149A2.151 2.151 0 0023.291 0z"
      fill="#ffc02e"
    />
    <Path d="M23.286 0v4.3a2.15 2.15 0 000-4.3z" fill="#ffa73b" />
    <Path
      d="M14.149 1.66A2.149 2.149 0 1016.3 3.807a2.151 2.151 0 00-2.151-2.147z"
      fill="#ffc02e"
    />
    <Path
      d="M32.432 1.66a2.149 2.149 0 102.149 2.149 2.151 2.151 0 00-2.149-2.149z"
      fill="#ffa73b"
    />
    <Path
      d="M30.491 14.441h-14.4a.665.665 0 01-.665-.665v-1.981h15.728v1.983a.665.665 0 01-.663.663z"
      fill="#ffc02e"
    />
    <Path
      d="M23.286 14.441h7.2a.665.665 0 00.665-.665v-1.981h-7.865z"
      fill="#ffa73b"
    />
  </Svg>
);
const manCrownSVG = (
  <Svg width={46} height={52} viewBox="0 0 46 52">
    <G
      transform="translate(0 6)"
      fill="#55a1ee"
      stroke="#53a3ee"
      strokeWidth={2}
    >
      <Circle cx={23} cy={23} r={23} stroke="none" />
      <Circle cx={23} cy={23} r={22} fill="none" />
    </G>
    <Path
      d="M22.052 49a2 2 0 01-2-2V34.052l-4.791-8.448a2 2 0 011.74-2.986h2.088a6.83 6.83 0 01-3.163-5.736A6.98 6.98 0 0123 10a6.98 6.98 0 017.074 6.882 6.83 6.83 0 01-3.163 5.736H29a2 2 0 011.74 2.986l-4.791 8.448V47a2 2 0 01-2 2z"
      fill="#fff"
    />
    <Path
      d="M30.49 12.26h-14.4a.665.665 0 01-.549-.29c-1.9-2.786-2.046-8.145-2.057-8.941v-.094a.665.665 0 01.664-.665.665.665 0 01.665.662v.113a3.524 3.524 0 007.046-.111.665.665 0 01.665-.665h1.528a.665.665 0 01.665.665 3.524 3.524 0 007.046.106v-.108a.665.665 0 01.665-.663.665.665 0 01.664.665v.094c-.011.8-.157 6.155-2.057 8.941a.665.665 0 01-.545.291z"
      fill="#fff780"
    />
    <Path
      d="M32.433 2.269a.665.665 0 00-.665.662v.108a3.524 3.524 0 01-7.046-.106.665.665 0 00-.665-.665h-.771v9.99h7.2a.665.665 0 00.549-.29c1.9-2.786 2.046-8.146 2.057-8.941v-.094a.665.665 0 00-.659-.664z"
      fill="#ffc02e"
    />
    <Path
      d="M23.291 0a2.149 2.149 0 102.149 2.149A2.151 2.151 0 0023.291 0z"
      fill="#ffc02e"
    />
    <Path d="M23.286 0v4.3a2.15 2.15 0 000-4.3z" fill="#ffa73b" />
    <Path
      d="M14.149 1.66A2.149 2.149 0 1016.3 3.807a2.151 2.151 0 00-2.151-2.147z"
      fill="#ffc02e"
    />
    <Path
      d="M32.432 1.66a2.149 2.149 0 102.149 2.149 2.151 2.151 0 00-2.149-2.149z"
      fill="#ffa73b"
    />
    <Path
      d="M30.491 14.441h-14.4a.665.665 0 01-.665-.665v-1.981h15.728v1.983a.665.665 0 01-.663.663z"
      fill="#ffc02e"
    />
    <Path
      d="M23.286 14.441h7.2a.665.665 0 00.665-.665v-1.981h-7.865z"
      fill="#ffa73b"
    />
  </Svg>
);
const manSVG = (
  <Svg width={46} height={46} viewBox="0 0 46 46">
    <G fill="#55a1ee" stroke="#53a3ee" strokeWidth={2}>
      <Circle cx={23} cy={23} r={23} stroke="none" />
      <Circle cx={23} cy={23} r={22} fill="none" />
    </G>
    <Path
      d="M22.052 43a2 2 0 01-2-2V28.052l-4.791-8.448a2 2 0 011.74-2.986h2.088a6.83 6.83 0 01-3.163-5.736A6.98 6.98 0 0123 4a6.98 6.98 0 017.074 6.882 6.83 6.83 0 01-3.163 5.736H29a2 2 0 011.74 2.986l-4.791 8.448V41a2 2 0 01-2 2z"
      fill="#fff"
    />
  </Svg>
);
const womanSVG = (
  <Svg width={46} height={46} viewBox="0 0 46 46">
    <Path d="M23 0A23 23 0 110 23 23 23 0 0123 0z" fill="#c278de" />
    <Path
      d="M22.09 43a2 2 0 01-2-2V30.956h-2.991a2 2 0 01-1.745-2.977l5.848-10.444a6.9 6.9 0 01-5.187-6.652A6.934 6.934 0 0123 4a6.934 6.934 0 016.984 6.882 6.9 6.9 0 01-5.186 6.652l5.848 10.444a2 2 0 01-1.745 2.977h-2.99V41a2 2 0 01-2 2z"
      fill="#fff"
    />
  </Svg>
);
const hostSVG = ( //방장권한양도아이콘
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    ariaHidden="true"
    className="svg-inline--fa fa-vote-yea fa-w-20"
    data-icon="vote-yea"
    data-prefix="fas"
    viewBox="0 0 640 512"
  >
    <Path
      fill="currentColor"
      d="M608 320h-64v64h22.4c5.3 0 9.6 3.6 9.6 8v16c0 4.4-4.3 8-9.6 8H73.6c-5.3 0-9.6-3.6-9.6-8v-16c0-4.4 4.3-8 9.6-8H96v-64H32c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h576c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32zm-96 64V64.3c0-17.9-14.5-32.3-32.3-32.3H160.4C142.5 32 128 46.5 128 64.3V384h384zM211.2 202l25.5-25.3c4.2-4.2 11-4.2 15.2.1l41.3 41.6 95.2-94.4c4.2-4.2 11-4.2 15.2.1l25.3 25.5c4.2 4.2 4.2 11-.1 15.2L300.5 292c-4.2 4.2-11 4.2-15.2-.1l-74.1-74.7c-4.3-4.2-4.2-11 0-15.2z"
    ></Path>
  </Svg>
);
//#endregion