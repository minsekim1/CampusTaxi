import styled from "@emotion/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text } from "react-native-svg";
import { BottomButton } from "../../../../components/button/BottomButton";
import { SimpleCheckBox } from "../../../../components/checkbox/SimpleCheckBox";
import { LoginStackParamList } from "../LoginNavigation";

type LoginNavigation = NavigationProp<LoginStackParamList, "AgreeScreen">;

export const AgreeScreen: React.FC = ({}) => {
  const { navigate } = useNavigation<LoginNavigation>();
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [location, setLocation] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [appPush, setAppPush] = useState(false);
  const [SMS, setSMS] = useState(false);
  const [emailMarket, setEmailMarket] = useState(false);

  const handleCheckAll = () => {
    if (terms && privacy && location && marketing) {
      setTerms(false);
      setPrivacy(false);
      setLocation(false);
      setMarketing(false);
      setAppPush(false);
      setSMS(false);
      setEmailMarket(false);
    } else {
      setTerms(true);
      setPrivacy(true);
      setLocation(true);
      setMarketing(true);
      setAppPush(true);
      setSMS(true);
      setEmailMarket(true);
    }
  };
  const handelCheckMarket = () => {
    if (marketing)
    {
      setAppPush(false);
      setSMS(false);
      setEmailMarket(false);
      setMarketing(false);
    }
    else {
      setMarketing(true);
      setAppPush(true);
      setSMS(true);
      setEmailMarket(true);
    }
    
}
  return (
    <Container>
      <ContentContainer>
        <CheckboxContainer>
          <Checkbox>
            <SimpleCheckBox
              value={terms && privacy && location && marketing}
              setValue={handleCheckAll}
            />
            <Content onPress={handleCheckAll}>
              캠퍼스 택시의 모든 운영원칙에 동의
            </Content>
          </Checkbox>
        </CheckboxContainer>
        <CheckboxContainer style={{ marginLeft: 20 }}>
          <Checkbox>
            <SimpleCheckBox value={terms} setValue={setTerms} />
            <Content onPress={()=>setTerms(!terms)}>서비스 이용약관 (필수)</Content>
          </Checkbox>
          <Description
            onPress={() => {
              navigate("TermsScreen");
            }}
          >
            자세히보기
          </Description>
        </CheckboxContainer>
        <CheckboxContainer style={{ marginLeft: 20 }}>
          <Checkbox>
            <SimpleCheckBox value={privacy} setValue={setPrivacy} />
            <Content onPress={()=>setPrivacy(!privacy)}>개인정보 처리방침 (필수)</Content>
          </Checkbox>
          <Description
            onPress={() => {
              navigate("PrivacyScreen");
            }}
          >
            자세히보기
          </Description>
        </CheckboxContainer>
        <CheckboxContainer style={{ marginLeft: 20 }}>
          <Checkbox>
            <SimpleCheckBox value={location} setValue={setLocation} />
            <Content onPress={()=>setLocation(!location)}>위치정보 이용약관 (필수)</Content>
          </Checkbox>
          <Description
            onPress={() => {
              navigate("GeoScreen");
            }}
          >
            자세히보기
          </Description>
        </CheckboxContainer>
        <CheckboxContainer style={{ marginLeft: 20 }}>
          <Checkbox>
            <SimpleCheckBox value={marketing} setValue={handelCheckMarket} />
            <Content onPress={()=>handelCheckMarket()}>마케팅 정보 수신 (선택)</Content>
          </Checkbox>

          <Description
            onPress={() => {
              navigate("MarketingScreen");
            }}
          >
            자세히보기
          </Description>
        </CheckboxContainer>
        <PushContainer>
          <Checkbox>
            <SimpleCheckBox value={appPush} setValue={setAppPush} />
            <Content onPress={()=>setAppPush(!appPush)}>앱 Push 알림</Content>
            <SimpleCheckBox value={SMS} setValue={setSMS} />
            <Content onPress={()=>setSMS(!SMS)}>SMS</Content>
            <SimpleCheckBox value={emailMarket} setValue={setEmailMarket} />
            <Content onPress={()=>setEmailMarket(!emailMarket)}>이메일</Content>
          </Checkbox>
        </PushContainer>
        <Note>※ 선택 약관에 동의하지 않아도 회원가입이 가능합니다.</Note>
      </ContentContainer>
      <BottomButton
        disable={!(terms && privacy && location)}
        onPress={() => {
          if (terms && privacy && location) {
            navigate("RegisterScreen",{appPush:appPush,SMS:SMS,emailMarket:emailMarket});
          }
        }}
      >
        다 음
      </BottomButton>
    </Container>
  );
};
const PushContainer = styled.View`
  align-items: flex-end;
  padding: 0 20px 15px 0;
`;
const Container = styled.SafeAreaView`
  flex: 1;
  background-color:white;
`;

const ContentContainer = styled.View`
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 24px;
`;

const CheckboxContainer = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.Text`
  margin-left: 18px;
`;

const Checkbox = styled.View`
  flex-direction: row;
`;

const Description = styled.Text`
  color: #8b8b8b;
  border-bottom-width: 1px;
  border-bottom-color: #bfbfbf;
  padding: 3px 0px 3px 0px;
`;

const Note = styled.Text`
  color: #8b8b8b;
`;
