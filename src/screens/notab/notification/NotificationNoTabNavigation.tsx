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
  const props = useAuthContext().MoveNav;
  const { setNavName } = useAuthContext();
  
    //#region 뒤로가기 제어
  const LeftBtnOnPress = () =>
    setNavName({ istab: "Tab", tab: "HomeTabScreen" });
  //#endregion

  return (
    <MessageStack.Navigator
      initialRouteName={props?.screen ? props.screen : "NotificationScreen"}
    >
      <MessageStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          title: "알림",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: "black",
          },
          headerLeft: () => (
            <BackBtn onPress={LeftBtnOnPress}>
              <BackIconWhite color="black"/>
            </BackBtn>
          ),
        }}
      />
    </MessageStack.Navigator>
  );
};

const BackBtn = styled.TouchableOpacity`
  padding:5px 5px 5px 23px;
`;
