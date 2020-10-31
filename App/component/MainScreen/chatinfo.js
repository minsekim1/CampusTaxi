//채팅방의 유저 목록
export default class chatinfo extends Component {
  render() {
    let bbskey = this.props.route.params.bbskey;
    //멤버 배열, 대화상대(현재, 최대)
    //#region 변수들
    bbsStore.setbbsnow(bbskey);
    bbsStore.asyncBbsnow(bbskey);

    return (
      <>
        <Observer>
          {() => {
            this.props.navigation.setOptions({
              title:
                "대화상대(" +
                bbsStore.bbsuser.length +
                "/" +
                bbsStore.bbsnow.k +
                ")",
            });
            return (
              <FlatList
                data={bbsStore.bbsuser}
                extraData={bbsStore.bbsuser}
                key={(item, i) => String(i)}
                keyExtractor={(item, i) => String(i)}
                renderItem={({ item }) => {
                  item = JSON.parse(JSON.stringify(item));
                  const image =
                    bbsStore.bbsnow.i == item.i
                      ? item.d == 0
                        ? manCrownSVG
                        : womanCrownSVG
                      : item.d == 0
                      ? manSVG
                      : womanSVG;
                  const hostIcon = hostSVG;
                  return (
                    <View style={{ flexDirection: "row", padding: 10 }}>
                      <View style={{ flex: 1 }}>
                        <Text>{image}</Text>
                      </View>
                      <View style={{ flex: 5 }}>
                        <Text>{item.i}</Text>
                        <Text>{item.l}</Text>
                      </View>

                      {bbsStore.bbsnow.i == userStore.user.i &&
                      bbsStore.bbsnow.i != item.i ? (
                        <TouchableHighlight
                          underlayColor={"rgba(0,0,0,0.15)"}
                          onPress={() =>
                            userStore.hostPass(
                              bbsStore.bbsnow.i,
                              item.i,
                              bbskey
                            )
                          }
                        >
                          <View style={{ flex: 2, alignItems: "center" }}>
                            <FontAwesome5
                              name="vote-yea"
                              size={24}
                              color="black"
                            />
                            <Text style={{ fontSize: 10 }}>방장권한위임</Text>
                          </View>
                        </TouchableHighlight>
                      ) : null}
                    </View>
                  );
                }}
              />
            );
          }}
        </Observer>

        <View>
          <Button
            onPress={() => {
              bbsStore.outBbs(userStore.userkey, bbskey);
              this.props.navigation.pop(2);
            }}
            title="방나가기"
          />
        </View>
      </>
    );
  }
}

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

//#region imports
import React, { useState, useRef, Component, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import { Header, Button } from "react-native-elements";
import campusStyle from "style";
import { TextInput } from "react-native-gesture-handler";
import crown from "image/crown.png";
const firebase = require("firebase");
import { Observer } from "mobx-react";
import Svg, { G, Circle, Path } from "react-native-svg";
import { FontAwesome5 } from "@expo/vector-icons";
import { bbsStore, userStore, anotherStore } from "store";
