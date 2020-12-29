import React, { Component, useState, useEffect } from "react";

import { WebView } from "react-native-webview";
export default function map({ route, navigation }) {
  const { url } = (!!route.params) ? route.params : { url: null };
  return (
    <>
      {
        (!!route.params) ?
          <WebView
            source={{
              uri: url,
            }}
            style={{ marginTop: 20 }}
          />
          : null
      }
    </>
  );
}