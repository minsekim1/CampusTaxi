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
import { useAuthContext } from "../../../contexts/AuthContext";

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

const BenefitItemComponent: React.FC<{
  title?: string;
  subtitle: string;
  subtitle2?: string;
}> = ({ title, subtitle, subtitle2 }) => {
  return (
    <BenefitItemContainer>
      <BenefitItemIcon />
      <BenefitInfo>
        <BenefitInfoTitleText>{title}</BenefitInfoTitleText>
        <BenefitInfoSubText>
          {subtitle}
          {"\n"}
          {subtitle2}
        </BenefitInfoSubText>
      </BenefitInfo>
    </BenefitItemContainer>
  );
};

export const PremiumScreen: React.FC = ({}) => {
  const { socket } = useAuthContext();
  useFocusEffect(() => {
    getAvailablePurchases();
  });
  return (
    <Container>
      <UpperView>
        <TitleText>프리미엄 멤버십</TitleText>
        <TitleSubText>캠퍼스택시가 준비한 프리미엄 멤버십</TitleSubText>
      </UpperView>

      <MiddleView>
        <MiddleTitleText>
          일반 회원에선 없었던 프리미엄만의 기능!{"\n"}월 5000월으로 더욱 편한
          서비스를 이용하세요.
        </MiddleTitleText>

        <BenefitListContainer>
          <BenefitItemComponent
            title="이동하는 경로를 예측!"
            subtitle="예상경로/예상금액/예상시간 전부 예측 가능"
            subtitle2="분할결제"
          />
          <GrayLine />
          <BenefitItemComponent
            title="빠른 이동을 위한 채팅목록 우선!"
            subtitle="채팅 목록 최상단"
          />
          <GrayLine />
          <BenefitItemComponent
            title="광고없는 이용"
            subtitle="팝업 광고 없음"
            subtitle2="앱 최하단 배너광고 없음"
          />
          <GrayLine />
          <BenefitItemComponent
            title="캠퍼스택시 이모티콘 사용 FREE!"
            subtitle="캠퍼스택시 캐릭터 이모티콘 및"
            subtitle2="캐릭터로 프로필 설정 가능"
          />
          <GrayLine />
        </BenefitListContainer>

        <MiddleSubText>
          정액제는 구글 플레이스토어{"\n"}
          인앱 결제를 통해서 결제 됩니다.{"\n"}
          {"\n"}
          공유링크는 생성시 바로 타 유저들에게 알림이{"\n"}
          뜨기 때문에 편리하게 n 등분 결제가 가능합니다.
        </MiddleSubText>

        <PurcahseButton onPress={() => requestSubscription("regularpayment")}>
          <PurcahseText>결제하러 가기</PurcahseText>
        </PurcahseButton>
      </MiddleView>
      {/* <TouchableOpacity
        onPress={()=>console.log(getSubscriptions())}
        activeOpacity={0.5}
      >
        <Text>현재 구매한 목록 확인</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity
        onPress={()=>{getAvailablePurchases().then((result)=>{console.log(result)})}}
        activeOpacity={0.5}
        style={styles.btn}
      >
        <Text>현재 보유한 목록</Text>
      </TouchableOpacity> */}
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

const PurcahseButton = styled.TouchableOpacity`
  margin-top: 40px;
  margin-bottom: 40px;
  width: 159px;
  height: 37px;
  background-color: #0c678e;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 11px;
  border-radius: 19px;
`;

const PurcahseText = styled.Text`
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
`;

const UpperView = styled.View`
  margin-left: 50px;
  margin-top: 100px;
`;

const MiddleView = styled.View`
  margin-top: 50px;
  align-items: center;
  justify-content: center;
`;

const TitleText = styled.Text`
  color: #0c678e;
  font-size: 27px;
  font-weight: bold;
`;

const TitleSubText = styled.Text`
  color: #000000;
  font-size: 12px;
`;

const MiddleTitleText = styled.Text`
  text-align: center;
  color: #707070;
  font-size: 12px;
  font-weight: bold;
`;

const MiddleSubText = styled.Text`
  text-align: center;
  color: #000000;
  font-size: 11px;
`;

const BenefitListContainer = styled.View`
  margin-top: 50px;
  margin-bottom: 50px;
  height: 300px;
`;

const BenefitItemContainer = styled.View`
  flex-direction: row;
`;

const BenefitItemIcon = styled.View`
  background-color: #000000;
  height: 55px;
  width: 55px;
`;

const BenefitInfo = styled.View`
  align-items: flex-start;
  margin-left: 10px;
`;

const BenefitInfoTitleText = styled.Text`
  color: #000000;
  font-size: 11px;
  font-weight: bold;
`;

const BenefitInfoSubText = styled.Text`
  color: #707070;
  font-size: 9px;
`;

const GrayLine = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
  height: 2px;
  width: 280px;
  background-color: #eeeeee;
`;
