import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import React, { ReactNode } from "react";
import {
  CreateScreenNavigationProp,
  myCoordProps,
} from "../../screens/notab/home/CreateScreen";
import { ChatRoom } from "../chat-room/ChatRoomList";
import { useAuthContext } from "../../contexts/AuthContext";

type Props = {
  selectRoom?: ChatRoom;
  end: myCoordProps;
  start: myCoordProps;
};

export const MapBottomButton: React.FC<Props> = ({
  selectRoom,
  end,
  start,
}) => {
  const disabled = !(!!start.latitude && !!end.latitude);
  const isCreateRoom = selectRoom?.id === -1;
  const { navigate } = useNavigation<CreateScreenNavigationProp>();
  const { setNavName } = useAuthContext();
  const EnterRoom = () =>
  {
    // console.log('selectRoom', selectRoom);
    setNavName({
      istab: "Tab",
      tab: "MessageTabScreen",
      screen: "ChatRoomScreen",
      props: {
        data: selectRoom,
      },
    });
  }
  return (
    <BottomButton
      underlayColor={"#83ABED"}
      disabled={disabled}
      onPress={
        isCreateRoom
          ? () => navigate("CreateScreenDetails", selectRoom)
          : EnterRoom
      }
      style={{
        backgroundColor: disabled ? "rgb(112,112,112)" : "rgb(118, 162, 235)",
      }}
    >
      <Title>
        {disabled
          ? "채팅방 목록에서 방을 선택 또는 직접 출발지를 정해주세요."
          : isCreateRoom
          ? "새 방 만들기"
          : "방 입장하기"}
      </Title>
    </BottomButton>
  );
};

const Title = styled.Text`
  font-size: 14px;
  font-family: bold;
  color: #ffffff;
`;
type BottomButtonProps = {
  disabled?: boolean;
};
const BottomButton = styled.TouchableHighlight<BottomButtonProps>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 48px;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
