import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { API_URL, MYfirebase, socketURL } from "../constant";
import { User } from "./User";

import messaging from "@react-native-firebase/messaging";
import firebase from "firebase";
import { CustomAxios } from "../components/axios/axios";
import { io, Socket } from "socket.io-client";
import RNRestart from "react-native-restart";

export type AuthState = {
  token: string | undefined;
  refresh: string | undefined;
  isLoading: boolean;
  isLoggedIn: boolean;
  setLoggedIn: (token: string, refresh: string) => void;
  setLoggedOut: () => void;
  MoveNav: MoveNavProps;
  setNavName: (props: MoveNavProps) => void;
  User: User | undefined;
  socket: Socket | undefined;
  resetToken: (token: string) => void;
  firebaseToken: any;
};

const AuthContext = React.createContext<AuthState>({
  token: undefined,
  refresh: undefined,
  isLoading: true,
  isLoggedIn: false,
  MoveNav: { istab: "Tab", tab: "HomeTabScreen", props: undefined },
  setLoggedIn: () => {},
  setLoggedOut: () => {},
  setNavName: (props: MoveNavProps) => {},
  resetToken: () => {},
  User: undefined,
  socket: undefined,
  firebaseToken: undefined,
});

export type MoveNavProps = {
  istab: "Tab" | "NoTab";
  tab:
    | "HomeNoTabNavigation"
    | "MessageNoTabNavigation"
    | "SettingNoTabNavigation"
    | "NotificationNoTabNavigation"
    | "HomeTabScreen"
    | "MessageTabScreen"
    | "PremiumTabScreen"
    | "SettingTabScreen";
  screen?: string;
  props?: any;
};

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | undefined>();
  const [refresh, setRefresh] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [User, setUser] = useState<User | undefined>();
  const [socket, setSocket] = useState<Socket | undefined>();
  const [firebaseToken, setFirebaseToken] = useState<any>();
  const [MoveNav, setMoveNav] = useState<MoveNavProps>({
    istab: "Tab",
    tab: "HomeTabScreen",
  });

  //#region FCM setting
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  // Foreground

  const handlePushToken = useCallback(async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        setFBToken(fcmToken);
      }
    } else {
      const authorizaed = await messaging().requestPermission();
      if (authorizaed) setIsAuthorized(true);
    }
  }, []);

  const saveDeviceToken = useCallback(async () => {
    if (isAuthorized) {
      const currentFcmToken = await firebase.messaging().getToken();
      if (currentFcmToken !== firebaseToken) {
        return setFBToken(currentFcmToken);
      }
      return messaging().onTokenRefresh((token) => setFBToken(token));
    }
  }, [firebaseToken, isAuthorized]);

  const setFBToken = useCallback(
    (firebaseToken: string) => {
      setFirebaseToken(firebaseToken);
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log("Message handled in the background!", remoteMessage);
      });
    },
    [setFirebaseToken]
  );
  // #endregion FCM setting

  const setNavName = useCallback(
    (props: MoveNavProps) => {
      setMoveNav(props);
    },
    [setMoveNav]
  );

  const setLoggedIn = useCallback(
    (accessData: string, refreshData: string) => {
      AsyncStorage.setItem("@campus_taxi_auth", refreshData);
      setRefresh(refreshData);
      setToken(accessData);
      handlePushToken(); //OpenToken도 여기서 진행
      saveDeviceToken();
      CustomAxios(
        "GET",
        `${API_URL}/v1/accounts/me/`,
        resetToken,
        refreshData,
        accessData,
        undefined, //"User API",
        undefined,
        (d: User) => {
          setUser(d);
          let data = JSON.stringify(d);
          AsyncStorage.setItem("login user", data);
        }
      );
      setSocket(io(socketURL));
    },
    [setRefresh, setToken]
  );

  const setLoggedOut = useCallback(() => {
    socket?.emit("logout");
    AsyncStorage.setItem("@campus_taxi_auth", "");
    AsyncStorage.removeItem("@login");
    setRefresh(undefined);
    setToken(undefined);
    setUser(undefined);
    AsyncStorage.removeItem("login id");
    AsyncStorage.removeItem("login pw");
    AsyncStorage.removeItem("login user")
      RNRestart.Restart();
  }, [setRefresh, setToken]);

  const getRefreshToken = useCallback(async () => {
    const data = await AsyncStorage.getItem("@campus_taxi_auth");
    if (data) {
      setRefresh(data);
    }
  }, [setRefresh]);

  // TEST CODE 왜 있는 걸까...?
  // const refreshToken = useCallback(() => {
  //   axios
  //     .post<{ access: string }>(`${API_URL}/accounts/token/refresh/`, {
  //       refresh,
  //     })
  //     .then((response) => {
  //       if (response.data.access) {
  //         setToken(response.data.access);
  //       }
  //       setIsLoading(false);
  //     });
  // }, [refresh]);

  const resetToken = useCallback((token: string) => {
    setToken(token);
  }, []);

  useEffect(() => {
    getRefreshToken();
  }, [getRefreshToken]);

  return (
    <AuthContext.Provider
      value={{
        token,
        refresh,
        resetToken,
        isLoading,
        isLoggedIn: Boolean(token),
        MoveNav,
        setLoggedOut,
        setLoggedIn,
        setNavName,
        socket,
        User,
        firebaseToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
