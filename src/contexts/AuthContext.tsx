import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { API_URL } from "../constant";
import { User, UserDummy } from "./User";

export type AuthState = {
  token: string | undefined;
  isLoading: boolean;
  isLoggedIn: boolean;
  setLoggedIn: (token: string, refresh: string) => void;
  setLoggedOut: () => void;
  MoveNav: MoveNavProps;
  setNavName: (arg0: MoveNavProps) => void;
  User: User;
};

const AuthContext = React.createContext<AuthState>({
  token: undefined,
  isLoading: true,
  isLoggedIn: false,
  MoveNav: { istab: "Tab", tab: "HomeTabScreen", props: undefined },
  setLoggedIn: () => {},
  setLoggedOut: () => {},
  setNavName: (MoveNavProps) => {},
  User: UserDummy,
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
  const [User, setUser] = useState<User>(UserDummy);
  const [MoveNav, setMoveNav] = useState<MoveNavProps>({
    istab: "Tab",
    tab: "HomeTabScreen",
  });

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
    },
    [setRefresh, setToken]
  );

  const setLoggedOut = useCallback(() => {
    AsyncStorage.setItem("@campus_taxi_auth", "");
    setRefresh(undefined);
    setToken(undefined);
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
  // }, [refresh]);ㅉ

  useEffect(() => {
    getRefreshToken();
  }, [getRefreshToken]);

  // useEffect(() => {
  //   if (refresh) {
  //     refreshToken();
  //   }
  // }, [refresh, refreshToken]);

  // useEffect(() => {
  //   if (refresh && token) {
  //     //test code
  //     // const interval = setInterval(() => {
  //     axios
  //       .post(`${API_URL}/accounts/token/verify/`, { token })
  //       .then((response) => {
  //         if (response.data.code) {
  //           refreshToken();
  //         }
  //       });
  //     // }, 600000);
  //     // return () => clearInterval(interval);
  //   }
  // }, [token, refresh, refreshToken]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoading,
        isLoggedIn: Boolean(token),
        MoveNav,
        setLoggedOut,
        setLoggedIn,
        setNavName,
        User,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
