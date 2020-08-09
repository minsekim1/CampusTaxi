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
//Redux 설정
// import reduxExam from "reduxComponent";
//firebase 설정
import { firebaseConfig } from "firebaseConfig";
const firebase = require("firebase");
try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {}
//MobX
import BbsStore from "store/bbsStore";
import UserStore from "store/userStore";
import { View, Text, Image, TouchableHighlight, Button } from "react-native";
const bbsStore = new BbsStore();
const userStore = new UserStore();
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
    this.state = { bba: 1 };
  }

  addBba = () => {
    this.setState({
      bba: this.state.bba + 1,
    });
  };

  render() {
    return (
      <Provider bbs={bbsStore} user={userStore}>
        <PaperProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <Button onPress={() => alert(this.state.bba)} title="bba" />
              <Navigation addBba={this.addBba} />
            </SafeAreaView>
          </SafeAreaProvider>
        </PaperProvider>
      </Provider>
    );
  }
}
