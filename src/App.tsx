import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
import { RootScreen } from "./screens/RootScreen";
import messaging from "@react-native-firebase/messaging";

const App = () => {
  const { isLoading } = useAuthContext();

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 500);
    }
  }, [isLoading]);

  useEffect(() => { 
    messaging().onMessage(async (remoteMessage) => {
      console.log("Message handled in the foreground!", remoteMessage);
    });

  },[])
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

export default App;
