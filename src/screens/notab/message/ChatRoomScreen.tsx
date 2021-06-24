import styled from "@emotion/native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import { differenceInMilliseconds } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  FlatList,
  StatusBar,
  Text,
  TextInput,
  Alert,
  ToastAndroid,
  AlertIOS,
  ImageBackground,
  View,
} from "react-native";
import { ChatRoom } from "../../../components/chat-room/ChatRoomList";
import { KeyBoard } from "../../../components/chat-room/unused_KeyBoard";
import KeyBoardInput from "../../../components/chat-room/KeyBoardInput";
import { Chat } from "../../../components/chat/ChatList";
import { Message, MessageDummy } from "../../../components/chat/Message";
import { GenderColor } from "../../../components/color/GenderColor";
import BackIconWhite from "../../../components/icon/chat/BackIconWhite";
import { Crown } from "../../../components/icon/chat/Crown";
import { Menu } from "../../../components/icon/chat/Menu";
import { SearchIcon } from "../../../components/icon/chat/SearchIcon";
import { BlankBackground } from "../../../components/layout/BlankBackground";
import {
  showToast,
  showToastWithGravity,
} from "../../../components/layout/Toast";
import { API_URL, socketURL, premiumURL, windowWidth } from "../../../constant";
import { useAuthContext } from "../../../contexts/AuthContext";
import { MessageNoTabNavigationParamList } from "./MessageNoTabNavigation";

import io, { Socket } from "socket.io-client";
import { CustomAxios } from "../../../components/axios/axios";

const isBase64 = require('is-base64');

export type MessageNoTabNavigationProp = StackNavigationProp<
  MessageNoTabNavigationParamList,
  "ChatRoomScreen"
>;

type NavigationRoute = RouteProp<
  MessageNoTabNavigationParamList,
  "ChatRoomScreen"
>;

export type searchProps = {
  index: number;
  indexInMessage: number;
  searchString: string;
  result_message: Message[];
  index_InResult: number;
};

export type Theme = {
  bgimg: string;
  dateinner: string;
  dateouter: string;
  revinner: string;
  revouter: string;
  revtext: string;
  sendinner: string;
  sendouter: string;
  sendtext: string;
  nametext: string;
};

