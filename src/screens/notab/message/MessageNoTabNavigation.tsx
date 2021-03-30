import styled from "@emotion/native";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
import { BackIconWhite } from "../../../components/icon/chat/BackIconWhite";
import { useAuthContext } from "../../../contexts/AuthContext";
import { ChatRoomScreen } from "./ChatRoomScreen";
import { ChatRoomScreenDetails } from "./ChatRoomScreenDetails";

export type MessageNoTabNavigationParamList = {
  ChatRoomScreen: undefined;
  ChatRoomScreenDetails: undefined;
};
const MessageStack = createStackNavigator<MessageNoTabNavigationParamList>();
export const MessageNoTabNavigation = (p:any) => {
  const props = useAuthContext().MoveNav.props;
  return (
    <MessageStack.Navigator
      initialRouteName={props?.screen ? props.screen : "ChatRoomScreen"}
    >
      <MessageStack.Screen
        name="ChatRoomScreen"
        component={ChatRoomScreen}
        options={{ headerShown: false }}
      />
      <MessageStack.Screen
        name="ChatRoomScreenDetails"
        component={ChatRoomScreenDetails}
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
