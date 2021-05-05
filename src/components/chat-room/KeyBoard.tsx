import styled from "@emotion/native";
import React, { Dispatch, SetStateAction,useEffect, useState } from "react";
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

  const [plusMenuHeight, setPlusMenuHeight] = useState(0);
  const [plusIconSize, setPlusIconSize] = useState(0);
  const [plusMenuActive, setPlusMenuActive] = useState(0);

  function ActivePlusMenu(toggle: number){
    if (toggle === 0){              
      setPlusMenuHeight(100); setPlusIconSize(60); setPlusMenuActive(1);
    }
    else{
      setPlusMenuHeight(0); setPlusIconSize(0); setPlusMenuActive(0);
    }
  }
  
  return (
    <KeyboardLayout>
    <PlusButtonMenu style={{height: plusMenuHeight}}>
      <SelectPicture style={{height: plusIconSize, width: plusIconSize}}/>
      <SelectEmoticon style={{height: plusIconSize, width: plusIconSize}}/>
    </PlusButtonMenu>
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
          <AddView onPress={() => {
            //눌렀을 때 플러스 메뉴를 활성화/비활성화합니다
            if (plusMenuActive === 0)             
              ActivePlusMenu(0)            
            else
              ActivePlusMenu(1)            
            }}> 
            <AddIcon />
          </AddView>
          <InputView>
            <TextArea
              value={message}
              autoCapitalize="none"
              returnKeyType="none"
              multiline={true}
              onChangeText={setMessage}
              // onSubmitEditing={(t:string)=>onSubmitEditing(t)}
            />
          </InputView>
            <SendView disabled={message ? false : true} onPress={() => { setMessage(""); onSubmitEditing(message); }}>
            <SendIcon isActive={message ? true : false} />
          </SendView>
        </>
      )}
    </TextAreaContainer>
    </KeyboardLayout>
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

const KeyboardLayout = styled.View`
  background-color: #faf9f9;
  padding: 7px 12px;
  flex-direction: column;
`;

const PlusButtonMenu = styled.View `
  background-color: #faf9f9;
  height: 100px;
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

const SelectPicture = styled.TouchableOpacity`
  margin: 5px;
  background-color: #00b7ff;
  height: 70px;
  width: 70px;
`;

const SelectEmoticon = styled.TouchableOpacity`
  margin: 5px;
  background-color: #b657ff;
  height: 70px;
  width: 70px;
`;