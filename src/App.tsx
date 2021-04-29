import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
import { RootScreen } from "./screens/RootScreen";
import messaging from "@react-native-firebase/messaging";
import firebase from "firebase";
import { MYfirebase } from "./constant";

const App = () => {
  const { isLoading } = useAuthContext();

  //#region FCM settin
  const [pushToken, setPushToken] = useState<any>();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    console.log("FCM Connected:", authStatus);
  };

  const handlePushToken = useCallback(async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) setPushToken(fcmToken);
    } else {
      const authorizaed = await messaging().requestPermission();
      if (authorizaed) setIsAuthorized(true);
    }
  }, []);

  const saveDeviceToken = useCallback(async () => {
    if (isAuthorized) {
      const currentFcmToken = await firebase.messaging().getToken();
      if (currentFcmToken !== pushToken) {
        return setPushToken(currentFcmToken);
      }
      return messaging().onTokenRefresh((token) => setPushToken(token));
    }
  }, [pushToken, isAuthorized]);

  // #endregion FCM setting

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        SplashScreen.hide();
        handlePushToken();
        saveDeviceToken();
        console.log(pushToken)
      }, 500);
    }
  }, [isLoading]);

  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <RootScreen />
      </NavigationContainer>
    </AuthProvider>
  );
};

const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log(fcmToken);
    console.log("Your Firebase Token is:", fcmToken);
  } else {
    console.log("Failed", "No token received");
  }
};
export default App;
