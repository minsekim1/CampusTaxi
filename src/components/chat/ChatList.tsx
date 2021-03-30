import styled from "@emotion/native";
import { format, getDate } from "date-fns";
import { ko } from "date-fns/locale";
import React from "react";
import { Text } from "react-native";
import { windowWidth } from "../../constant";
import { Crown } from "../icon/chat/Crown";
import { ManRect } from "../icon/chat/ManRect";
import { WomanRect } from "../icon/chat/WomanRect";
import { Message } from "./Message";

type Props = {
  messages: Message[];
};
export const ChatList: React.FC<Props> = ({ messages }) => {
  // const beforeDate = getDate(new Date);//index !== 0 ? getDate(new Date(datas[index - 1].created_at)) : undefined;
  // const nowDate = getDate(new Date(data.created_at));

  return (
    <ListContainer>
      {messages.map((message: Message, index: number) => (
        <Chat
          key={index}
          message={message}
          gender={index % 3 ? 1 : 0}
          isLeft={index % 2 ? true : false}
          isHost={index % 3 ? true : false}
        />
      ))}
    </ListContainer>
  );
};

type ChildProps = {
  message: Message;
  gender: number;
  isLeft: boolean;
  isHost: boolean;
};

const Chat: React.FC<ChildProps> = ({ message, gender, isLeft, isHost }) => {
  const GenderRect = () => (gender == 1 ? <ManRect /> : <WomanRect />);
  return (
    <Container>
      {isLeft ? (
        <MessageProfile>
          {/* 프로필 */}
          {isHost ? (
            <CrownView>
              <Crown />
            </CrownView>
          ) : null}
          <GenderRect />
        </MessageProfile>
      ) : null}
      <MessageConatiner>
        {isLeft ? <UserName>화성인</UserName> : null}
        <UserChat>
          {!isLeft ? <ChatTime>오전 9:30</ChatTime> : null}
          <ChatText isLeft={isLeft}>
            야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야야
          </ChatText>
          {isLeft ? <ChatTime>오전 9:30</ChatTime> : null}
        </UserChat>
      </MessageConatiner>
    </Container>
  );
};
// ChatList
// Profile
const ListContainer = styled.View`
  align-items: center;
  margin-top: 20px;
`;
// Chat
const ChatTime = styled.Text`
  color: #b7b7bb;
  font-size: 9px;
  text-align-vertical: bottom;
  padding: 0 7px;
`;
const ChatText: any = styled.Text`
  max-width: ${String(windowWidth * 0.8 - 60)}px;
  color: #5c5c5d;
  background-color: ${(props) => (props.isLeft ? "#E5E5E8" : "white")};
  padding: 8px 21px;
  border-width: ${(props) => (props.isLeft ? "0" : "1")}px;
  border-color: ${(props) => (props.isLeft ? "rgba(0,0,0,0)" : "#B7B7BB")};
  border-radius: 9.5px;
`;
const UserChat = styled.View`
  flex-direction: row;
`;
const UserName: any = styled.Text`
  color: #5c5c5d;
`;
const CrownView = styled.View`
  position: absolute;
  z-index: 1;
  top: -10px;
`;
const MessageProfile = styled.View`
  margin-top: 15px;
  width: 40px;
  align-items: center;
`;
const MessageConatiner = styled.View`
  width: ${String(windowWidth * 0.9 - 40)}px;
`;
const Container = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
`;