export const ChatRoomScreen: React.FC = () => {
  //#region States
  const { navigate } = useNavigation<MessageNoTabNavigationProp>();
  const [messages, setMessages] = useState<Message[]>([]); //MessageDummy
  const [searchResult, setSearchResult] = useState<searchProps>();
  const [theme, setTheme] = useState<Theme>();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("NORMAL");
  const [room, setRoom] = useState<ChatRoom>(
    useAuthContext().MoveNav.props.data
  );
  // const route = useRoute<NavigationRoute>();
  // const [refetch, setRefetch] = useState<Date>();
  const [search, setSearch] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const searchRef = React.useRef<TextInput>(null);
  const ChatScrollRef = useRef<FlatList>(null);
  //#endregion States

  const [ispremium, setIspremium] = useState(false);

  //#region 초기 세팅
  const {
    setNavName,
    socket,
    User,
    token,
    resetToken,
    refresh,
  } = useAuthContext();
  const { firebaseToken } = useAuthContext();

  //#region 웹소켓
  useEffect(() => {
    let isSubscribed = true;
    // 강퇴시 해당방 안에있으면 내채팅으로 뒤로가기
    socket?.on("kicked", (c: { room_id: number; hostname: string }) => {
      if (c.room_id == room.id)
        setNavName({
          istab: "Tab",
          tab: "MessageTabScreen",
          screen: "ChatRoomScreen",
          props: null,
        });
    });

    //방의 테마 가져오기
    axios
        .post(
          `${premiumURL}getRoomTheme/`,
          {
            roomid: room.id,
          },
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setTheme(res.data[0])
        });

    //#region 내방목록 가져오기
    if (!!User && !!socket) {
      socket.emit("chatEnter", {
        room_id: room.id,
        nickname: User.nickname,
      });
      //이전 채팅 받아오기

      socket.on("chatEnter chat", (response) => {
        if (isSubscribed) setMessages(response.data);
        //#region 채팅 받기
        socket.on("chat", (chat) => {
          // console.log(chat);
          let a: Array<Message> = response.data;
          if (chat.nickname != User.nickname) {
            a.unshift({
              id: a.length + 1,
              message: chat.msg,
              message_type: chat.msg_type,
              writer: chat.nickname,
              room: room.id,
              created_at: new Date(),
              updated_at: new Date(),
              index: a.length + 1,
            });
            if (isSubscribed) {
              setMessages(a);
              ChatScrollRef.current?.forceUpdate();
            }
          }
        });
        //#endregion 채팅 받기
      });
    }
    //#endregion 내방목록 가져오기
    //#region 상태바
    if (Platform.OS === "android")
      StatusBar.setBackgroundColor('white');
    StatusBar.setBarStyle("dark-content");
    //#endregion 상태바
    //#region ChatRoom Info Reset
    CustomAxios(
      "GET",
      `${API_URL}/v1/rooms/`,
      resetToken,
      refresh,
      token,
      undefined, //"User API",
      undefined,
      (d: any
      ) => {
        setRoom(d.results[0]);
        // let data = JSON.stringify(d);
      }
    );
    //#endregion ChatRoom Info Reset
    return () => (isSubscribed = false);
  }, []);
  //#endregion 유저 데이터 요청
  //#endregion 초기 세팅

  //#region 채팅 전송
  function notifyMessage(msg: string) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      AlertIOS.alert(msg);
    }
  }
  
  const sendMessage = (text: string, textType: string) => {
    console.log("room.id:",room.id)
    socket?.emit("chat", {
      msg: text,
      msg_type: textType,
      room_id: room.id,
      nickname: User?.nickname,
      firebaseToken: firebaseToken,
    });
    let a: Array<Message> = messages;
    a.unshift({
      id: a.length + 1,
      message: text,
      message_type: textType,
      writer: User ? User.nickname : "",
      room: room.id,
      created_at: new Date(),
      updated_at: new Date(),
      index: a.length + 1,
    });
    setMessages(a);
    ChatScrollRef.current?.forceUpdate();
  };
  //#endregion 채팅 전송
  //#endregion 웹소켓

  useEffect(() => {
    if (search) searchRef.current?.focus();
  }, [search]);

  useEffect(() => {
    if (room.id == -1) console.warn("room.id 가 -1입니다.");
    // else if (room.id) {
    //   axios
    //     .get<Message[]>(`${API_URL}/api/v1/chat/${room.id}`, {
    //       headers: {
    //         Authorization: `Token ${token}`,
    //       },
    //     })
    //     .then((response) => {
    //       console.log('chat',response)
    //       // const data = response.data.sort((a, b) =>
    //       //   differenceInMilliseconds(
    //       //     new Date(a.created_at),
    //       //     new Date(b.created_at)
    //       //   )
    //       // );
    //     });
    // }
  }, [room.id, token]);

  //#region 검색
  const searchOnSubmit = async () => {
    // 채팅 데이터 검색 함수
    // 채팅 데이터가 없는 경우
    if (!messages)
      showToastWithGravity("채팅 데이터가 없어 검색이 되지 않습니다.");
    // 입력한게 없는 경우
    else if (!searchInput) return;
    else {
      // 텍스트인풋에서 포커싱해제
      searchRef.current?.blur();
      // 해당 문자열이 포함된 것 반환
      const r = messages.filter((d) => d.message.includes(searchInput));
      if (r) {
        const result: searchProps = {
          index: r[0].index, //현재 찾은 메세지 인덱스
          indexInMessage: r[0].message.indexOf(searchInput), //한 메세지안에서 몇 글자 위치인지? 위아래 버튼 누를때 바뀜
          searchString: searchInput,
          result_message: r,
          index_InResult: 0,
        };
        setSearchResult(result);
        // 결과가 있을경우 첫번째로 스크롤 하고 message_searchedText로 잘라 넣음
        if (result.result_message[0]) {
          ChatScrollRef.current?.scrollToItem({
            animated: true,
            item: result.result_message[0],
          });
        }
      }
      // 결과가 없을경우 없음 출력
      else showToastWithGravity("검색 결과가 없습니다.");
    }
  };
  const onPressUpSearch = () => {
    if (!searchResult) return;
    // 현재 메세지의 현재 위치 기준으로 이전 텍스트를 자름 => 현재 메세지에서 이전 문자열을 검사하기 위함
    const cutString = messages[
      messages.length - searchResult.index
    ].message.slice(0, searchResult.indexInMessage);
    // 현재 검색결과로 보여준 전체 메세지 안에서  이전 결과 중 가장 마지막을 찾음
    let indexInMessage = cutString.lastIndexOf(searchResult.searchString);
    // 만약 결과가 없고 이전 메세지가 필터된 결과에 있을경우 이전 메세지로감
    if (
      indexInMessage == -1 &&
      searchResult.result_message.length - 1 > searchResult.index_InResult
    ) {
      // 메세지 인덱스를 빼고 이전 메세지에서 결과를 찾고
      // 이전 결과에서 다시 찾아서 결과를 넣음
      const r: searchProps = {
        ...searchResult,
        index:
          searchResult.result_message[searchResult.index_InResult + 1].index,
        indexInMessage: searchResult.result_message[
          searchResult.index_InResult + 1
        ].message.lastIndexOf(searchInput),
        index_InResult: searchResult.index_InResult + 1,
      };
      setSearchResult(r);
      // 스크롤
      ChatScrollRef.current?.scrollToItem({
        animated: true,
        item:
          searchResult.result_message[searchResult.index_InResult + 1].index,
      });
    } else if (indexInMessage != -1) {
      // 결과가 있을경우
      //메세지 안에서 결과가 있을경우 강조 글씨 바꾸고 스크롤함
      const r: searchProps = {
        ...searchResult,
        indexInMessage: indexInMessage,
      };
      setSearchResult(r);
      // 스크롤
      ChatScrollRef.current?.scrollToItem({
        animated: true,
        item: searchResult.index,
      });
    } else showToast("이전이 없습니다.");
  };
  const onPressDownSearch = () => {
    // 현재 검색결과로 보여준 전체 메세지 안에서 다음 결과를 찾음
    if (!searchResult) return;
    let indexInMessage = messages[
      messages.length - searchResult.index
    ].message.indexOf(searchInput, searchResult.indexInMessage + 1);

    // 현재 메세지 안에서 결과가 없을 경우 메세지 인덱스를 더 하고 다음 메세지에 첫번째 결과로 넣음, 단, 다음 메세지가 있어야됌
    if (indexInMessage == -1 && 0 < searchResult.index_InResult) {
      // 메세지 인덱스를 더하고 다음 메세지에서 결과를 찾고
      // 다음 결과에서 다시 찾아서 결과를 넣음
      const r: searchProps = {
        ...searchResult,
        index:
          searchResult.result_message[searchResult.index_InResult - 1].index,
        indexInMessage: searchResult.result_message[
          searchResult.index_InResult - 1
        ].message.indexOf(searchInput),
        index_InResult: searchResult.index_InResult - 1,
      };
      setSearchResult(r);
      // 스크롤
      ChatScrollRef.current?.scrollToItem({
        animated: true,
        item:
          searchResult.result_message[searchResult.index_InResult - 1].index,
      });
    } else if (indexInMessage != -1 && searchResult.index > -1) {
      //메세지 안에서 결과가 있을경우 강조 글씨 바꾸고 스크롤함
      const r: searchProps = {
        ...searchResult,
        indexInMessage: indexInMessage,
      };
      setSearchResult(r);
      // 스크롤
      ChatScrollRef.current?.scrollToItem({
        animated: true,
        item: searchResult.index,
      });
    } else showToast("다음이 없습니다.");
  };
  //#endregion 검색

  //#region 뒤로가기 제어
  const LeftBtnOnPress = () => {
    setNavName({ istab: "Tab", tab: "MessageTabScreen" });
    socket?.emit("chatClose", {
      nickname: User?.nickname,
      room_id: room.id,
    });
  };
  const ContentContainerStyle = {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  };
  //#endregion

  const CancelBtnOnPress = () => {
    setSearch(false);
    setSearchResult(undefined);
  };
