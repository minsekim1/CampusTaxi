import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import React from "react";
import { CreateScreen } from "./CreateScreen";
import { CreateScreenDetails } from "./CreateScreenDetails";
import { useAuthContext } from "../../../contexts/AuthContext";

export type HomeNoTabNavigationParamList = {
  HomeScreen: undefined;
  CreateScreen: undefined;
  CreateScreenDetails: undefined;
};
const HomeNoTabStack = createStackNavigator<HomeNoTabNavigationParamList>();
export const HomeNoTabNavigation = () => {
  const props = useAuthContext().MoveNav;
  const { setNavName } = useAuthContext();
  return (
    <HomeNoTabStack.Navigator
      initialRouteName={props?.screen ? props.screen : "CreateScreen"}
    >
      <HomeNoTabStack.Screen
        name="CreateScreen"
        component={CreateScreen}
        options={() => ({
          headerTitleAlign: "center",
          title: "지도 선택",
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => setNavName({ istab: "Tab", tab: "HomeTabScreen" })}
              tintColor="black"
              pressColorAndroid="gray"
            />
          ),
        })}
      />
      <HomeNoTabStack.Screen
        name="CreateScreenDetails"
        component={CreateScreenDetails}
        options={() => ({
          headerTitleAlign: "center",
          title: "방만들기",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },
        })}
      />
    </HomeNoTabStack.Navigator>
  );
};
