import React, { useEffect } from "react";
import { useAuthContext, MoveNavProps } from "../contexts/AuthContext";
import { LoginNavigation } from "./notab/login/LoginNavigation";
import { TabNavigation } from "./tab/TabNavigation";
import { NoTabNavigation } from "./notab/NoTabNavigation";
import { CustomAxios } from "../components/axios/axios";
import { API_URL } from "../constant";
import { User } from "../contexts/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

export const RootScreen = () => {
  const {
    isLoggedIn,
    MoveNav,
    User,
    socket,
    firebaseToken,
    setLoggedIn,
  } = useAuthContext();
  useEffect(() => {
    if (socket?.connected) console.log("connected socket !", socket.id);
    else console.warn("disconnected socket ?", socket?.connected);
  }, [socket]);

  useEffect(() => {
    if (isLoggedIn) {
      //#region 웹소켓
      //내 정보 가져오기
      //#region Open Socket
      if (!!User && !!firebaseToken) {
        console.log('firebaseToken',firebaseToken)
        socket?.emit("appEnter", {
          nickname: User?.nickname,
          token: firebaseToken,
        });
        socket?.on("kicked", (c: { room_id: string; hostname: string }) =>
          Alert.alert(
            c.hostname + "님의 방",
            "(" + c.room_id + "번 방)에서 강퇴당하셨습니다."
          )
        );
      }
      //#endregion 내방목록 가져오기
      // console.log("Login Changed true");
    } else {
      socket?.offAny();
      const a = async () => {
        // let user = await AsyncStorage.getItem("login user");
        let id = await AsyncStorage.getItem("login id");
        let pw = await AsyncStorage.getItem("login pw");
        if (!!id && !!pw) {
          axios
            .post(
              `${API_URL}/v1/accounts/token/`,
              {
                username: id,
                password: pw,
              },
              {
                headers: {
                  accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            )
            .then((d) => {
              if (d.data.access && d.data.refresh) {
                setLoggedIn(d.data.access, d.data.refresh);
              }
            });
        } else {
          AsyncStorage.getItem("login user").then((u) => {
            if (!!u && socket?.connected) {
              let usr: User = JSON.parse(u);
              console.log("logout", User?.nickname);
              socket?.emit("logout", { nickname: User?.nickname });
              AsyncStorage.removeItem("login user");
            }
          });
        }
      };
      a();
    }
  }, [User, firebaseToken]);
  return isLoggedIn ? getNavigationObject(MoveNav) : <LoginNavigation />;
};

const getNavigationObject = (props: MoveNavProps) => {
  if (props.istab === "NoTab") return <NoTabNavigation />;
  return <TabNavigation />;
};
