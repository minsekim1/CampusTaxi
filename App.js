//#region imports
import React, { Component } from "react";
//시작 루트 컴포넌트
import Navigation from "Navigation";
//최적화 설정
import { enableScreens } from "react-native-screens";
enableScreens();
//UI 설정
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
//Redux 설정
// import reduxExam from "reduxComponent";
import { Provider } from "react-redux";
import { initStore } from "reduxJS";
const store = initStore();
//firebase 설정
import { firebaseConfig } from "firebaseConfig";
const firebase = require("firebase");
try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {}
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
  //props 값들 초기화
  constructor(props) {
    super(props);
  }
  render() {
    //#region ERROR Solution: Setting a timer for a long period of time, i.e. multiple minutes,
    // const _setTimeout = global.setTimeout;
    // const _clearTimeout = global.clearTimeout;
    // const MAX_TIMER_DURATION_MS = 60 * 1000;
    // if (Platform.OS === "android") {
    //   // Work around issue `Setting a timer for long time`
    //   // see: https://github.com/firebase/firebase-js-sdk/issues/97
    //   const timerFix = {};
    //   const runTask = (id, fn, ttl, args) => {
    //     const waitingTime = ttl - Date.now();
    //     if (waitingTime <= 1) {
    //       InteractionManager.runAfterInteractions(() => {
    //         if (!timerFix[id]) {
    //           return;
    //         }
    //         delete timerFix[id];
    //         fn(...args);
    //       });
    //       return;
    //     }

    //     const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    //     timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    //   };

    //   global.setTimeout = (fn, time, ...args) => {
    //     if (MAX_TIMER_DURATION_MS < time) {
    //       const ttl = Date.now() + time;
    //       const id = "_lt_" + Object.keys(timerFix).length;
    //       runTask(id, fn, ttl, args);
    //       return id;
    //     }
    //     return _setTimeout(fn, time, ...args);
    //   };

    //   global.clearTimeout = (id) => {
    //     if (typeof id === "string" && id.startsWith("_lt_")) {
    //       _clearTimeout(timerFix[id]);
    //       delete timerFix[id];
    //       return;
    //     }
    //     _clearTimeout(id);
    //   };
    // }
    //#endregion
    return (
      <PaperProvider>
        <SafeAreaProvider>
          <Provider store={store}>
            <Navigation />
          </Provider>
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
}
