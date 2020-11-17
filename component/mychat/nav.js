import React from 'react';
import { Text, View, Button } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
const Parse = require('parse/react-native.js');
const AsyncStorage = require('react-native').AsyncStorage;
Parse.setAsyncStorage(AsyncStorage);

function p1({ navigation }) {
  //   function restapi1() {
  //     import requests

  // headers = {
  //       'X-Parse-Application-Id': 'QIxx0z05s7WTf8IDw3vejf6IBS2Zi6n29e8UOUtE',
  //         'X-Parse-REST-API-Key': 'x9B5zmNSw9n3rBlODMptjBK7sZ4Jna9VL9x9wIqv',
  //           'Content-Type': 'application/json',
  // }

  //     data = '{ "loginid":"slsl7862","loginpassword":"tkarnr","gender":1,"email":"tkarnrwl78627862@gmail.com","nickname":"minsekim","phone":"01000000000","userStatus":1,"safePhone":"01000000000","userPoint":0,"name":"\uAE40\uBBFC\uBBFC","address":"\uC11C\uC6B8","studentCard":{ "__type": "File", "name": "resume.txt" },"univ":"\uC0BC\uC721\uB300\uD559\uAD50","policy":[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ] }'

  //     response = requests.post('https://parseapi.back4app.com/classes/user', headers = headers, data = data)

  //   }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text><Button
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

export default function mychatNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="p1" component={p1} />
      <Stack.Screen name="p2" component={p2} />
      <Stack.Screen name="p3" component={p3} />
    </Stack.Navigator>
  );
}
