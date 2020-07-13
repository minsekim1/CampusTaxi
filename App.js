import React, { Component } from "react";
import Navigation from "./App/component/Navigation";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { firebaseConfig } from "./App/constant/firebase";
const firebase = require("firebase");

//Redux 설정
import { Provider } from "react-redux";
import Calculator from "./App/redux/src/redux/Calculator";
import { initStore } from "./App/redux/src/redux/redux";
const store = initStore();
try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {}

enableScreens();
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
            {/* <Navigation /> */}
            <Calculator />
          </Provider>
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
}
