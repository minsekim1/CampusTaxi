import styled from "@emotion/native";
import React from "react";
import { windowWidth } from "../../constant";
import { Crown } from "../icon/chat/Crown";
import { ManRect } from "../icon/chat/ManRect";
import { WomanRect } from "../icon/chat/WomanRect";
import { DateToRecently } from "./date";
import { Message } from "./Message";

type Props = {
  message: Message;
  gender: number;
  isLeft: boolean;
  isHost: boolean;
};

export const Chat: React.FC<Props> = ({ message, gender, isLeft, isHost }) => {
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
      <MessageConatiner isLeft={isLeft}>
        {isLeft ? <UserName>{message.writer}</UserName> : null}
        <UserChat>
          {!isLeft ? <ChatTime>{DateToRecently(message.created_at)}</ChatTime> : null}
          <ChatText isLeft={isLeft}>
            {message.message}
            <SearchedText>
              {message.message_searched}
              </SearchedText>
            {message.message_afterSearchText}
          </ChatText>
          {isLeft ? <ChatTime>{DateToRecently(message.created_at)}</ChatTime> : null}
        </UserChat>
      </MessageConatiner>
    </Container>
  );
};
// ChatList
// Profile
// Search
const SearchedText = styled.Text`color:white; background-color:black;`
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
const MessageConatiner:any = styled.View`
  width: ${String(windowWidth * 0.9 - 40)}px;
  align-items: ${(props) => (props.isLeft ? "flex-start" : "flex-end")}; ;
`;
const Container = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
`;
