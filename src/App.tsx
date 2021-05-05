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

  useEffect(() => {
    messaging().onMessage(async (remoteMessage: any) => {
      let m: FCM_message_props = remoteMessage;
      showMessage({
        message: m.notification.title,
        description: m.notification.body,
      });
      // console.log("Message handled in the foreground!", remoteMessage);
      // Message handled in the foreground! {"collapseKey": "com.campustaxi.campustaxi", "data": {}, "from": "1054249413075", "messageId": "0:1620109945922475%647781e1647781e1", "notification": {"android": {"clickAction": "FCM_PLUGIN_ACTIVITY", "smallIcon": "fcm_push_icon", "sound": "default"}, "body": "ㅛ", "title": "campustaxiadmin"}, "sentTime": 1620109945911, "ttl": 2419200}
    });
  }, []);
  const FlashStyle = {
    backgroundColor: "white",
    color: "black",
  };
  const FlashTextStyle = {
    color: "black",
  };
  const renderMessage = (r: any) => (
      <MessageText>
        {r.description}
      </MessageText>
  );
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
    };
    body: string; //메인 메세지 내용
    title: string; //보낸 유저 이름
  };
  sentTime: number; //1620109945911
  ttl: number; //2419200
};
