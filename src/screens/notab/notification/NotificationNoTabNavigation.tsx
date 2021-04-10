import styled from "@emotion/native";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
import { BackIconWhite } from "../../../components/icon/chat/BackIconWhite";
import { useAuthContext } from "../../../contexts/AuthContext";
import { NotificationScreen } from "./NotificationScreen";

export type NotificationNoTabNavigationParamList = {
  NotificationScreen: undefined;
};
const MessageStack = createStackNavigator<NotificationNoTabNavigationParamList>();
export const NotificationNoTabNavigation = (p:any) => {
  console.log("here!");
  const props = useAuthContext().MoveNav;
  return (
    <MessageStack.Navigator
      initialRouteName={props?.screen ? props.screen : "NotificationScreen"}
    >

      <MessageStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          title: "방 정보",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
          },
          headerLeft: () => (
            <BackBtn onPress={() => p.navigation.goBack()}>
              <BackIconWhite />
            </BackBtn>
          ),
        }}
      />
    </MessageStack.Navigator>
  );
};

const BackBtn = styled.TouchableOpacity`
  padding:0 0 0 23px;
`;
