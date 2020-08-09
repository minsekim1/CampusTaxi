//#region imports
import React, { Component, useState, useEffect } from "react";
import { View, Text, Image, TouchableHighlight, Button } from "react-native";

import campusStyle from "style";
import ad from "image/ad.png";
import school from "image/school.png";
import bus from "image/bus.png";
import pen from "image/pen.png";
import study from "image/study.png";
import game from "image/game.png";
import crown from "image/crown.png";
import party from "image/party.png";
import club from "image/club.png";
import ski from "image/ski.png";
import ocean from "image/ocean.png";

import UserStore from "store/userStore";
const userStore = new UserStore();
import { observer, inject } from "mobx-react";
//#endregion

// 첫 시작 메인화면
@inject("bbs")
@inject("user")
@observer
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { userkey: "", clientPassword: "" };
  }
  render() {
    const { navigation } = this.props;
    const adImageSrc = "../../Assets/Images/ad.png";
    // 메인화면 버튼 부분
    // useEffect(() => {
    //   route.params ? setUserkey(route.params.userkey) : null;
    // }, []);
    function MenuItem({ navigation, imageURL, filter }) {
      return (
        <TouchableHighlight
          style={campusStyle.View.mainItemTouchItem}
          activeOpacity={0.5}
          underlayColor="#DDDDDD"
          onPress={() =>
            navigation.navigate("모든 채팅방 목록", {
              filter: filter,
              myname: "민성",
              mygender: "man",
              userkey: "asdfg", //userkey,
            })
          }
        >
          <View style={campusStyle.View.default}>
            <Image source={imageURL} style={campusStyle.Image.middleSizemb10} />
            <Text>{filter}</Text>
          </View>
        </TouchableHighlight>
      );
    }
    return (
      <View style={campusStyle.View.container}>
        <Button onPress={() => userStore.getData()} title="getData 1" />
        <Button
          onPress={() => userStore.login("asdfg", "asdfg")}
          title="login 2"
        />
        <Button
          onPress={() => userStore.printUserStore()}
          title="printUserStore"
        />
        <View style={campusStyle.View.backgroundColorBlue}>
          <View>
            <View style={campusStyle.View.mainHeaderBackground}>
              <View style={campusStyle.View.row}>
                <Text style={campusStyle.Text.middleSize}> CAMPUS TAXI</Text>
              </View>
              <Text style={campusStyle.Text.mainUnivText}>
                삼육 대학교
                <Text style={campusStyle.Text.smallSize}>[서울]</Text>
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
                filter="등교"
                imageURL={school}
                navigation={navigation}
              />
            </View>
            <View style={campusStyle.View.container}>
              <MenuItem filter="하교" imageURL={bus} navigation={navigation} />
            </View>
            <View style={campusStyle.View.container}>
              <MenuItem filter="야작" imageURL={pen} navigation={navigation} />
            </View>
          </View>

          <View style={campusStyle.View.rowflex}>
            <View style={campusStyle.View.container}>
              <MenuItem
                filter="독서실"
                imageURL={study}
                navigation={navigation}
              />
            </View>
            <View style={campusStyle.View.container}>
              <MenuItem filter="PC방" imageURL={game} navigation={navigation} />
            </View>
            <View style={campusStyle.View.container}>
              <MenuItem
                filter="놀이동산"
                imageURL={party}
                navigation={navigation}
              />
            </View>
          </View>
          <View style={campusStyle.View.rowflex}>
            <View style={campusStyle.View.container}>
              <MenuItem filter="클럽" imageURL={club} navigation={navigation} />
            </View>
            <View style={campusStyle.View.container}>
              <MenuItem
                filter="스키장"
                imageURL={ski}
                navigation={navigation}
              />
            </View>
            <View style={campusStyle.View.container}>
              <MenuItem
                filter="오션월드"
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
