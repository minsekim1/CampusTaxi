import React from "react";
import {
  StyleSheet,
  View,
  Button,
  Alert,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import Svg, {
  G,
  Ellipse,
  Path,
  TSpan,
  LinearGradient,
  Stop,
} from "react-native-svg";
export default class LoadingScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
}
