import React, { Component, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableHighlight,
  Alert,
} from "react-native";
import campusStyle from "../../themes/campusStyle";
import crown from "../../image/crown.png";
import { Text, Button, Paragraph, Dialog, Portal } from "react-native-paper";

// import { firebaseConfig } from "../../constant/firebase";
const firebase = require("firebase");
// try {
//   firebase.initializeApp(firebaseConfig);
// } catch (error) {
//   // console.log(error);
// }

class createTwoButtonAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Initial State",
    };
    // updateState = updateState.bind(this);
  }
  render() {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        { text: "Up", onPress: () => alert(MychatScreen.state.filter) },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
    return;
  }
}

export default function MychatScreen() {
  const filter = useState("asd");
  // const ref = firebase.database().ref("bbs/data");
  // ref.once("value", function (snapshot) {
  //   snapshot.forEach(function (childSnapshot) {
  //     var childKey = childSnapshot.key;
  //     var childData = childSnapshot.val();
  //   });
  //   console.log(snapshot);
  // });

  return (
    <>
      <Button title="2-Button Alert" onPress={createTwoButtonAlert} />
      <Text>asd</Text>
      <Text>asd</Text>
      <Text>asd</Text>
      <Text>asd</Text>
    </>
  );
}

//////////////////////////////////
const data = new Array(24).fill({
  title: "Item",
});
export const ListSimpleUsageShowcase = () => {
  const renderItem = ({ item, index }) => (
    // <ListItem title={`${item.title} ${index + 1}`} />
    <Text>asd</Text>
  );

  return (
    <>
      <Text>asd</Text>
      {/* <List data={data} renderItem={renderItem} /> */}
    </>
  );
};

// Alert.alert(
//   "Alert Title",
//   "My Alert Msg",
//   [
//     { text: "Up", onPress: () => alert(MychatScreen.state.filter) },
//     {
//       text: "Cancel",
//       onPress: () => console.log("Cancel Pressed"),
//       style: "cancel",
//     },
//   ],
//   { cancelable: false }
// );
