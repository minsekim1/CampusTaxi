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
import { List, ListItem } from "@ui-kitten/components";
import campusStyle from "../../themes/campusStyle";
import crown from "../../image/crown.png";
import * from "../constant/firebase";
const data = new Array(24).fill({
  title: "Item",
});
export const ListSimpleUsageShowcase = () => {
  const renderItem = ({ item, index }) => (
    <ListItem title={`${item.title} ${index + 1}`} />
  );

  return (
    <>
      <List data={data} renderItem={renderItem} />
    </>
  );
};

export default class MychatScreen extends Component {
  render() {
    let defaultDatabase = firebase.database();
    return (
      <>
        <ListSimpleUsageShowcase />
      </>
    );
  }
}
