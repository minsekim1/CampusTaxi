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
  Text,
} from "react-native";
import { Input } from "react-native-elements";
import campusStyle from "../../themes/campusStyle";
import crown from "../../image/crown.png";

export default function MychatScreen() {
  return (
    <>
    <Parent/>
      <Text>asd</Text>
    </>
  );
}

class Parent extends Component {
      constructor(props) {
        super(props)
        this.state = {
     currentCity: '',
     flower: 'red'
        }
    }


   updateCurrentCity = (currentCity) => this.setState({ currentCity });

   render() {
     return (
       <>
       <OlderSibling updateCurrentCity={this.updateCurrentCity} />
       <YoungerSibling city={this.state.currentCity} />
       </>
     );
   }
}
class OlderSibling extends Component {
  state = {
    currentCity: city //(that was gathered from a bunch of other steps)
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentCity !== this.state.currentCity) {
      this.props.updateCurrentCity(this.state.currentCity);
    }
  }

  render() {
    return(
    );
  }
}