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
  user: User;
  room: ChatRoom;
  isHost: boolean;
};
export const ChatDatilsCard: React.FC<Props> = ({
  user,
  room,
  isHost,
}) => {
  const { socket } = useAuthContext();
  const GenderRect = () =>
    user.gender == "MALE" ? <ManRect /> : <WomanRect />;
  const onPressOk = (kickedNickname: string) => {
    socket?.emit("kickUser", {
      room_id: room.id,
      nickname: kickedNickname,
      hostname: room.owner,
    });
  };

  // console.log(user);
  return (
    <Container>
      <Left>
        {/* 프로필 */}
        {isHost ? (
            <CrownView>
              <Crown />
            </CrownView>
          ) : null}

          {!user.imagepath ? (
            <GenderRect/>
          ): 
            (
              <Image
            style={{
              height: 50, width: 50, marginRight: 15
            }}
            source={{uri: "https://s3.ap-northeast-2.amazonaws.com/api.campustaxi.net/profile_icon/"+user.imagepath+".png"}}
                />
          )}
      </Left>
      <Center>
        {/* 이름/학교 */}
        <Title>{user.nickname}</Title>
        <Group>{user.campus_name}</Group>
      </Center>
      <Right>
        {/* 강퇴버튼 */}
        {!isHost ? (
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
        )}
      </Right>
    </Container>
  );
};
const Container = styled.View`
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
  right: 32px;
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
