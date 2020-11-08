//#region imports
import React, { Component } from "react";
//시작 루트 컴포넌트
import LoginNav from "./App/component/Login/LoginNav";
import Navigation from "./App/component/Navigation";
//최적화 설정
import { enableScreens } from "react-native-screens";
enableScreens();
//UI 설정
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "mobx-react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
//firebase 설정
import { firebaseConfig } from "firebaseConfig";
const firebase = require("firebase");
try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {}
//{userStore.develop == true ? "설정" : "홈"}
//#endregion
import * as Location from "expo-location";
//#region 경고창 무시: Setting a timer for a long period of time, i.e. multiple minute
import { YellowBox } from "react-native";
import _ from "lodash";
YellowBox.ignoreWarnings([
  "Setting a timer",
  "expo-google-sign-in is not supported",
  "Cancelled by user",
  "@firebase/database:", //파이어베이스 null 등 모든 경고 닫음
]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
import { bbsStore, userStore } from "store";
import { Observer } from "mobx-react";
// <Navigation />
//에러제어
//#endregion
export default class App extends Component {
  render() {
    Location.requestPermissionsAsync();
    return (
      <Provider>
        <PaperProvider>
              <Observer>
                {() => (!userStore.isKey() ? <LoginNav /> : <Navigation />)}
              </Observer>
        </PaperProvider>
      </Provider>
    );
  }
}
