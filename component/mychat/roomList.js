//모든 채팅방 목록
export default function roomList({ route, navigation }) {
  //#region 
  const [bbslist, setBbslist] = useState([]);
  //#region  뒤로가기 버튼 제어 & 더블클릭시 앱 종료
  let currentCount = 0;
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton)
      //console.log("focus MainScreen");
    });
    navigation.addListener('blur', () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
      //console.log("blur MainScreen");
    })
  }, []);
  const handleBackButton = () => {
    if (currentCount < 1) {
      currentCount += 1;
      if (Platform.OS === 'android') {
      ToastAndroid.show('뒤로 가기를 한번 더 누르면 앱이 종료됩니다.\n로그아웃은 설정->로그아웃으로 가주세요.', ToastAndroid.SHORT)
    } else {
      AlertIOS.alert('뒤로 가기를 한번 더 누르면 앱이 종료됩니다.\n로그아웃은 설정->로그아웃으로 가주세요.');
    }
    } else {
      BackHandler.exitApp();
    }
    setTimeout(() => {
      currentCount = 0;
    }, 2000);
    return true;
  }
  ////#endregion
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      userStore.readBbs_member().then(r => setBbslist(r))
    });
    return unsubscribe;
  }, [navigation]);
  const style = {
    header: {
      h: { height: 80 },
      centerComponent: {
        text: "내 채팅방 목록",
        style: campusStyle.Text.middleBold,
      },
      rightComponent: <Button
        type="clear"
        title=""
        icon={<Ionicons name="md-refresh" size={24} color="white" />}
        onPress={() => userStore.readBbs_member().then(r => setBbslist(r))}
      />,
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
    navigation.navigate("채팅방", { bbs: bbs })
  }
  function render(obj) {
    let item = obj.item;
    return <TouchableOpacity onPress={() => enter(item)} style={style.touch}>
      <View style={campusStyle.View.row}>
        <View
          style={{
            borderRadius: 100, width: 55, height: 55, backgroundColor: item.get('gender') == 0 ? "#579FEE" : item.get('gender') == 1 ? "#C278DE" : "#3A3A3A", justifyContent: "center", alignItems: "center"
          }}
        >
          <Text style={campusStyle.Text.middleBold}>{obj.index}</Text>
          <Text style={campusStyle.Text.middleBold}>
            {item.get('gender') == 0 ? "남자" : item.get('gender') == 1 ? "여자" : "모두"}
          </Text>
        </View>
        <View style={{ flex: 6 }}>
          <View style={campusStyle.View.row}>
            <Image style={{ width: 23, height: 15, marginLeft: 10 }} source={crown} />
            <Text>{(String(item.get('leader').get('nickname')).length > 9) ? String(item.get('leader').get('nickname')).substring(0, 9) + "..." : String(item.get('leader').get('nickname'))}</Text>
          </View>
          <Text style={{ marginLeft: 10 }}>
            출발지:{item.get('startplace').name}
          </Text>
          <Text style={{ marginLeft: 10 }}>
            도착지:{item.get('endplace').name}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          {item.get('personpresent') >= item.get('personmax') ?
            <Text style={campusStyle.Text.red}>
              {item.get('personpresent')}/{item.get('personmax')}
            </Text> :
            <Text>
              {item.get('personpresent')}/{item.get('personmax')}
            </Text>}
        </View>
        <View style={{ flex: 3, alignItems: "center" }}>
          <Text style={campusStyle.Text.grayDDark}>탑승시간▼</Text>
          <Text style={campusStyle.Text.grayDDark}>{userStore.toRoomDateKR(item.get('meetingdate'))}</Text>
        </View>
      </View>
    </TouchableOpacity>
  }

  //#endregion
  return (
    <>
      <Header
        containerStyle={style.header.h}
        backgroundColor="#0D3664"
        centerComponent={style.header.centerComponent}
        rightComponent={style.header.rightComponent}
      />
      <FlatList data={bbslist} renderItem={(item) => render(item)} keyExtractor={(i, id) => String(id)} />
    </>
  );
}


//#region imports
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity, BackHandler,ToastAndroid,
  Platform,
  AlertIOS,
  ScrollView, SafeAreaView, StatusBar
} from "react-native";
// import * as TimeAPI from "../Email/globalTimeAPI.js";
import { useFocusEffect } from '@react-navigation/native';
import { Header, Button, Text } from "react-native-elements";
import campusStyle from "./campusStyle";
import crown from "./image/crown.png";
import { userStore } from "../store/store";
import { Ionicons } from '@expo/vector-icons';
//#endregion
