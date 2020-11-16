import React from 'react';
import { Text, View, Button } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { userStore } from '../store/store';
function p1({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text><Button
        title="Go to Screen0"
        onPress={() => userStore.user = "asd"}
      /><Button
        title="Go to Screen1"
        onPress={() => navigation.navigate('p2')}
      /><Button
        title="Go to Screen2"
        onPress={() => navigation.navigate('p3')}
      />
    </View>
  );
}

function p2({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen1</Text><Button
        title="Go to Screen0"
        onPress={() => navigation.navigate('p1')}
      /><Button
        title="Go to Screen1"
        onPress={() => navigation.navigate('p2')}
      /><Button
        title="Go to Screen2"
        onPress={() => navigation.navigate('p3')}
      />
    </View>
  );
}
function p3({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen2</Text><Button
        title="Go to Screen0"
        onPress={() => navigation.navigate('p1')}
      /><Button
        title="Go to Screen1"
        onPress={() => navigation.navigate('p2')}
      /><Button
        title="Go to Screen2"
        onPress={() => navigation.navigate('p3')}
      />
    </View>
  );
}
const Stack = createStackNavigator();

export default function loginNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="p1" component={p1} />
      <Stack.Screen name="p2" component={p2} />
      <Stack.Screen name="p3" component={p3} />
    </Stack.Navigator>
  );
}
