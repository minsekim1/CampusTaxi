//채팅목록 화면
export default function chatScreen({ route, navigation }) {
  const bbstype = route.params.bbstype;
  const myname = userStore.user.name;
  const mygender = 1; //userStore.user.d;
  const [bbslist, setBbslist] = useState([{ "cost": 1, "bbsid": 1, "gender": 1, "bbsDate": "2020-11-15 00:09:46.000000", "bbstype": 1, "endplace": "endplace 1", "available": 1, "personmax": 1, "leadername": "minsekim", "startplace": "startplace 1", "meetingdate": "2020-11-15 00:09:46.000000", "personmember": "personmember 1", "personpresent": 1 }
    , { "cost": 2, "bbsid": 2, "gender": 2, "bbsDate": "2020-11-15 00:09:46.000000", "bbstype": 1, "endplace": "endplace 2", "available": 1, "personmax": 2, "leadername": "ohju", "startplace": "startplace 2", "meetingdate": "2020-11-15 00:09:46.000000", "personmember": "personmember 2", "personpresent": 2 }
    , { "cost": 3, "bbsid": 3, "gender": 0, "bbsDate": "2020-11-15 00:09:46.000000", "bbstype": 2, "endplace": "endplace 3", "available": 1, "personmax": 3, "leadername": "ohju", "startplace": "startplace 3", "meetingdate": "2020-11-15 00:09:46.000000", "personmember": "personmember 3", "personpresent": 3 }]
  );
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      userStore.login("loginid 1", "loginpassword 1");
      // REST API 방 목록 가져오기 filter따라
    });

    return unsubscribe;
  }, []);

  const style = {
    header: {
      h: { height: 80 },
      leftComponent: <Button
        type="clear"
        title=""
        icon={<Icon name="arrow-back" size={24} color="white" />}
        onPress={() => navigation.goBack()}
      ></Button>,
      centerComponent: {
        text: bbstype + " 채팅방 목록",
        style: campusStyle.Text.middleBold,
      },
      rightComponent: <Button
        type="clear"
        title=""
        icon={<Icon name="refresh" size={24} color="white" />}
        onPress={() => userStore.getBbsType(bbstype).then(r => setBbslist(r))}
      ></Button>,
    },
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    touch: {
      backgroundColor: "white",
      padding: 10,
    },
  };
  async function enter(bbs) {
    // let isEnter = fetch?
    let isEnter = await userStore.isEnter(bbs);
    if (isEnter) {
      navigation.navigate("채팅방", {
        bbs: bbs,
        mygender: mygender,
        myname: myname,
      });
    }
  }
  //#endregion
  const renderItem = ({ item }) => <Item item={item} />;
  const Item = ({ item }) => (
    <TouchableOpacity onPress={() => enter(item)} style={style.touch}>
      <View style={campusStyle.View.row}>
        <View
          style={{
            borderRadius: 100,
            width: 55,
            height: 55,
            backgroundColor:
              item.gender == 0
                ? "#579FEE"
                : item.gender == 1
                  ? "#C278DE"
                  : "#3A3A3A",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={campusStyle.Text.middleBold}>
            {item.bbsid}
          </Text>
          <Text style={campusStyle.Text.middleBold}>
            {item.gender == 0
              ? "남자"
              : item.gender == 1
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
            <Text>{(String(item.leadername).length > 9) ? String(item.leadername).substring(0, 9) + "..." : item.leadername}</Text>
          </View>
          <Text style={{ marginLeft: 10 }}>
            출발지:{item.startplace}
          </Text>
          <Text style={{ marginLeft: 10 }}>
            도착지:{item.endplace}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          {
            item.personpresent >= item.personmax ?
              <Text style={campusStyle.Text.red}>
                {item.personpresent}/{item.personmax}
              </Text>
              :
              <Text>
                {item.personpresent}/{item.personmax}
              </Text>
          }
        </View>
        <View style={{ flex: 3, alignItems: "center" }}>
          <Text style={campusStyle.Text.grayDDark}>
            탑승시간▼
          </Text>
          <Text style={campusStyle.Text.grayDDark}>
            {item.meetingdate}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <>
      <Header
        containerStyle={style.header.h}
        backgroundColor="#0D3664"
        leftComponent={style.header.leftComponent}
        centerComponent={style.header.centerComponent}
        rightComponent={style.header.rightComponent}
      />
      {/* 채팅목록 출력부분 */}
      <FlatList data={bbslist} renderItem={renderItem} keyExtractor={item => String(item.bbsid)} />
      {/* 방만들기 버튼부분 */}
      <View style={campusStyle.View.createRoomView}>
        <TouchableOpacity
          style={campusStyle.Button.createRoomBtn}
          onPress={() =>
            navigation.navigate("방 만들기", {
              bbstype: bbstype,
            })
          }
        >
          <Icon name="add" size={32} color="white" />
          <Text style={campusStyle.Text.smallSize}>방만들기</Text>
        </TouchableOpacity>
      </View>
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
  ScrollView, SafeAreaView, StatusBar
} from "react-native";
// import * as TimeAPI from "../Email/globalTimeAPI.js";
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
import campusStyle from "./campusStyle";
import crown from "./image/crown.png";
import { userStore } from "../store/store";

//#endregion