const KeyBoardOnSubmit = (text: string, textType: string) => {
    
      
  if (isBase64(text)) {
      
      notifyMessage("이미지를 업로드중입니다...");
      axios
        .post(
          `${premiumURL}uploadPhoto/`,
          {
            imageBase64: text,
          },
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data === "") {           
            notifyMessage("이미지를 업로드를 실패했습니다.\n관리자에게 문의해주세요.");
          } else {           
            sendMessage(res.data, textType);
          }
        });
    }
    else {  
      sendMessage(text, textType);
    }
  };

  return (
    <BlankBackground color={'white'}>
      <KeyboardContainer
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Container>
          <ImageBackground source={{ uri: theme?.bgimg}} style={{flex:1, width: windowWidth}}>
            {/* 헤더 */}
            <TitleContainer room={room}>
              {search ? (
                <>
                  {/* 검색 중 화면 */}
                  <SearchBar>
                    <SearchIconView>
                      <SearchIcon fill="#B7B7BB" />
                    </SearchIconView>
                    <SearchInput
                      value={searchInput}
                      onChangeText={(t) => setSearchInput(t)}
                      onSubmitEditing={searchOnSubmit}
                      ref={searchRef}
                      returnKeyType="search"
                    />
                  </SearchBar>
                  <CancelBtn onPress={CancelBtnOnPress}>
                    <CancelText>취소</CancelText>
                  </CancelBtn>
                </>
              ) : (
                <>
                  {/* 검색 아닐 시 */}
                  <LeftBtn onPress={LeftBtnOnPress}>
                    <BackIconWhite />
                  </LeftBtn>
                  <HeaderTextView>
                    <OwnerTextView>
                        <Crown />
                         <Title>{room.owner}</Title>
                      </OwnerTextView>
                    <SubTitle>{room.gender}</SubTitle>
                  </HeaderTextView>
                  <Group>
                    <Btn onPress={() => setSearch(true)}>
                      <SearchIcon fill="#00567C" />
                    </Btn>
                    <Btn onPress={() => navigate("ChatRoomScreenDetails")}>
                      <Menu />
                    </Btn>
                  </Group>
                </>
              )}
            </TitleContainer>
            {/* 채팅 내용 */}
            <ContentContainer
              ref={ChatScrollRef}
              inverted
              data={messages}
              contentContainerStyle={ContentContainerStyle}
              extraData={messages}
              disableVirtualization={false}
              keyExtractor={(item: any, index: number) => index.toString()}
              renderItem={(props: any) => (
                <Chat
                  searchResult={searchResult}
                  theme={theme}
                  message={props.item}
                  gender={1}
                  isLeft={props.item.writer != User?.nickname}
                  isHost={props.item.writer == room.owner}
                />
              )}
            ></ContentContainer>
            {/* 키보드 */}
            <KeyBoardInput
              searchResult={searchResult}
              searchRef={searchRef}
              onSubmitEditing={KeyBoardOnSubmit}
              message={message}
              messageType={messageType}
              setMessage={setMessage}
              onPressDownSearch={onPressDownSearch}
              onPressUpSearch={onPressUpSearch}
              setMessageType={setMessageType}
            />
            {/* <KeyBoard
              searchResult={searchResult}
              searchRef={searchRef}
              onSubmitEditing={KeyBoardOnSubmit}
              message={message}
              setMessage={setMessage}
              onPressDownSearch={onPressDownSearch}
              onPressUpSearch={onPressUpSearch}
            /> */}
          </ImageBackground>
        </Container>
      </KeyboardContainer>
    </BlankBackground>
  );
};
const LeftBtn = styled.TouchableOpacity`
  position: absolute;
  left: 15px;
  padding: 10px;
`;
const CancelBtn = styled.TouchableOpacity`
  padding: 10px 10px 10px 10px;
`;
const CancelText = styled.Text`
  color: black;
  margin: 0;
`;
const SearchBar = styled.View`
  background-color: white;
  flex-direction: row;
  border-radius: 3px;
`;
const SearchIconView = styled.View`
  height: 31px;
  margin-top: 3px;
  padding: 0 10px 0 5px;
  justify-content: center;
`;
const SearchInput = styled.TextInput`
  height: 31px;
  margin-top: 3px;
  width: 60%;
  padding: 0;
`;
const Btn = styled.TouchableOpacity`
  margin: 2px 3px 0 3px;
  padding: 0 6px 0 6px;
`;
const Group = styled.View`
  position: absolute;
  right: 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;
const Title = styled.Text`
  color: black;
  margin: 3px 0 0 10px;
  font-size: 18px;
  font-weight: bold;
`;
const SubTitle = styled.Text`
  color: black;
  margin: 1px 0 0 10px;
  font-size: 11px;
`;
const Container = styled.SafeAreaView`
  justify-content: space-around;
  margin-top: 22px;
  flex: 1;
`;

const KeyboardContainer = styled.KeyboardAvoidingView`
  flex: 1;
`;

const TitleContainer: any = styled.View`
  background-color: #ffffff;
  height: 55px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const HeaderTextView: any = styled.View`
  justify-content: center;
  align-items: center;
`;

const OwnerTextView: any = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;


const ContentContainer: any = styled.FlatList``;
