import React, { Component, useState, useEffect } from "react";
import { BackHandler,ToastAndroid,
  Platform,
  AlertIOS, } from "react-native";
import { WebView } from "react-native-webview";
export default function map({ route, navigation }) {
  //#region  뒤로가기 버튼 제어 & 더블클릭시 앱 종료
  let currentCount = 0;
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton)
      //console.log("focus MainScreen");
    });
    navigation.addListener('blur', () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
      //console.log("blur MainScreen");
    })
  }, []);
  const handleBackButton = () => {
    if (currentCount < 1) {
      currentCount += 1;
      if (Platform.OS === 'android') {
      ToastAndroid.show('뒤로 가기를 한번 더 누르면 앱이 종료됩니다.\n로그아웃은 설정->로그아웃으로 가주세요.', ToastAndroid.SHORT)
    } else {
      AlertIOS.alert('뒤로 가기를 한번 더 누르면 앱이 종료됩니다.\n로그아웃은 설정->로그아웃으로 가주세요.');
    }
    } else {
      BackHandler.exitApp();
    }
    setTimeout(() => {
      currentCount = 0;
    }, 2000);
    return true;
  }
  ////#endregion
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