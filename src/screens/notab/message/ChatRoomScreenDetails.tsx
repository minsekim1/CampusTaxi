import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ChatDatilsCard } from "../../../components/chat-room/ChatDetailsCard";
import {
  ChatRoom,
  User,
  UserDummyList,
} from "../../../components/chat-room/ChatRoomList";
import { EmailSend } from "../../../components/chat-room/EmailSend";
import { ETAView } from "../../../components/chat-room/ETAView";
import { GenderColor } from "../../../components/color/GenderColor";
import { OutRoomSVG } from "../../../components/icon/chat/OutRoomSVG";
import { useAuthContext } from "../../../contexts/AuthContext";
import { MessageNoTabNavigationProp } from "./ChatRoomScreen";

export const ChatRoomScreenDetails: React.FC = () => {
  const navigation = useNavigation<MessageNoTabNavigationProp>();
  const [Users] = useState<User[]>(UserDummyList);
  const [room] = useState<ChatRoom>(
    useAuthContext().MoveNav.props.data
  );
  useEffect(() => {
    // 헤더 바탕 색변경
    navigation.setOptions({
      headerStyle: { backgroundColor: GenderColor(room?.gender) },
    });
    // 에러 체크
    if (room.id == -1) console.warn("room.id 가 -1입니다.");
  }, []);

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
      {/* 출발지 & 도착지 */}
      <ETAView
        gender={room.gender}
        start_address={room.start_address_detail}
        end_address={room.end_address_detail}
        start_time={room.boarding_dtm}
      />
      <BottomLine gender={room.gender}>
        <Title gender={room.gender}>기능</Title>
      </BottomLine>
      {/* 방 공유하기 */}
      {/* 방장 위임 */}
      <PassHostBtn onPress={() => console.log("asd")}>
        <BtnTitle>방장 위임하기</BtnTitle>
      </PassHostBtn>
      {/* 신고/문의 */}
      <QnABtn onPress={()=>EmailSend('[캠퍼스택시문의:채팅신고 및 문의] 본인닉네임')}>
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
