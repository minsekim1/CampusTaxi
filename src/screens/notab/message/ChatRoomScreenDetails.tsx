import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import { ChatDatilsCard } from "../../../components/chat-room/ChatDetailsCard";
import {
  ChatRoom,
  UserDummyList,
} from "../../../components/chat-room/ChatRoomList";
import { CustomAlert } from "../../../components/chat-room/CustomAlert";
import { EmailSend } from "../../../components/chat-room/EmailSend";
import { ETAView } from "../../../components/chat-room/ETAView";
import { GenderColor } from "../../../components/color/GenderColor";
import { OutRoomSVG } from "../../../components/icon/chat/OutRoomSVG";
import { useAuthContext } from "../../../contexts/AuthContext";
import { User } from "../../../contexts/User";
import { MessageNoTabNavigationProp } from "./ChatRoomScreen";

export const ChatRoomScreenDetails: React.FC = () => {
  const navigation = useNavigation<MessageNoTabNavigationProp>();
  const [Users, setUsers] = useState<User[]>(UserDummyList);
  const [room] = useState<ChatRoom>(useAuthContext().MoveNav.props.data);
  const { socket, User, setNavName } = useAuthContext();
  useEffect(() => {
    // 헤더 바탕 색변경
    navigation.setOptions({
      headerStyle: { backgroundColor: GenderColor(room?.gender) },
    });
    // 에러 체크
    if (room.id == -1) console.warn("room.id 가 -1입니다.");
    socket?.emit("chatRoomsInUsers", { room_id: room.id });
    socket?.on("chatRoomsInUsers", (c: { chatUsers: User[] }) => {
      setUsers(c.chatUsers);
    });
    socket?.on("kicked", (c: { room_id: number; hostname: string }) => {
      console.log("c.room_id == room.id", c.room_id == room.id);
      if (c.room_id == room.id)
        setNavName({
          istab: "Tab",
          tab: "MessageTabScreen",
          screen: "ChatRoomScreen",
          props: null,
        });
    });
  }, []);
  const onPressOk = () => {
    socket?.emit("chatClose", {
      nickname: User?.nickname,
      room_id: room.id,
    });
    setNavName({
      istab: "Tab",
      tab: "MessageTabScreen",
      screen: "ChatRoomScreen",
      props: null,
    });
  };
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
          isHost={User?.nickname == room.owner && user.nickname != room.owner}
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
      {/* <PassHostBtn onPress={() => console.log("asd")}>
        <BtnTitle>방장 위임하기</BtnTitle>
      </PassHostBtn> */}
      {/* 신고/문의 */}
      <QnABtn
        onPress={() =>
          EmailSend("[캠퍼스택시문의:채팅신고 및 문의] 본인닉네임")
        }
      >
        <BtnTitle>신고/문의</BtnTitle>
      </QnABtn>
      {/* 분할 결제 */}
      {/* <QnABtn
        onPress={() =>
          EmailSend("[캠퍼스택시문의:채팅신고 및 문의] 본인닉네임")
        }
      >
        <BtnTitle>토스 분할 결제</BtnTitle>
      </QnABtn> */}
      {/* 카카오택시 호출 */}
      <KakaoTaxiBtn
        onPress={() =>
          Linking.openURL(
            `https://t.kakao.com/launch?type=taxi&origin_lat=${room.start_lat}&origin_lng=${room.start_lon}&dest_lat=${room.end_lat}&dest_lng=${room.end_lon}`
          )
        }
      >
        <BtnTitle>카카오택시로 호출</BtnTitle>
      </KakaoTaxiBtn>
      {/* 광고 */}
      <BannerTemp />
      {/* 방나가기 */}
      <OutRoomBtn
        onPress={() =>
          CustomAlert(
            "방 나가기",
            "방을 나가시겠습니까?\n해당 채팅방은 내 채팅방에서 지워지게됩니다.",
            true,
            true,
            () => onPressOk()
          )
        }
      >
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
