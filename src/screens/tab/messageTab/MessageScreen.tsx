import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Alert, BackHandler, Platform, ScrollView, Text } from "react-native";
import { CustomAxios } from "../../../components/axios/axios";
import {
  ChatRoom,
  ChatRoomDummyList,
  ChatRoomList,
} from "../../../components/chat-room/ChatRoomList";
import { showToast } from "../../../components/layout/Toast";
import { API_URL } from "../../../constant";
import { useAuthContext } from "../../../contexts/AuthContext";
import { User } from "../../../contexts/User";
import { MessageStackParamList } from "./MessageStackNavigation";

type MessageNavigation = StackNavigationProp<
  MessageStackParamList,
  "MessageScreen"
>;

export const Gender = ["여자", "남자"];
export const Week = ["일", "월", "화", "수", "목", "금", "토"];
export type APIData = {
  count: number;
  next: number;
  previous: number;
  results: ChatRoom[];
};

export const MessageScreen: React.FC = () => {
  const [datas, setDatas] = useState<ChatRoom[]>(ChatRoomDummyList);
  const { token, resetToken, refresh } = useAuthContext();
  const { setNavName } = useAuthContext();
  //#region 채팅방 입장하기:방 넘겨가기

  const props = useAuthContext().MoveNav.props;
  // if (props) {
  //   setNavName({
  //     istab: "NoTab",
  //     tab: "MessageNoTabNavigation",
  //     screen: "ChatRoomScreen",
  //     props: {
  //       data: props,
  //     },
  //   });
  //   return <></>;
  // }
  //#endregion
  const navigation = useNavigation<MessageNavigation>();
  // const {User} = useAuthContext()
  //#region 뒤로가기 버튼 제어 & 더블클릭시 앱 종료
  let currentCount = 0;
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
      //console.log("focus MainScreen");
    });
    navigation.addListener("blur", () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
      //console.log("blur MainScreen");
    });
  }, []);
  const handleBackButton = () => {
    if (currentCount < 1) {
      currentCount += 1;
      if (Platform.OS === "android") {
        showToast(
          "뒤로 가기를 한번 더 누르면 앱이 종료됩니다.\n로그아웃은 설정->로그아웃으로 가주세요."
        );
      } else {
        BackHandler.exitApp();
      }
      setTimeout(() => {
        currentCount = 0;
      }, 2000);
      return true;
    }
  };
  //#endregion 뒤로가기 버튼 제어 & 더블클릭시 앱 종료
  //#region 유저 데이터 요청
  // AuthContext 시용하지 않고 직접 데이터 요청함
  const [user, setUser] = useState<User>();
  useEffect(() => {
    //내 정보 가져오기
    CustomAxios(
      "GET",
      `${API_URL}/v1/accounts/me/`,
      resetToken,
      refresh,
      token,
      undefined, //"User API",
      undefined,
      (d: User) => {
        setUser(d);
        //#region 내방목록 가져오기
        CustomAxios(
          "GET",
          `${API_URL}/v1/accounts/rooms/`,
          resetToken,
          refresh,
          token,
          undefined,// "User Room",
          undefined,
          (d: ChatRoom[]) => setDatas(d)
        );
        //#endregion 내방목록 가져오기
      }
    );
    // axios
    //   .get("https://api.campustaxi.net/api/v1/accounts/me/", {
    //     headers: {
    //       Authorization: "Bearer " + token,
    //       accept: "application/json",
    //     },
    //   })
    //   .then((d) => {
    //     setUser(d.data);
    //
    //      axios
    //     .get(`${API_URL}/api/v1/accounts/rooms/`, { //TEST CDOE minsekim 추후 변경필요 현재 campustaxiadmin로 고정
    //       headers: {
    //         Authorization: `Bearer ewZe6EwgRV6wn9jR4vYIP0:APA91bHnNRaC71PhOmvSy5jCrcTYMzjPxSvN53k8gfjTeup0_cROQeIDR1a6xXSAY6Iw2UIW2mRT4elWvhz9SrY6hG6J0KJHzojz-mjE8GWUtavUj6CTR44JFkHQqnd6g_Y28IIBn13w`,
    //         accept: `application/json`,

    //       },
    //     })
    //     .then((response) => {

    //     }).catch((e) => console.log(e.message == "Request failed with status code 401"));
    //
    //   });
  }, []);
  //#endregion 유저 데이터 요청

  return (
    <Container>
      <ScrollView contentContainerStyle={{ marginTop: 10 }}>
        <ChatRoomList
          datas={datas}
          onPress={(data: ChatRoom) => () =>
            setNavName({
              istab: "NoTab",
              tab: "MessageNoTabNavigation",
              screen: "ChatRoomScreen", //CreateScreenDetails하면 기본 초기화 화면 바꿔서 바로 그쪽으로 이동. 안의 props값은 useAuthContext로 해당 페이지에서 또 읽음
              props: {
                data: data,
              },
            })}
        />
      </ScrollView>
    </Container>
  );
};
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;
