import styled from "@emotion/native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import { differenceInMilliseconds } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { Platform, FlatList, StatusBar, Text, TextInput } from "react-native";
import { ChatRoom } from "../../../components/chat-room/ChatRoomList";
import { KeyBoard } from "../../../components/chat-room/KeyBoard";
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
import { API_URL } from "../../../constant";
import { useAuthContext } from "../../../contexts/AuthContext";
import { MessageNoTabNavigationParamList } from "./MessageNoTabNavigation";

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
export const ChatRoomScreen: React.FC = () => {
  const { navigate } = useNavigation<MessageNoTabNavigationProp>();
  const [messages, setMessages] = useState<Message[]>(MessageDummy);
  const [searchResult, setSearchResult] = useState<searchProps>();
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState<ChatRoom>(
    useAuthContext().MoveNav.props.data
  );
  const { token } = useAuthContext();
  const route = useRoute<NavigationRoute>();
  const [refetch, setRefetch] = useState<Date>();
  const [search, setSearch] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const searchRef = React.useRef<TextInput>(null);
  const ChatScrollRef = useRef<FlatList>(null);
  const { setNavName } = useAuthContext();

  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(GenderColor(room?.gender));
    }
    StatusBar.setBarStyle("light-content");
  }, []);

  useEffect(() => {
    if (search) searchRef.current?.focus();
  }, [search]);
  useEffect(() => {
    if (room.id == -1) console.warn("room.id 가 -1입니다.");
    else if (room.id) {
      axios
        .get<Message[]>(`${API_URL}/api/v1/messages/?room=${room.id}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          const data = response.data.sort((a, b) =>
            differenceInMilliseconds(
              new Date(a.created_at),
              new Date(b.created_at)
            )
          );
          // console.log(data);
          // setDatas(data);
        });
    }
  }, [room.id, token, refetch]);

  useEffect(() => {
    if (messages && ChatScrollRef.current) {
      setTimeout(() => {
        ChatScrollRef.current?.scrollToEnd({ animated: true });
      }, 500);
    }
  }, []); //scrollView, messages

  const sendMessage = (text: string) => {
    if (token) {
      axios
        .post(
          `${API_URL}/api/v1/messages/`,
          { message: text, message_type: "Message", writer: 1, room: room.id },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then(() => {
          setRefetch(new Date());
        });
    }
  };

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
    const cutString = messages[searchResult.index].message.slice(
      0,
      searchResult.indexInMessage
    );
    // 현재 검색결과로 보여준 전체 메세지 안에서  이전 결과 중 가장 마지막을 찾음
    let indexInMessage = cutString.lastIndexOf(searchResult.searchString);
    // 만약 결과가 없고 이전 메세지가 필터된 결과에 있을경우 이전 메세지로감
    if (indexInMessage == -1 && 0 < searchResult.index_InResult) {
      // 메세지 인덱스를 빼고 이전 메세지에서 결과를 찾고
      // 이전 결과에서 다시 찾아서 결과를 넣음
      const r: searchProps = {
        ...searchResult,
        index:
          searchResult.result_message[searchResult.index_InResult - 1].index,
        indexInMessage: searchResult.result_message[
          searchResult.index_InResult - 1
        ].message.lastIndexOf(searchInput),
        index_InResult: searchResult.index_InResult - 1,
      };
      setSearchResult(r);
      // 스크롤
      ChatScrollRef.current?.scrollToItem({
        animated: true,
        item: searchResult.result_message[searchResult.index_InResult - 1].index,
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
    let indexInMessage = messages[searchResult.index].message.indexOf(
      searchInput,
      searchResult.indexInMessage + 1
    );
    // 현재 메세지 안에서 결과가 없을 경우 메세지 인덱스를 더 하고 다음 메세지에 첫번째 결과로 넣음, 단, 다음 메세지가 있어야됌
    if (
      indexInMessage == -1 &&
      searchResult.result_message.length > searchResult.index_InResult + 1
    ) {
      // 메세지 인덱스를 더하고 다음 메세지에서 결과를 찾고
      // 다음 결과에서 다시 찾아서 결과를 넣음
      const r: searchProps = {
        ...searchResult,
        index:
          searchResult.result_message[searchResult.index_InResult + 1].index,
        indexInMessage: searchResult.result_message[
          searchResult.index_InResult + 1
        ].message.indexOf(searchInput),
        index_InResult: searchResult.index_InResult + 1,
      };
      setSearchResult(r);
      // 스크롤
      ChatScrollRef.current?.scrollToItem({
        animated: true,
        item: searchResult.result_message[searchResult.index_InResult + 1].index,
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
  const LeftBtnOnPress = () =>
    setNavName({ istab: "Tab", tab: "MessageTabScreen" });
  const ContentContainerStyle = {
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 20,
  };
  const CancelBtnOnPress = () => {
    setSearch(false);
    setSearchResult(undefined);
  };
  const KeyBoardOnSubmit = (e: any) => {
    setMessage("");
    sendMessage(e.nativeEvent.text);
  };
  return (
    <BlankBackground color={GenderColor(room?.gender)}>
      <KeyboardContainer
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Container>
          <BlankBackground color="#fff">
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
                  <Crown />
                  <Title>asd</Title>
                  <Group>
                    <Btn onPress={() => setSearch(true)}>
                      <SearchIcon fill="white" />
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
              data={messages}
              contentContainerStyle={ContentContainerStyle}
              renderItem={(props: any) => (
                <Chat
                  key={props.index}
                  searchResult={searchResult}
                  message={props.item}
                  gender={props.index % 3 ? 1 : 0}
                  isLeft={props.index % 2 ? true : false}
                  isHost={props.index % 3 ? true : false}
                />
              )}
            ></ContentContainer>
            {/* 키보드 */}
            <KeyBoard
              searchResult={searchResult}
              searchRef={searchRef}
              onSubmitEditing={KeyBoardOnSubmit}
              message={message}
              setMessage={setMessage}
              onPressDownSearch={onPressDownSearch}
              onPressUpSearch={onPressUpSearch}
            />
          </BlankBackground>
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
  color: white;
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
  color: white;
  margin: 3px 0 0 10px;
  font-size: 18px;
  font-weight: bold;
`;
const Container = styled.SafeAreaView`
  justify-content: space-around;
  padding-top: 24px;
  flex: 1;
`;

const KeyboardContainer = styled.KeyboardAvoidingView`
  flex: 1;
`;

const TitleContainer: any = styled.View`
  background-color: ${(props) => GenderColor(props.room.gender)};
  height: 55px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ContentContainer: any = styled.FlatList``;
