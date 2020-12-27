//채팅방의 유저 목록
export default class chatinfo extends Component {
  constructor(props) {
    super(props);
    this.state = { bbs: this.props.route.params.bbs };
  }
  componentDidMount() {
    this.refresh();
  }
  refresh() {
    userStore.readBbs_objid(JSON.parse(JSON.stringify(this.state.bbs)).objectId).then(r => this.setState({ bbs: r }));
  }
  render() {
    return (<>
      <Header backgroundColor="#172864" leftComponent={<Button
        type="clear"
        title=""
        icon={<Ionicons name="md-arrow-back" size={24} color="white" />}
        onPress={() => this.props.navigation.pop(1)}
      ></Button>}
        centerComponent={<Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{"대화상대(" + this.state.bbs.get("personpresent") + "/" + this.state.bbs.get("personmax") + ")"}</Text>}
        rightComponent={<Button
          type="clear"
          title=""
          icon={<Ionicons name="md-refresh" size={24} color="white" />}
          onPress={() => userStore.readBbs_objid(JSON.parse(JSON.stringify(this.state.bbs)).objectId).then(r => this.setState({ bbs: r }))}
        />}
      ></Header>
      <FlatList
        data={this.state.bbs.get('personmember')}
        extraData={this.state.bbs}
        key={(item, i) => String(i)}
        keyExtractor={(item, i) => String(i)}
        renderItem={({ item }) => {
          const image = this.state.bbs.get('leader').get('nickname') == item.get('nickname')
            ? item.get('gender') == 0 ? manCrownSVG : womanCrownSVG : item.get('gender') == 0 ? manSVG : womanSVG;
          const hostIcon = hostSVG;
          return (
            <View style={{ flexDirection: "row", padding: 10 }}>
              <View style={{ flex: 1 }}>
                <Text>{image}</Text>
              </View>
              <View style={{ flex: 5 }}>
                <Text>{item.get('nickname')}</Text>
                <Text>{item.get('univ')}</Text>
              </View>
              {this.state.bbs.get('leader').get('nickname') == userStore.user.get('nickname') && this.state.bbs.get('leader').get('nickname') != item.get('nickname') ? (<TouchableHighlight
                underlayColor={"rgba(0,0,0,0.15)"}
                onPress={() => userStore.leaderPass(this.state.bbs, item).then(() => this.refresh())}>
                <View style={{ flex: 2, alignItems: "center" }}>
                  <FontAwesome5 name="vote-yea" size={24} color="#3d6adb" />
                  <Text style={{ fontSize: 10 }}>방장권한위임</Text>
                </View>
              </TouchableHighlight>
              ) : null}
              <TouchableHighlight
                underlayColor={"rgba(0,0,0,0.15)"}
                onPress={() => SendEmail("제목: 아이디/닉네임/문의사항요약", "양식에 맞추어 이메일을 보내주세요.\n  \n 내용: 아이디 닉네임 문의사항 표기")}>
                <View style={{ flex: 2, alignItems: "center", marginLeft: 10, marginRight: 10 }}>
                  <FontAwesome5 name="exclamation" size={24} color="red" />
                  <Text style={{ fontSize: 10 }}>신고하기</Text>
                </View>
              </TouchableHighlight>
            </View>

          );
        }}
      />
      <View>
        <Button buttonStyle={{ backgroundColor: "yellow", margin: 30, borderRadius: 100, borderColor: "black", borderBottomWidth: 2 }} titleStyle={{ color: 'black' }}
          onPress={() => {
            let url = "https://t.kakao.com/launch?type=taxi" +
              "&origin_lat=" + this.state.bbs.get('startplace').latitude +
              "&origin_lng=" + this.state.bbs.get('startplace').longitude +
              "&dest_lat=" + this.state.bbs.get('endplace').latitude +
              "&dest_lng=" + this.state.bbs.get('endplace').longitude
            console.log("taxi url:" + url); Linking.openURL(url)
          }} title="카카오택시 호출" />
        <Button buttonStyle={{ backgroundColor: "#172864" }} onPress={() => { userStore.outRoom(this.state.bbs); this.props.navigation.pop(2); }} title="방나가기" />
      </View>
    </>)
  }
}
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
//#region imports
import React, { useState, useRef, Component, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, StatusBar, TouchableHighlight, Linking } from "react-native";
import { Header, Button } from "react-native-elements";
import campusStyle from "./campusStyle";
import { TextInput } from "react-native-gesture-handler";
import crown from "./image/crown.png";
import { Observer } from "mobx-react";
import Svg, { G, Circle, Path } from "react-native-svg";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { userStore } from "../store/store";
import SendEmail from "../setting/EmailComposer";
