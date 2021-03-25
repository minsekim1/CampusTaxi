import styled from "@emotion/native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import { differenceInMilliseconds } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { Platform, ScrollView, StatusBar, Text, TextInput } from "react-native";
import BackIconWhite from "../../../components/icon/chat/BackIconWhite";
import { Crown } from "../../../components/icon/chat/Crown";
import { Menu } from "../../../components/icon/chat/Menu";
import { SearchIcon } from "../../../components/icon/chat/SearchIcon";
import { BlankBackground } from "../../../components/layout/BlankBackground";
import { showToastWithGravity } from "../../../components/layout/Toast";
import { API_URL } from "../../../constant";
import { useAuthContext } from "../../../contexts/AuthContext";
import { MessageNoTabNavigationParamList } from "./MessageNoTabNavigation";

export type MessageNoTabNavigationProp = StackNavigationProp<MessageNoTabNavigationParamList, 'ChatRoomScreen'>;

type NavigationRoute = RouteProp<
  MessageNoTabNavigationParamList,
  "ChatRoomScreen"
>;
export type Message = {
  id: number;
  message: string;
  message_type: "Message" | "Notice" | "Enter";
  writer: number;
  room: number;
  created_at: Date;
  updated_at: Date;
};

const data: Message[] | (() => Message[]) = [
  {
    id: 1,
    message: "hello",
    message_type: "Message",
    writer: 1,
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    message: "hello",
    message_type: "Message",
    writer: 1,
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    message: "hello",
    message_type: "Message",
    writer: 2,
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export const ChatRoomScreen: React.FC = () => {
  const { navigate } = useNavigation<MessageNoTabNavigationProp>();
  const [datas, setDatas] = useState<Message[]>(data);
  const [message, setMessage] = useState("");
  const { token } = useAuthContext();
  const route = useRoute<NavigationRoute>();
  const id = useAuthContext().MoveNav.props.id;
  const [refetch, setRefetch] = useState<Date>();
  const [search, setSearch] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const searchRef = React.useRef<TextInput>(null);
  const scrollView = useRef<ScrollView>(null);
  const { setNavName } = useAuthContext();

  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#579FEE");
    }
    StatusBar.setBarStyle("dark-content");
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get<Message[]>(`${API_URL}/api/v1/messages/?room=${id}`, {
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
          // setDatas(data);
        });
    }
  }, [id, token, refetch]);

  useEffect(() => {
    if (datas && scrollView.current) {
      setTimeout(() => {
        scrollView.current?.scrollToEnd({ animated: true });
      }, 500);
    }
  }, [scrollView, datas]);

  const sendMessage = (text: string) => {
    if (token) {
      axios
        .post(
          `${API_URL}/api/v1/messages/`,
          { message: text, message_type: "Message", writer: 1, room: id },
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
    showToastWithGravity("채팅 데이터가 없어 검색이 되지 않습니다.");
  };
  return (
    <BlankBackground color="#579fee">
      <KeyboardContainer
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Container>
          <BlankBackground color="#fff">
            <TitleContainer>
              {search ? (
                <>
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
                  <LeftBtn onPress={()=>setNavName({istab:'Tab', tab:'MessageTabScreen'})}>
                    <BackIconWhite />
                  </LeftBtn>
                  <Crown />
                  <Title>asd</Title>
                  <Group>
                    <Btn onPress={() => setSearch(true)}>
                      <SearchIcon fill="white" />
                    </Btn>
                    <Btn onPress={() => navigate('ChatRoomScreenDetails')}>
                      <Menu />
                    </Btn>
                  </Group>
                </>
              )}
            </TitleContainer>
            <ContentContainer
              ref={scrollView}
              onLayout={() => {
                scrollView.current?.scrollToEnd({ animated: true });
              }}
            >
              {/* {datas.map((data, index) => (
                <Chat key={data.created_at.toString()} data={data} index={index} datas={datas} />
              ))} */}
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

const TitleContainer = styled.View`
  background-color: #579fee;
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
