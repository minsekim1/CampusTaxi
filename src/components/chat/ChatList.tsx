import styled from "@emotion/native";
import React from "react";
import { Image } from "react-native";
import { proc } from "react-native-reanimated";
import { windowWidth } from "../../constant";
import { searchProps } from "../../screens/notab/message/ChatRoomScreen";
import { Theme } from "../../screens/notab/message/ChatRoomScreen";
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
  searchResult?: searchProps;
  theme: Theme;
};


export const Chat: React.FC<Props> = ({
  message,
  gender,
  isLeft,
  isHost,
  searchResult,
  theme,
}) => {
  const GenderRect = () => (gender == 1 ? <ManRect /> : <WomanRect />);
  let sliceText = undefined;
  if (message.index === searchResult?.index) {
    sliceText = [
      message.message.slice(0, searchResult.indexInMessage),
      searchResult?.searchString,
      message.message.slice(
        searchResult.indexInMessage + searchResult?.searchString.length,
        message.message.length
      ),
    ];
  }
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
      <MessageConatiner isLeft={isLeft} theme={theme}>
        {isLeft ? <UserName theme={theme}>{message.writer}</UserName> : null}
        <UserChat>
          {!isLeft ? (
            <ChatTime>{DateToRecently(message.created_at)}</ChatTime>
          ) : null}
          {//console.log(message.message_type)
          }
          {
            message.message_type !== "NORMAL" ?
           <Image
              style={{
                height: 100, width: 100
              }}
              source={{uri: message.message}}
            />
          :
          <ChatText isLeft={isLeft} theme={theme}>
            {sliceText && searchResult ? sliceText[0] : message.message}
            {sliceText ? <SearchedText>{sliceText[1]}</SearchedText> : null}
            {sliceText && searchResult ? sliceText[2] : null}
          </ChatText>}
          
          {isLeft ? (
            <ChatTime>{DateToRecently(message.created_at)}</ChatTime>
          ) : null}
        </UserChat>
      </MessageConatiner>
    </Container>
  );
};
// ChatList
// Profile
// Search
const SearchedText = styled.Text`
  color: white;
  background-color: black;
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
  color: ${(props) => (props.isLeft ? props.theme.revtext : props.theme.sendtext)};
  background-color: ${(props) => (props.isLeft ? props.theme.revinner : props.theme.sendinner)};
  padding: 8px 21px;
  border-width: 1px;
  border-color: ${(props) => (props.isLeft ? props.theme.revouter : props.theme.sendouter)};
  border-radius: ${(props) => (props.isLeft ? "63px 63px 63px 0;" : "63px 63px 0 63px;")};
`;
const UserChat = styled.View`
  flex-direction: row;
`;
const UserName: any = styled.Text`
  color: ${(props) => props.theme.nametext};
  margin-bottom: 5px;
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
const MessageConatiner: any = styled.View`
  width: ${String(windowWidth * 0.9 - 40)}px;
  align-items: ${(props) => (props.isLeft ? "flex-start" : "flex-end")};
`;
const Container = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
`;
