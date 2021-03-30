import styled from "@emotion/native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import { differenceInMilliseconds } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { Platform, ScrollView, StatusBar, Text, TextInput } from "react-native";
import { ChatRoom } from "../../../components/chat-room/ChatRoomList";
import { ChatList } from "../../../components/chat/ChatList";
import { Message, MessageDummy } from "../../../components/chat/Message";
import { GenderColor } from "../../../components/color/GenderColor";
import BackIconWhite from "../../../components/icon/chat/BackIconWhite";
import { Crown } from "../../../components/icon/chat/Crown";
import { Menu } from "../../../components/icon/chat/Menu";
import { SearchIcon } from "../../../components/icon/chat/SearchIcon";
import { BlankBackground } from "../../../components/layout/BlankBackground";
import { showToastWithGravity } from "../../../components/layout/Toast";
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

export const ChatRoomScreen: React.FC = () => {
  const { navigate } = useNavigation<MessageNoTabNavigationProp>();
  const [messages, setMessages] = useState<Message[]>(MessageDummy);
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
  const scrollView = useRef<ScrollView>(null);
  const { setNavName } = useAuthContext();

  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(GenderColor(room?.gender));
    }
    StatusBar.setBarStyle("dark-content");
  }, []);

  useEffect(() => {
    if (search) searchRef.current?.focus();
  },[search])
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
          console.log(data);
          // setDatas(data);
        });
    }
  }, [room.id, token, refetch]);

  useEffect(() => {
    if (messages && scrollView.current) {
      setTimeout(() => {
        scrollView.current?.scrollToEnd({ animated: true });
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

  const searchOnChangeText = (t: string) => {
    setSearchInput(t);
    if (!messages)
      showToastWithGravity("채팅 데이터가 없어 검색이 되지 않습니다.");
  };
  const LeftBtnOnPress = () =>
    setNavName({ istab: "Tab", tab: "MessageTabScreen" });
  const ContentContainerOnonLayout = () => {
    scrollView.current?.scrollToEnd({ animated: true });
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
                      onChangeText={(t) => searchOnChangeText(t)}
                      ref={searchRef}
                    />
                  </SearchBar>
                  <CancelBtn onPress={() => setSearch(false)}>
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
              ref={scrollView}
              onLayout={ContentContainerOnonLayout}
            >
              <ChatList messages={messages} />
            </ContentContainer>
            <TextAreaContainer>
              <TextArea
                value={message}
                autoCapitalize="none"
                returnKeyType="send"
                onChangeText={setMessage}
                onSubmitEditing={(e) => {
                  setMessage("");
                  sendMessage(e.nativeEvent.text);
                }}
              />
            </TextAreaContainer>
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
const CancelBtn = styled.TouchableOpacity``;
const CancelText = styled.Text`
  color: white;
  padding-left: 10px;
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

const ContentContainer = styled.ScrollView`
  margin-bottom: 12px;
`;

const TextAreaContainer = styled.View`
  padding: 5px 22px 10px 24px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
  background-color: #faf9f9;
`;

const TextArea = styled.TextInput`
  padding: 8px 12px;
  margin: 5px 0 1px 10px;
  border-radius: 21px;
  border: solid 1px #b7b7bb;
  background-color: #ffffff;
`;
