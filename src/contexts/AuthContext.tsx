import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { User, UserDummy } from "../components/chat-room/ChatRoomList";
import { API_URL } from "../constant";

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

      // minsekim Code
      axios
        .get<User>(`${API_URL}/accounts/me/`, {
          headers: {
            Authorization: `Bearer ${accessData}`,
            accept: "application/json",
          },
        })
        .then((response) => {
          console.log('response.data',response.data)
          setUser(response.data);
        });
      /////////////////////
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

  const refreshToken = useCallback(() => {
    axios
      .post<{ access: string }>(`${API_URL}/accounts/token/refresh/`, {
        refresh,
      })
      .then((response) => {
        if (response.data.access) {
          setToken(response.data.access);
        }
        setIsLoading(false);
      });
  }, [refresh]);

  useEffect(() => {
    getRefreshToken();
  }, [getRefreshToken]);

  useEffect(() => {
    if (refresh) {
      refreshToken();
    }
  }, [refresh, refreshToken]);

  useEffect(() => {
    if (refresh && token) {
      //test code
      // const interval = setInterval(() => {
      axios
        .post(`${API_URL}/accounts/token/verify/`, { token })
        .then((response) => {
          if (response.data.code) {
            refreshToken();
          }
        });
      // }, 600000);
      // return () => clearInterval(interval);
    }
  }, [token, refresh, refreshToken]);

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
