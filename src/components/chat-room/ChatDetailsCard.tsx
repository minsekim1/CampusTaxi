import styled from "@emotion/native";
import React from "react";
import { Alert, Text } from "react-native";
import { GenderColor } from "../color/GenderColor";
import { Crown } from "../icon/chat/Crown";
import { KickSGV } from "../icon/chat/KickSVG";
import { ManRect } from "../icon/chat/ManRect";
import { WomanRect } from "../icon/chat/WomanRect";
import { ChatRoom, User } from "./ChatRoomList";
import { CustomAlert } from "./CustomAlert";

type Props = {
  user: User;
  room: ChatRoom;
};
export const ChatDatilsCard: React.FC<Props> = ({ user,room }) => {
  const GenderRect = () => (user.gender == 1) ? <ManRect /> : <WomanRect />
  
  return (
    <Container>
      <Left>
        {/* 프로필 */}
        <CrownView>
          <Crown />
          </CrownView>
        <GenderRect/>
      </Left>
      <Center>
        {/* 이름/학교 */}
        <Title>{user.nickname}</Title>
        <Group>{user.campus_name}</Group>
      </Center>
      <Right>
        {/* 강퇴버튼 */}
        <KickBtn onPress={()=>CustomAlert("", "강퇴하시겠습니까?",true, true)}>
          <KickSGV color={GenderColor(room.gender)}/>
          </KickBtn>
      </Right>
    </Container>
  );
};
const Container = styled.View`
  width: 90%;
  height: 70px;
  flex-direction:row;
  border-bottom-width:1px;
  border-color: #E5E5E8;
`;
const CrownView = styled.View`
position:absolute;
z-index:1;
top:10px;
`
const Title = styled.Text`
  font-size:13px;
  font-weight: bold;
`
const Group = styled.Text`
  font-size:11px;
  font-weight: 200;
  `
const KickBtn = styled.TouchableOpacity`
  width: 25px;
  height: 36px;
  align-items:center;
  justify-content:center;
  
`
const Left = styled.View`
  flex: 1;
  align-items:center;
  justify-content:center;
`;
const Center = styled.View`
  flex: 3;
  justify-content:center;
`;
const Right = styled.View`
  flex: 1;
  align-items:center;
  justify-content:center;
`;
