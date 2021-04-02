import styled from "@emotion/native";
import React, { Dispatch, SetStateAction } from "react";
import { Platform, TextInput } from "react-native";
import { searchProps } from "../../screens/notab/message/ChatRoomScreen";
import { Message } from "../chat/Message";
import { AddIcon } from "../icon/chat-room/AddIcon";
import { DownArrowIcon } from "../icon/chat-room/DownArrowIcon";
import { SendIcon } from "../icon/chat-room/SendIcon";
import { UpArrowIcon } from "../icon/chat-room/UpArrowIcon";

type Props = {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  searchResult?: searchProps;
  searchRef: React.RefObject<TextInput>;
	onSubmitEditing: (e: any) => void;
	onPressDownSearch: () => void;
	onPressUpSearch: () => void;
};
export const KeyBoard: React.FC<Props> = ({
  message,
  setMessage,
  searchResult,
  searchRef,
	onSubmitEditing,
  onPressDownSearch,
  onPressUpSearch,
}) => {
  return (
    <TextAreaContainer>
      {/* 검색 결과가 있을 떄는 위아래 화살표로 바뀜*/}
      {searchResult ? (
        <>
          <BlackView />
					<UpArrowView onPress={onPressUpSearch}>
            <UpArrowIcon isActive={true} />
          </UpArrowView>
          <DownArrowView onPress={onPressDownSearch}> 
            <DownArrowIcon isActive={true} />
          </DownArrowView>
        </>
      ) : (
        //검색 결과가 없으면 채팅 입력창이 뜸
        <>
          <AddView>
            <AddIcon />
          </AddView>
          <InputView>
            <TextArea
              value={message}
              autoCapitalize="none"
              returnKeyType="none"
              multiline={true}
              onChangeText={setMessage}
              onSubmitEditing={onSubmitEditing}
            />
          </InputView>
          <SendView disabled={message ? false : true}>
            <SendIcon isActive={message ? true : false} />
          </SendView>
        </>
      )}
    </TextAreaContainer>
  );
};
// 검색중
const BlackView = styled.View`
  flex: 8;
  align-items: center;
	justify-content: center;
	`;
	const UpArrowView = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
	`;
	const DownArrowView = styled.TouchableOpacity`
  flex: 1;
  height: 38px;
  align-items: center;
  justify-content: center;
`;

// 채팅중
const AddView = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const InputView = styled.View`
  flex: 6;
  justify-content: center;
`;
const SendView = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const TextAreaContainer = styled.View`
  background-color: #faf9f9;
  padding: 7px 12px;
  flex-direction: row;
`;

const TextArea: any = styled.TextInput`
  padding: 4px 15px;
  background-color: white;
  border-radius: 21px;
  margin: 0;
  border-width: 1px;
  border-color: #b7b7bb;
`;
