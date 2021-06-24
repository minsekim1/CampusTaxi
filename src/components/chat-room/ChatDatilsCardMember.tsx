import styled from "@emotion/native";
import React from "react";
import { Alert, Image, Text } from "react-native";
import { useAuthContext } from "../../contexts/AuthContext";
import { User } from "../../contexts/User";
import { GenderColor } from "../color/GenderColor";
import { Crown } from "../icon/chat/Crown";
import { KickSGV } from "../icon/chat/KickSVG";
import { ManRect } from "../icon/chat/ManRect";
import { WomanRect } from "../icon/chat/WomanRect";
import { ChatRoom } from "./ChatRoomList";
import { CustomAlert } from "./CustomAlert";

type Props = {
  taker: User;
  host_id: string;
  room: ChatRoom;
  onEnd: () => void;
  isHost: Boolean;
};
export const ChatDatilsCardMember: React.FC<Props> = ({
  taker,
  host_id,
  room,
  onEnd,
  isHost,
}) => {
  if (isHost) return <></>;
  const { socket, User,setNavName } = useAuthContext();
  const GenderRect = () =>
    taker.gender == "MALE" ? <ManRect /> : <WomanRect />;
  const onPressPassHost = (taker_id: string, host_id: string) => {
    // console.log("ON! taker_id:", taker_id, "host_id:", host_id);

    if (host_id == undefined) {
      socket?.off("aUser");
      socket?.emit("aUser", { user_nickname: User?.nickname });
      socket?.on("aUser", (response: any) => {
        // console.log("User id reset user:",response.User[0].id);
        socket?.emit("chatPassHost", {
          room_id: room.id,
          taker_id: taker_id,
          host_id: response.User[0].id,
        });
      });
      onEnd();
      Alert.alert("방장을 변경하였습니다. 새로고침해주세요.")
        setNavName({
      istab: "Tab",
      tab: "MessageTabScreen",
      screen: "ChatRoomScreen",
      props: null,
    });
    } else
      socket?.emit("chatPassHost", {
        room_id: room.id,
        taker_id: taker_id,
        host_id: host_id,
      });
  };
  return (
    <Container onPress={() => onPressPassHost(taker.id, host_id)}>
      <Left>
        {/* 프로필 */}
        {!taker.imagepath ? (
            <GenderRect/>
          ): 
            (
              <Image
            style={{
              height: 50, width: 50,
            }}
            source={{uri: "https://s3.ap-northeast-2.amazonaws.com/api.campustaxi.net/profile_icon/"+taker.imagepath+".png"}}
                />
          )}
      </Left>
      <Center>
        {/* 이름/학교 */}
        <Title>{taker.nickname}</Title>
        <Group>{taker.campus_name}</Group>
      </Center>
      <Right>
        {/* 위임함수 */}
        {/* {isHost ? (
          <KickBtn
            onPress={() =>
              CustomAlert(
                "",
                "강퇴하시겠습니까?",
                true,
                true,
                ()=>onPressOk(user.nickname)
              )
            }
          >
            <KickSGV color={GenderColor(room.gender)} />
          </KickBtn>
        ) : (
          <></>
        )} */}
      </Right>
    </Container>
  );
};
const Container = styled.TouchableOpacity`
  width: 90%;
  height: 70px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: #e5e5e8;
`;
const CrownView = styled.View`
  position: absolute;
  z-index: 1;
  top: 10px;
`;
const Title = styled.Text`
  font-size: 13px;
  font-weight: bold;
`;
const Group = styled.Text`
  font-size: 11px;
  font-weight: 200;
`;
const KickBtn = styled.TouchableOpacity`
  width: 25px;
  height: 36px;
  align-items: center;
  justify-content: center;
`;
const Left = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Center = styled.View`
  flex: 3;
  justify-content: center;
`;
const Right = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
