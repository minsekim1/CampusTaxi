import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import React from "react";
import { SearchIcon } from "../../../components/icon/chat/SearchIcon";
import { useAuthContext } from "../../../contexts/AuthContext";
import { ChatRoomScreen } from "./ChatRoomScreen";
import { ChatRoomScreenDetails } from "./ChatRoomScreenDetails";

export type MessageNoTabNavigationParamList = {
  ChatRoomScreen: undefined;
  ChatRoomScreenDetails: undefined;
};
const MessageStack = createStackNavigator<MessageNoTabNavigationParamList>();
export const MessageNoTabNavigation = () => {
  const props = useAuthContext().MoveNav.props;
  const { setNavName } = useAuthContext();
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
        options={{ title: '방 정보' }}
      />
    </MessageStack.Navigator>
  );
};
