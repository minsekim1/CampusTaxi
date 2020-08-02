import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import CounterContainer from "./store/CounterContainer";
export default function TempScreen() {
  const [number, setNum] = useState(0);

  const increase = () => {
    setNum(number + 1);
  };
  const decrease = () => {
    setNum(number - 1);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>TempScreen!</Text>
      <Text>{number}</Text>
      <Button onPress={increase}>+1</Button>
      <Button onPress={decrease}>-1</Button>
      <CounterContainer />
    </View>
  );
}
