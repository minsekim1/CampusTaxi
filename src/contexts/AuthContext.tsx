import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { API_URL, MYfirebase, socketURL } from "../constant";
import { User } from "./User";

import messaging from "@react-native-firebase/messaging";
import firebase from "firebase";
import { CustomAxios } from "../components/axios/axios";
import { io, Socket } from "socket.io-client";
import RNRestart from "react-native-restart";
import {
  getAvailablePurchases,
  itemSubs,
} from "../screens/tab/premiumTab/RNIapFunction";
import { getSubscriptions } from "react-native-iap";

export type AuthState = {
  getPremium: () => Promise<any>;
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
  setUser: any;
};

const AuthContext = React.createContext<AuthState>({
  getPremium: ()=>{return new Promise((resolve)=>resolve(false))},
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
  setUser: () => {},
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
  const [isPremium, setIsPremium] = useState<number>();
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

  // ispremium set & get
  const getPremium = useCallback(async () => {
    return new Promise(async(resolve) => {
      const receipts:Array<any> = await getAvailablePurchases();
      if (receipts !== null || receipts !== undefined) {
        if (receipts[receipts.length - 1].autoRenewingAndroid === true) {
          console.log("getPremium true");
          resolve(true);
          return;
        }
      }
      console.log("getPremium false");
      resolve(false);
      return;
    });

    // 구매 안함
    // {"developerPayloadAndroid": "", "isAcknowledgedAndroid": true, "obfuscatedAccountIdAndroid": "", "obfuscatedProfileIdAndroid": "", "orderId": "GPA.3311-4807-0804-93496", "packageNameAndroid": "com.campustaxi.campustaxi", "productId": "testinapp", "purchaseStateAndroid": 1, "purchaseToken": "pjhfkjpiglhfimdalmlbmacj.AO-J1OwcQDXR5dx0z7EeNtRvJPid4e1zd0_ZBzBQ5-rnRIlG29kDAV5NpcHwhJsIGgCEgcFfsLap1U-qzcDCx_3JIiksqFUgJ4A23S_dj7skQ0nh00d70dM", "signatureAndroid": "jXklnbgyBEDH3UG5xJrhrSoRMLVr3F7i06skpc0h1H5Z2gfaiM70AJWo/S0S7pAcdAv7z4Q0ET3RlLOLWv3YVJ5vwUDP7vuXS8GMDetUAZuYyljMpvAl786GSE6+8C2loQHJB0Aaujj8IUYSDS9sIeNv+H4GOPhjGTZLOmioQKQrDlNNoc8irmeDJaNkwj150kK+pPEk1GKMPc3QVjCOHDmZDu44RKCxDum4DWNCIQDWEA820Kj+p5eEATBNM86+pJFvqHPKlOsHuvAbLLvgN2PN2fk+ZPs4i3kDyvyzU5Pbfu11z+XteSZ6B6Ihqm1Cyegnp7Zuc8DXAIyOoUdWqg==", "transactionDate": 1616486006928, "transactionId": "GPA.3311-4807-0804-93496", "transactionReceipt": "{\"orderId\":\"GPA.3311-4807-0804-93496\",\"packageName\":\"com.campustaxi.campustaxi\",\"productId\":\"testinapp\",\"purchaseTime\":1616486006928,\"purchaseState\":0,\"purchaseToken\":\"pjhfkjpiglhfimdalmlbmacj.AO-J1OwcQDXR5dx0z7EeNtRvJPid4e1zd0_ZBzBQ5-rnRIlG29kDAV5NpcHwhJsIGgCEgcFfsLap1U-qzcDCx_3JIiksqFUgJ4A23S_dj7skQ0nh00d70dM\",\"acknowledged\":true}"}
    // 구매함
    // {"developerPayloadAndroid": "", "isAcknowledgedAndroid": true, "obfuscatedAccountIdAndroid": "", "obfuscatedProfileIdAndroid": "", "orderId": "GPA.3311-4807-0804-93496", "packageNameAndroid": "com.campustaxi.campustaxi", "productId": "testinapp", "purchaseStateAndroid": 1, "purchaseToken": "pjhfkjpiglhfimdalmlbmacj.AO-J1OwcQDXR5dx0z7EeNtRvJPid4e1zd0_ZBzBQ5-rnRIlG29kDAV5NpcHwhJsIGgCEgcFfsLap1U-qzcDCx_3JIiksqFUgJ4A23S_dj7skQ0nh00d70dM", "signatureAndroid": "jXklnbgyBEDH3UG5xJrhrSoRMLVr3F7i06skpc0h1H5Z2gfaiM70AJWo/S0S7pAcdAv7z4Q0ET3RlLOLWv3YVJ5vwUDP7vuXS8GMDetUAZuYyljMpvAl786GSE6+8C2loQHJB0Aaujj8IUYSDS9sIeNv+H4GOPhjGTZLOmioQKQrDlNNoc8irmeDJaNkwj150kK+pPEk1GKMPc3QVjCOHDmZDu44RKCxDum4DWNCIQDWEA820Kj+p5eEATBNM86+pJFvqHPKlOsHuvAbLLvgN2PN2fk+ZPs4i3kDyvyzU5Pbfu11z+XteSZ6B6Ihqm1Cyegnp7Zuc8DXAIyOoUdWqg==", "transactionDate": 1616486006928, "transactionId": "GPA.3311-4807-0804-93496", "transactionReceipt": "{\"orderId\":\"GPA.3311-4807-0804-93496\",\"packageName\":\"com.campustaxi.campustaxi\",\"productId\":\"testinapp\",\"purchaseTime\":1616486006928,\"purchaseState\":0,\"purchaseToken\":\"pjhfkjpiglhfimdalmlbmacj.AO-J1OwcQDXR5dx0z7EeNtRvJPid4e1zd0_ZBzBQ5-rnRIlG29kDAV5NpcHwhJsIGgCEgcFfsLap1U-qzcDCx_3JIiksqFUgJ4A23S_dj7skQ0nh00d70dM\",\"acknowledged\":true}"}
    // {"autoRenewingAndroid": true, "developerPayloadAndroid": "", "isAcknowledgedAndroid": false, "obfuscatedAccountIdAndroid": "", "obfuscatedProfileIdAndroid": "", "orderId": "GPA.3327-6090-5979-20169", "packageNameAndroid": "com.campustaxi.campustaxi", "productId": "regularpayment", "purchaseStateAndroid": 1, "purchaseToken": "fcdcfiajkcmalmljgecjcjbf.AO-J1Oza47Q16pawaMf2gY8jMTvKjfGRW7Frv4qNhnyubrS8PdmFgoLdToUv-iIZUu4qIGBz0HjITCXKfKnHhTISyppUg7F3zrJHvvyDbB4owKxLcPpePyw", "signatureAndroid": "FwjAc8w8CGAp+mZwarj/NCpaogMk5cQ0jJXPXz1juPIQrv6AV9FzqyFbngJojbNqvoNgHX/8FK1Bav3k/DNs2VA4uH4wJtV+2/fsoGMvdaUGyJd/kxMKJXYLUkZUnWULI1TGS0XnZ7YoyzdrWz7uzthZSM4YFyXmJZqTwKOlaxqxumtU0nDhQG34y3C9ejMR6jeefadFiRpEBqWQOqU5q00fJQ94I9lPj1qFEjoDV7vWr5XAYRmw+o8g4FC8X9lYCNjfpczdDRJ/ctWJMvqnpSqvG9AgkpauFFQW5qpDd04Sw3yD0qc4Ru1nRg2juM2pnyISLZoTmYfZJJBPVZeDyw==", "transactionDate": 1625480809640, "transactionId": "GPA.3327-6090-5979-20169", "transactionReceipt": "{\"orderId\":\"GPA.3327-6090-5979-20169\",\"packageName\":\"com.campustaxi.campustaxi\",\"productId\":\"regularpayment\",\"purchaseTime\":1625480809640,\"purchaseState\":0,\"purchaseToken\":\"fcdcfiajkcmalmljgecjcjbf.AO-J1Oza47Q16pawaMf2gY8jMTvKjfGRW7Frv4qNhnyubrS8PdmFgoLdToUv-iIZUu4qIGBz0HjITCXKfKnHhTISyppUg7F3zrJHvvyDbB4owKxLcPpePyw\",\"autoRenewing\":true,\"acknowledged\":false}"}
    // 구매 취소함
    //   i: 0 r: {"developerPayloadAndroid": "", "isAcknowledgedAndroid": true, "obfuscatedAccountIdAndroid": "", "obfuscatedProfileIdAndroid": "", "orderId": "GPA.3311-4807-0804-93496", "packageNameAndroid": "com.campustaxi.campustaxi", "productId": "testinapp", "purchaseStateAndroid": 1, "purchaseToken": "pjhfkjpiglhfimdalmlbmacj.AO-J1OwcQDXR5dx0z7EeNtRvJPid4e1zd0_ZBzBQ5-rnRIlG29kDAV5NpcHwhJsIGgCEgcFfsLap1U-qzcDCx_3JIiksqFUgJ4A23S_dj7skQ0nh00d70dM", "signatureAndroid": "jXklnbgyBEDH3UG5xJrhrSoRMLVr3F7i06skpc0h1H5Z2gfaiM70AJWo/S0S7pAcdAv7z4Q0ET3RlLOLWv3YVJ5vwUDP7vuXS8GMDetUAZuYyljMpvAl786GSE6+8C2loQHJB0Aaujj8IUYSDS9sIeNv+H4GOPhjGTZLOmioQKQrDlNNoc8irmeDJaNkwj150kK+pPEk1GKMPc3QVjCOHDmZDu44RKCxDum4DWNCIQDWEA820Kj+p5eEATBNM86+pJFvqHPKlOsHuvAbLLvgN2PN2fk+ZPs4i3kDyvyzU5Pbfu11z+XteSZ6B6Ihqm1Cyegnp7Zuc8DXAIyOoUdWqg==", "transactionDate": 1616486006928, "transactionId": "GPA.3311-4807-0804-93496", "transactionReceipt": "{\"orderId\":\"GPA.3311-4807-0804-93496\",\"packageName\":\"com.campustaxi.campustaxi\",\"productId\":\"testinapp\",\"purchaseTime\":1616486006928,\"purchaseState\":0,\"purchaseToken\":\"pjhfkjpiglhfimdalmlbmacj.AO-J1OwcQDXR5dx0z7EeNtRvJPid4e1zd0_ZBzBQ5-rnRIlG29kDAV5NpcHwhJsIGgCEgcFfsLap1U-qzcDCx_3JIiksqFUgJ4A23S_dj7skQ0nh00d70dM\",\"acknowledged\":true}"}
    // [Mon Jul 05 2021 19:30:00.868]  LOG      i: 1 r: {"autoRenewingAndroid": false, "developerPayloadAndroid": "", "isAcknowledgedAndroid": false, "obfuscatedAccountIdAndroid": "", "obfuscatedProfileIdAndroid": "", "orderId": "GPA.3327-6090-5979-20169", "packageNameAndroid": "com.campustaxi.campustaxi", "productId": "regularpayment", "purchaseStateAndroid": 1, "purchaseToken": "fcdcfiajkcmalmljgecjcjbf.AO-J1Oza47Q16pawaMf2gY8jMTvKjfGRW7Frv4qNhnyubrS8PdmFgoLdToUv-iIZUu4qIGBz0HjITCXKfKnHhTISyppUg7F3zrJHvvyDbB4owKxLcPpePyw", "signatureAndroid": "aXEPSQ3Uto3uGl81h62aRN4m6vuNgSm+opJaC+aTAKkFzfALtbEkonTtPFs/6H4PYQ/yNp2T7aHtwXsydFEz5JQvb5ypXkM798mwDsg1IR+vB4GgqWNErVZcyf1w6xUr43mU4S50CHgQYLcy+SDy7UOEJSZdf+0IYdmmxXoLZK0rh80kWT6VdMeTfZRzBL2NYoQMP88Xhy57A1TnENJn6CTv7KlCzmIEBW75QhNshPkxgBih7hS8NM2RciEJ2c2xNoyFATVY7+Lb4pLZRMla0rUI6Qf8ZwyqT8FgkFHbc2ZppKLZgoU497W17gN1aQZgUL357J+OHVJulQtQk2kb9g==", "transactionDate": 1625480809640, "transactionId": "GPA.3327-6090-5979-20169", "transactionReceipt": "{\"orderId\":\"GPA.3327-6090-5979-20169\",\"packageName\":\"com.campustaxi.campustaxi\",\"productId\":\"regularpayment\",\"purchaseTime\":1625480809640,\"purchaseState\":0,\"purchaseToken\":\"fcdcfiajkcmalmljgecjcjbf.AO-J1Oza47Q16pawaMf2gY8jMTvKjfGRW7Frv4qNhnyubrS8PdmFgoLdToUv-iIZUu4qIGBz0HjITCXKfKnHhTISyppUg7F3zrJHvvyDbB4owKxLcPpePyw\",\"autoRenewing\":false,\"acknowledged\":false}"}
  }, []);

  //

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

  const setPremium = useCallback(
  (props: number) => {
    setIsPremium(props);
  },
  [setIsPremium]
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
      if (!socket || socket.disconnected) setSocket(io(socketURL));
    },
    [setRefresh, setToken]
  );

  const setLoggedOut = useCallback(async () => {
    AsyncStorage.setItem("@campus_taxi_auth", "");
    AsyncStorage.removeItem("@login");
    AsyncStorage.removeItem("login id");
    AsyncStorage.removeItem("login pw");
    setTimeout(() => {
      setRefresh(undefined);
      setToken(undefined);
      setUser(undefined);
    }, 100);
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
        setPremium,
        setUser,
        socket,
        User,
        firebaseToken,
        getPremium,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
