import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
import { RootScreen } from "./screens/RootScreen";
import messaging from "@react-native-firebase/messaging";
import { View, Text, TouchableHighlight } from "react-native";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import styled from "@emotion/native";

const App = () => {
  const { isLoading } = useAuthContext();

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 500);
    }
  }, [isLoading]);

  const [message, setMessage] = useState<FCM_message_props>();
  useEffect(() => {
    //#region FCM
    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      console.log('setBackgroundMessageHandler',remoteMessage)
    })

    messaging().onMessage(async (remoteMessage: any) => {
      console.log("Message handled in the foreground!", remoteMessage);
      // 유저가 로그인 되어 있는지 확인
      let m: FCM_message_props = remoteMessage;
      setMessage(m);
      showMessage({
        message: m.notification.title,
        description: m.notification.body,
      });
    });
    //#endregion FCM
  }, []);
  const FlashStyle = {
    backgroundColor: "white",
    color: "black",
  };
  const FlashTextStyle = {
    color: "black",
  };
  const renderMessage = (r: any) => <MessageText>{r.description}</MessageText>;
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
      <FlashMessage
        position="top"
        floating={true}
        style={FlashStyle}
        titleStyle={FlashTextStyle}
        statusBarHeight={10}
        renderCustomContent={renderMessage}
        onPress={() => {
          console.log("r", message);
        }}
      />
    </AuthProvider>
  );
};

export default App;

const MessageText = styled.Text`
  max-height: 60px;
`;
type FCM_message_props = {
  collapseKey: string; //"com.campustaxi.campustaxi",
  data: any; //{}
  from: string; //"1054249413075"
  messageId: string; //"0:1620109945922475%647781e1647781e1"
  notification: {
    android: {
      clickAction: string; //"FCM_PLUGIN_ACTIVITY"
      smallIcon: string; //"fcm_push_icon"
      sound: "default";
      vibration: true;
    };
    body: string; //메인 메세지 내용
    title: string; //보낸 유저 이름
  };
  sentTime: number; //1620109945911
  ttl: number; //2419200
};