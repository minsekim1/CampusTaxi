import styled from "@emotion/native";
import {
  Alert,
  BackHandler,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
//import * as RNIap from "react-native-iap";
import React, { Component, useEffect, useState } from "react";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { showToast } from "../../../components/layout/Toast";
import { StackNavigationProp } from "@react-navigation/stack";
import { PremiumStackParamList } from "./PremiumStackNavigation";
import { 
  PurchaseGoogle, 
  getSubscriptions,
  getAvailablePurchases,
  requestSubscription,
} from "./RNIapFunction";

// App Bundle > com.dooboolab.test


const itemSkus = Platform.select({
  ios: ["com.campustaxi.campustaxi", "testinapp"],
  android: ["android.campustaxi.campustaxi", "testinapp"],
});

const itemSubs = Platform.select({
  ios: [
    "com.cooni.point1000",
    "com.cooni.point5000", // dooboolab
  ],
  android: ["android.campustaxi.campustaxi", "regularpayment"],
});

let purchaseUpdateSubscription: any;
let purchaseErrorSubscription: any;


type MessageNavigation = StackNavigationProp<
  PremiumStackParamList,
  "PremiumScreen"
>;
export const PremiumScreen: React.FC = ({}) => {

  useFocusEffect(() => {
    getAvailablePurchases().then((result)=>{console.log(result)});
  });

  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>react-native-iap V3</Text>
      </View>
      <View style={styles.content}>
        <ScrollView style={{ alignSelf: "stretch" }}>
          <View style={{ height: 50 }} />
          {/* <TouchableOpacity
            onPress={()=>console.log(getSubscriptions())}
            activeOpacity={0.5}
            style={styles.btn}
          >
            <Text>현재 구매한 목록 확인</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={()=>{getAvailablePurchases().then((result)=>{console.log(result)})}}
            activeOpacity={0.5}
            style={styles.btn}
          >
            <Text>현재 보유한 목록</Text>
          </TouchableOpacity>

            <View
              style={{
                flexDirection: "column",
              }}
            >
              
              <TouchableOpacity
                onPress={() => requestSubscription("regularpayment")}
                activeOpacity={0.5}
                style={styles.btn}
            >
              <Text>
                구독하기</Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
      </View>
    </View>
  );
};

const PurcahseButton = styled.TouchableOpacity`
  width: 0px;
  height: 0px;
`;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.select({
      ios: 0,
      android: 24,
    }),
    paddingTop: Platform.select({
      ios: 0,
      android: 24,
    }),
    backgroundColor: "white",
  },
  header: {
    flex: 20,
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTxt: {
    fontSize: 26,
    color: "green",
  },
  content: {
    flex: 80,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  btn: {
    height: 48,
    width: 240,
    alignSelf: "center",
    backgroundColor: "#00c40f",
    borderRadius: 0,
    borderWidth: 0,
  },
  txt: {
    fontSize: 16,
    color: "white",
  },
});