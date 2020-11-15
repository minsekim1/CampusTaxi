import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from "./MainScreen"
import chatScreen from "./chatScreen"
import chatroomScreen from "./chatroomScreen"

// function p1({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text><Button
//         title="Go to Screen0"
//         onPress={() => navigation.navigate('p1')}
//       /><Button
//         title="Go to Screen1"
//         onPress={() => navigation.navigate('p2')}
//       /><Button
//         title="Go to Screen2"
//         onPress={() => navigation.navigate('p3')}
//       />
//     </View>
//   );
// }
const s = createStackNavigator();
const headerDisable = { headerShown: false };

export default function mainNav() {
  return (
    <s.Navigator screenOptions={headerDisable}>
      <s.Screen name="MainScreen" component={MainScreen} />
      <s.Screen
        name="모든 채팅방 목록"
        component={chatScreen}
      />
      <s.Screen
        name="채팅방"
        component={chatroomScreen}
      />
    </s.Navigator>
  );
}
