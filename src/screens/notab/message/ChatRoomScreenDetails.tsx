import styled from "@emotion/native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { differenceInMilliseconds } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { Platform, ScrollView, StatusBar, Text, TextInput } from "react-native";
import { ChatDatilsCard } from "../../../components/chat-room/ChatDetailsCard";
import {
  ChatRoom,
  User,
  UserDummy,
  UserDummyList,
} from "../../../components/chat-room/ChatRoomList";
import { GenderColor } from "../../../components/color/GenderColor";
import BackIconWhite from "../../../components/icon/chat/BackIconWhite";
import { Crown } from "../../../components/icon/chat/Crown";
import { Menu } from "../../../components/icon/chat/Menu";
import { OutRoomSVG } from "../../../components/icon/chat/OutRoomSVG";
import { SearchIcon } from "../../../components/icon/chat/SearchIcon";
import { BlankBackground } from "../../../components/layout/BlankBackground";
import { showToastWithGravity } from "../../../components/layout/Toast";
import { API_URL } from "../../../constant";
import { useAuthContext } from "../../../contexts/AuthContext";
import { MessageNoTabNavigationProp } from "./ChatRoomScreen";
import { MessageNoTabNavigationParamList } from "./MessageNoTabNavigation";

export const ChatRoomScreenDetails: React.FC = () => {
  const navigation = useNavigation<MessageNoTabNavigationProp>();
  const [Users, SetUsers] = useState<User[]>(UserDummyList);
  const [room, setRoom] = useState<ChatRoom>(
    useAuthContext().MoveNav.props.data
  );
  const { setNavName } = useAuthContext();
  useEffect(() => {
    console.log(
      navigation.setOptions({
        headerStyle: { backgroundColor: GenderColor(room?.gender) },
      })
    );
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(GenderColor(room?.gender));
    }
    StatusBar.setBarStyle("dark-content");
    if (room.id == -1) console.warn("room.id 가 -1입니다.");
  }, []);

  return (
    <Container contentContainerStyle={{ alignItems: "center" }}>
      {/* 대화상대 */}
      <BottomLine gender={room.gender}>
        <Title gender={room.gender}>대화 상대</Title>
      </BottomLine>
      {/* 사람 목록 */}
      {Users.map((user) => (
        <ChatDatilsCard
          key={user.uuid}
          user={user}
          room={room}
        ></ChatDatilsCard>
      ))}
      {/* 기능 */}
      <BottomLine gender={room.gender}>
        <Title gender={room.gender}>기능</Title>
      </BottomLine>
      {/* 방 공유하기 */}
      {/* 방장 위임 */}
      <PassHostBtn onPress={() => console.log("asd")}>
        <BtnTitle>방장 위임하기</BtnTitle>
      </PassHostBtn>
      {/* 신고/문의 */}
      <QnABtn onPress={() => console.log("asd")}>
        <BtnTitle>신고/문의</BtnTitle>
      </QnABtn>
      {/* 카카오택시 호출 */}
      <KakaoTaxiBtn onPress={() => console.log("asd")}>
        <BtnTitle>카카오택시로 호출</BtnTitle>
      </KakaoTaxiBtn>
      {/* 광고 */}
      <BannerTemp/>
      {/* 방나가기 */} 
      <OutRoomBtn onPress={() => console.log("asd")}>
        <OutRoomSVG/>
        <OutRoomBtnTitle>방나가기</OutRoomBtnTitle>
      </OutRoomBtn>
    </Container>
  );
};
const BannerTemp = styled.View`
  width: 90%;
  height: 76px;
  border-color: gray;
  border-width: 1px;
`
const BtnTitle = styled.Text`font-size:14px; font-weight: bold;`;
const PassHostBtn = styled.TouchableOpacity`
  width:80%;
  height: 60px;
  justify-content:center;
  border-bottom-width:1px;
  border-color:#E5E5E8;
`;
const QnABtn = styled.TouchableOpacity`
  width:80%;
  height: 60px;
  justify-content:center;
  border-bottom-width:1px;
  border-color:#E5E5E8;
`;
const KakaoTaxiBtn = styled.TouchableOpacity`
  width:80%;
  height: 50px;
  justify-content:center;
  align-items:center;
  background-color:#FCED60;
  width: 40%;
  margin: 30px;
  border-radius: 30px;
`;
const OutRoomBtn = styled.TouchableOpacity`
  width:80%;
  height: 60px;
  justify-content:flex-start;
  flex-direction:row;
  align-items: center;
`;
const OutRoomBtnTitle = styled.Text`
  color: #707070;
`
const Container = styled.ScrollView``;
const Title = styled.Text`
  font-size: 12px;
  color: ${(props) => GenderColor(props.gender)};
  text-align: center;
  margin-bottom: 3px;
  margin-top: 10px;
`;
const BottomLine = styled.View`
  width: 63px;
  border-bottom-width: 3px;
  border-color: ${(props) => GenderColor(props.gender)};
`;
