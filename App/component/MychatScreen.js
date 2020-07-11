import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Button, Card, ListItem, Badge } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { createStackNavigator } from "@react-navigation/stack";
import campusStyle from "../themes/campusStyle";

//firebase
// import firestore from "@react-native-firebase/firestore";

// const testCollection = firestore().collection("bbs").get();
var ItemList = [];

// testCollection
//   .then((doc) => {
//     doc.forEach((data) => {
//       ItemList.push(data.data());
//     });
//   })
//   .catch((error) => {
//     console.log("Error getting document:", error);
//   });

class HomeScreen extends Component {
  list = ItemList;
  render() {
    console.log(ItemList);
    return <></>;
  }
}

const Stack = createStackNavigator();
const MychatScreen: () => React$Node = () => {
  return (
    <Stack.Navigator initialRouteName="내 채팅방 목록">
      <Stack.Screen
        options={navOptions}
        name="내 채팅방 목록"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

const navOptions = {
  headerStyle: {
    backgroundColor: "#0D3664",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerTitleAlign: "center",
};

export default MychatScreen;

// <View style={campusStyle.View.containerWhite}>
//   <FlatList
//     keyExtractor={(item) => item.toString()}
//     data={list}
//     renderItem={({ item }) => (
//       <Card containerStyle={campusStyle.Card.container}>
//         <ListItem
//           leftAvatar={
//             <View
//               style={
//                 (campusStyle.View.circleView, genderColor(item.gender))
//               }
//             >
//               <Text style={campusStyle.Text.middleBold}>
//                 {item.roomNumber}
//               </Text>
//               <Text style={campusStyle.Text.middleBold}>
//                 {item.gender == "all" && "남 여"}
//                 {item.gender == "woman" && "여자"}
//                 {item.gender == "man" && "남자"}
//               </Text>
//             </View>
//           }
//           style={campusStyle.View.container0}
//           title={
//             <View style={campusStyle.View.row}>
//               <View style={{ flex: 6 }}>
//                 <View style={campusStyle.View.row}>
//                   <Image source={require("./crown.png")} />
//                   <Text>{item.leader}</Text>
//                 </View>
//                 <Text>출발지:{item.startPlace}</Text>
//                 <Text>도착지:{item.endPlace}</Text>
//               </View>
//               <View style={{ flex: 1 }}>
//                 {(() => {
//                   if (item.maxMember === item.presentMember.length)
//                     return (
//                       <Text style={campusStyle.Text.red}>
//                         {item.presentMember.length}/{item.maxMember}
//                       </Text>
//                     );
//                   else
//                     return (
//                       <Text>
//                         {item.presentMember.length}/{item.maxMember}
//                       </Text>
//                     );
//                 })()}
//               </View>
//               <View style={{ flex: 2, alignItems: "flex-end" }}>
//                 {/* alignItems: flex-start/center/flex-end */}
//                 <Text style={campusStyle.Text.grayDDark}>
//                   {item.startTime}
//                 </Text>
//                 <Text style={campusStyle.Text.grayDDark}>
//                   {item.status}
//                 </Text>
//                 <Badge
//                   textStyle={campusStyle.Text.smallSize} //margin:5
//                   value={item.messageCount}
//                   status="warning"
//                 />
//               </View>
//             </View>
//           }
//         />
//       </Card>
//     )}
//   />
// </View>
