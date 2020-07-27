import React, { Component, useState, useEffect } from "react";
import campusStyle from "style";
import crown from "image/crown.png";

import { StyleSheet, Text, View, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://m.map.naver.com/",
    };
  }

  componentDidUpdate() {
    alert(JSON.stringify(this.props.route.params));
    try {
      this.props.route.params.url != null
        ? this.setState({ url: this.props.route.params.url })
        : null;
    } catch (error) {}
  }
  render() {
    return (
      <WebView source={{ uri: this.state.url }} style={{ marginTop: 20 }} />
    );
  }
}
