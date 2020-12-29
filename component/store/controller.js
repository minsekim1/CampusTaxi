import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomContext } from "./context";
const Controller = () => {
  const { number, setNumber, user, setIsLogin, setUser, setId, setPw, bbs, setBbs } = React.useContext(CustomContext);
  return (
    <SafeAreaView>
      <View>
        <Text>{number}</Text>
        <Text>{user.id}</Text>
        <Button onPress={() => setId("asds")}>userSEt</Button>
        <Button onPress={() => setNumber(number + 1)}>increase</Button>
        <Button onPress={() => setNumber(number - 1)}>decrease</Button>
      </View>
    </SafeAreaView>
  )
};

export default Controller;