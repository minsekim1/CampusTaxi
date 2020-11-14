//#region imports
import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Button,
  BackHandler,
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
class HomeScreen extends Component {

  componentDidMount() {
    userStore.getUser("loginid 1", "loginpassword 1");
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton)
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton() {
    //ToastAndroid.show("Back button is pressed", ToastAndroid.SHORT);
    return true;
  }

  render() {
    const { navigation } = this.props;
    // 메인화면 버튼 부분
    function MenuItem({ navigation, imageURL, bbstype }) {
      return (
        <TouchableHighlight
          style={campusStyle.View.mainItemTouchItem}
          activeOpacity={0.5}
          underlayColor="#DDDDDD"
          onPress={async () => {
            let status = 1;//userStore.user.n
            if (status == 1) {
              navigation.navigate("모든 채팅방 목록", {
                bbstype: bbstype,
              });
            } else if (status == 0) {
              //미인증 0인경우
              alert(
                "현재 학생증 인증대기중입니다.\n 1~2일이 지나도 변함이 없을경우\n 설정->문의하기를 통해 알려주세요."
              );
            } else if (status == 2) {
              alert(
                "학생증 인증이 거부되었습니다.\n 학생증 재인증은 설정->문의하기를 통해 사진을 전송해주세요."
              );
            } else {
              // 정지상태인경우
              let servertime = new Date(status);//await anotherStore.servertime();
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
      <View style={campusStyle.View.container}>
        <View style={campusStyle.View.backgroundColorBlue}>
          <View>
            <View style={campusStyle.View.mainHeaderBackground}>
              <View style={campusStyle.View.row}>
                <Text style={campusStyle.Text.middleSize}> CAMPUS TAXI</Text>
              </View>
              <Text style={campusStyle.Text.mainUnivText}>
                [서울]삼육대학교{/* {userStore.user.l} */}
              </Text>
              <Image style={campusStyle.Image.mainImage} source={ad} />
            </View>
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
}
//#endregion 작업완료
export default HomeScreen;