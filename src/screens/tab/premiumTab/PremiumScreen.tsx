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
  ImageBackgroundBase,
  ImageBackground,
  Dimensions,
} from "react-native";
//import * as RNIap from "react-native-iap";
import React, { Component, useEffect, useState } from "react";

import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";
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
import { BgPremium } from "../../../components/background/BgPremium";
import { AdFree } from "../../../components/icon/premium/AdFree";
import { AdPayment } from "../../../components/icon/premium/AdPayment";
import { AdPhoto } from "../../../components/icon/premium/AdPhoto";
import { AdProfile } from "../../../components/icon/premium/AdProfile";
import { AdTheme } from "../../../components/icon/premium/AdTheme";

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
  icon: any;
}> = ({ title, subtitle, subtitle2, icon }) => {
  return (
    <BenefitItemContainer>
      <BenefitItemIcon>{icon}</BenefitItemIcon>
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
  // #region 프리미엄인지 아닌지 페이지 바뀔 때마다 확인
  const { getPremium } = useAuthContext();
  const [isPremium, setIsPremium] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) getPremium().then((isP) => setIsPremium(isP));
  }, [isFocused]);
  useFocusEffect(() => {
    getAvailablePurchases();
  });
  // #endgion 프리미엄인지 아닌지 페이지 바뀔 때마다 확인
  // #region 프리미엄 구매 함수
  const purchaseFunction = () => {
    requestSubscription("regularpayment").then((v) => setIsPremium(v === true));
  };
  //#endregion 프리미엄 구매 함수
  return (
    <Container>
      <View
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <BgPremium />
      </View>
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
            title="테마 변경 가능"
            subtitle="총 9가지의 다양한 테마 중 자신이 원하는"
            subtitle2="채팅방 테마 적용 가능"
            icon={<AdTheme />}
          />
          <GrayLine />
          <BenefitItemComponent
            title="프로필 아이콘 변경 가능"
            subtitle="총 7가지의 캠퍼스택시 대표 캐릭터들로"
            subtitle2="아이콘 변경 가능"
            icon={<AdProfile />}
          />
          <GrayLine />
          <BenefitItemComponent
            title="광고없는 이용"
            subtitle="팝업 광고와 앱 최하단 배너광고를"
            subtitle2="제거하여 편안하게 이용 가능"
            icon={<AdFree />}
          />
          <GrayLine />
          <BenefitItemComponent
            title="사진 + 이모티콘 전송 가능"
            subtitle="채팅방 내 필요한 사진과 캠퍼스택시"
            subtitle2="이모티콘을 무제한 사용 가능"
            icon={<AdPhoto />}
          />
          <GrayLine />
          <BenefitItemComponent
            title="분할 결제 가능"
            subtitle="택시 이용자들 간 실명정보 교환없이"
            subtitle2="안전하게 분할결제 가능"
            icon={<AdPayment />}
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
        {isPremium ? (
          <PurcahseButtonAlready>
            <PurcahseText>이미 구매하셨습니다</PurcahseText>
          </PurcahseButtonAlready>
        ) : (
          <PurcahseButton onPress={purchaseFunction}>
            <PurcahseText>결제하러 가기</PurcahseText>
          </PurcahseButton>
        )}
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

const PurcahseButtonAlready = styled.View`
  margin-top: 40px;
  margin-bottom: 40px;
  width: 159px;
  height: 37px;
  background-color: #bababa;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 11px;
  border-radius: 19px;
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
  height: 370px;
`;

const BenefitItemContainer = styled.View`
  flex-direction: row;
`;

const BenefitItemIcon = styled.View`
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
  margin-top: 10px;
`;

const GrayLine = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
  height: 2px;
  width: 280px;
  background-color: #eeeeee;
`;
