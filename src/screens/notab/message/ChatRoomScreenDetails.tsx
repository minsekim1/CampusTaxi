import styled from "@emotion/native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { differenceInMilliseconds } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
} from "react-native";
import { copyToClipboard } from "../../../components/button/CopyToClipboard";
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
import { DottedLine } from "../../../components/icon/chat/DottedLine";
import { MarkerSVG } from "../../../components/icon/chat/MarkerSVG";
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
    // 헤더 바탕 색변경
    navigation.setOptions({
      headerStyle: { backgroundColor: GenderColor(room?.gender) },
    });
    // 에러 체크
    if (room.id == -1) console.warn("room.id 가 -1입니다.");
  }, []);
  const ClipeboardOnPressStart = () =>
    copyToClipboard(
      room.start_address_detail,
      "출발지가 클립보드에 복사되었습니다."
    );
  const ClipeboardOnPressEnd = () =>
    copyToClipboard(
      room.end_address_detail,
      "도착지가 클립보드에 복사되었습니다."
    );
  return (
    <Container contentContainerStyle={ContainerStyle}>
      {/* 대화상대 */}
      <BottomLine width={"80"} gender={room.gender}>
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
      <BottomLine width={"110"} gender={room.gender}>
        <Title gender={room.gender}>출발지 & 도착지</Title>
      </BottomLine>
      <ETAView>
        <TopView>
          <LeftView>
            <MarkerSVG type="start" />
          </LeftView>
          <RightView>
            <Clipeboard onPress={ClipeboardOnPressStart}>
              <PlaceText gender={room.gender}>
                {room.start_address_detail}
              </PlaceText>
            </Clipeboard>
          </RightView>
        </TopView>
        <MidView>
          <LeftView>
            <DottedLine />
          </LeftView>
          <RightView>
            <StartTime>8:00 탑승</StartTime>
          </RightView>
        </MidView>
        <BottomView>
          <LeftView>
            <MarkerSVG type="end" />
          </LeftView>
          <RightView>
            <Clipeboard onPress={ClipeboardOnPressEnd}>
              <PlaceText gender={room.gender}>
                {room.end_address_detail}
              </PlaceText>
            </Clipeboard>
          </RightView>
        </BottomView>
      </ETAView>
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
      <BannerTemp />
      {/* 방나가기 */}
      <OutRoomBtn onPress={() => console.log("asd")}>
        <OutRoomSVG />
        <OutRoomBtnTitle>방나가기</OutRoomBtnTitle>
      </OutRoomBtn>
    </Container>
  );
};
// 출발지 & 도착지
const StartTime = styled.Text`
  text-align: right;
  font-size: 10px;
  margin-bottom: 10px;
  margin-right: 20px;
`;
const Clipeboard = styled.TouchableOpacity``;
const PlaceText = styled.Text`
  border-width: 1px;
  border-color: ${(props: any) => GenderColor(props.gender)};
  border-radius: 21px;
  width: 100%;
  padding: 5px 11px;
`;
const ETAView = styled.View`
  margin-top: 10px;
  width: 80%;
  justify-content: center;
  align-items: center;
`;
const TopView = styled.View`
  flex-direction: row;
`;
const MidView = styled.View`
  flex-direction: row;
`;
const BottomView = styled.View`
  flex-direction: row;
`;
const LeftView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const RightView = styled.View`
  flex: 5;
  justify-content: center;
`;
// 배너 CSS
const BannerTemp = styled.View`
  width: 90%;
  height: 76px;
  border-color: gray;
  border-width: 1px;
`;
const BtnTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;
const PassHostBtn = styled.TouchableOpacity`
  width: 80%;
  height: 60px;
  justify-content: center;
  border-bottom-width: 1px;
  border-color: #e5e5e8;
`;
const QnABtn = styled.TouchableOpacity`
  width: 80%;
  height: 60px;
  justify-content: center;
  border-bottom-width: 1px;
  border-color: #e5e5e8;
`;
const KakaoTaxiBtn = styled.TouchableOpacity`
  width: 80%;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: #fced60;
  width: 40%;
  margin: 30px;
  border-radius: 30px;
`;
const OutRoomBtn = styled.TouchableOpacity`
  width: 80%;
  height: 60px;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
`;
const OutRoomBtnTitle = styled.Text`
  color: #707070;
`;
// 컨테이너
const Container: any = styled.ScrollView``;
const ContainerStyle = { alignItems: "center", backgroundColor: "white" };
const Title: any = styled.Text`
  font-size: 12px;
  color: ${(props: any) => GenderColor(props.gender)};
  text-align: center;
  margin-bottom: 3px;
  margin-top: 20px;
`;
const BottomLine: any = styled.View`
  width: ${(props: any) => (props.width ? props.width : "49")}px;
  border-bottom-width: 3px;
  border-color: ${(props: any) => GenderColor(props.gender)};
`;
