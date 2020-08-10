//#region imports
import React, { Component } from "react";
//시작 루트 컴포넌트
import { SafeAreaView } from "react-native";
import Navigation from "Navigation";
//최적화 설정
import { enableScreens } from "react-native-screens";
enableScreens();
//UI 설정
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "mobx-react";
//firebase 설정
import { firebaseConfig } from "firebaseConfig";
const firebase = require("firebase");
try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {}
//MobX
import BbsStore from "store/BbsStore";
import UserStore from "store/UserStore";

//#endregion
//#region 경고창 무시: Setting a timer for a long period of time, i.e. multiple minute
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
//#endregion
export default class App extends Component {
  render() {
    return (
      <Provider>
        <PaperProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <Navigation />
            </SafeAreaView>
          </SafeAreaProvider>
        </PaperProvider>
      </Provider>
    );
  }
}

//전역 Store
//import { bbsStore, userStore } from "App";
//<Button onPress={() => userStore.printUserStore()} title="유저 출력"/>
export const bbsStore = new BbsStore();
export const userStore = new UserStore();
