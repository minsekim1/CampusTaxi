//메인화면
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  BackHandler,
  FlatList,
  KeyboardAvoidingView,ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import campusStyle from "./campusStyle";
import ad from "./image/ad.png";
import school from "./image/school.png";
import bus from "./image/bus.png";
import pen from "./image/pen.png";
import study from "./image/study.png";
import game from "./image/game.png";
import party from "./image/party.png";
import club from "./image/club.png";
import ski from "./image/ski.png";
import ocean from "./image/ocean.png";
import { userStore } from "../store/store";
import { Button } from "react-native-paper";
import { CustomContext } from "../store/context";
import styled from 'styled-components/native';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

function HomeScreen({ route, navigation }) {
  // 뒤로가기 버튼 제어 & 더블클릭시 앱 종료
  let currentCount = 0;
  const { user } = React.useContext(CustomContext);
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      if (!user || !user.id)
        navigation.navigate("SignIn");
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
  // 메인화면 버튼 부분
  function MenuItem({ imageURL, bbstype }) {
    return (
      <TouchableHighlight
        style={campusStyle.View.mainItemTouchItem}
        activeOpacity={0.5}
        underlayColor="#DDDDDD"
        onPress={async () => {
          let status = 1//userStore.user.get('userStatus');
          if (status == 1) {
            navigation.navigate("모든 채팅방 목록", {
              bbstype: bbstype,
            });
          } else if (status == 0) {
            alert("현재 학생증 인증대기중입니다.\n 1~2일이 지나도 변함이 없을경우\n 설정->문의하기를 통해 알려주세요.");
          } else if (status == 2) {
            alert("학생증 인증이 거부되었습니다.\n 학생증 재인증은 설정->문의하기를 통해 사진을 전송해주세요.");
          } else {
            // 정지상태인경우
            let servertime = new Date(status);
            if (new Date(servertime) > new Date(status)) {
              alert("정지가 풀렸습니다.");
              // userStore.blockEnd(); 정지해체
              navigation.navigate("모든 채팅방 목록", {
                bbstype: bbstype,
              });
            }
            if (new Date(servertime) < new Date(status))
              alert(status + "일까지 정지입니다.");
          }
        }}
      >
        <View style={campusStyle.View.default}>
          <Image source={imageURL} style={campusStyle.Image.middleSizemb10} />
          <Text>{bbstype}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  return (
    <View>
      <View style={campusStyle.View.backgroundColorBlue}>
        <View style={campusStyle.View.mainHeaderBackground}>
          <Text style={{ color: "white", fontSize: 18, marginTop: 50 }}> CAMPUS TAXI</Text>
          <Text style={campusStyle.Text.mainUnivText}>
            {!!userStore.user ? userStore.user.get('univ') : null}
              </Text>
          <Image style={campusStyle.Image.mainImage} source={ad} />
        </View>
      </View>
      {/* 메인메뉴버튼부분 */}
      <View style={campusStyle.View.mainItemView}>
        <View style={campusStyle.View.rowflex}>
          <View style={campusStyle.View.container}>
            <MenuItem
              bbstype="등교"
              imageURL={school}
              navigation={navigation}
            />
          </View>
          <View style={campusStyle.View.container}>
            <MenuItem bbstype="하교" imageURL={bus} navigation={navigation} />
          </View>
          <View style={campusStyle.View.container}>
            <MenuItem bbstype="야작" imageURL={pen} navigation={navigation} />
          </View>
        </View>

        <View style={campusStyle.View.rowflex}>
          <View></View>
          <View style={campusStyle.View.container}>
            <MenuItem
              bbstype="독서실"
              imageURL={study}
              navigation={navigation}
            />
          </View>
          <View style={campusStyle.View.container}>
            <MenuItem bbstype="PC방" imageURL={game} navigation={navigation} />
          </View>
          <View style={campusStyle.View.container}>
            <MenuItem
              bbstype="놀이동산"
              imageURL={party}
              navigation={navigation}
            />
          </View>
        </View>
        <View style={campusStyle.View.rowflex}>
          <View style={campusStyle.View.container}>
            <MenuItem bbstype="클럽" imageURL={club} navigation={navigation} />
          </View>
          <View style={campusStyle.View.container}>
            <MenuItem
              bbstype="스키장"
              imageURL={ski}
              navigation={navigation}
            />
          </View>
          <View style={campusStyle.View.container}>
            <MenuItem
              bbstype="오션월드"
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