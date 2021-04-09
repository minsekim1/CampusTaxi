import styled from "@emotion/native";
import axios from "axios";
import React from "react";
import { Alert } from "react-native";
import RNRestart from "react-native-restart";
import { BlankButton } from "../../../../components/button/BlankButton";
import { BlankBackground } from "../../../../components/layout/BlankBackground";
import { RegisterLogo } from "../../../../components/logo/RegisterLogo";
import { useAuthContext } from "../../../../contexts/AuthContext";

export const RegisterSuccessScreen = (props: any) => {
  const { id, password } = props.route.params;
  const { setLoggedIn } = useAuthContext();

  const login = async () => {
    axios
      .post(
        "https://api.campustaxi.net/api/v1/accounts/token/",
        {
          username: id,
          password: password,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((d) => {
        if (d.data.access && d.data.refresh)
          setLoggedIn(d.data.access, d.data.refresh);
      })
      .catch((e) =>
        Alert.alert(
          "로그인 오류",
          "아이디 또는 비밀번호가 일치하지 않습니다.\n" + e.response.data.detail
        )
      );
  };

  return (
    <BlankBackground color="#fff">
      <Container>
        <RegisterLogo />
        <LogoText>CAMPUS TAXI</LogoText>
        <WelcomeText>환영합니다!</WelcomeText>
        <Description>
          해당 어플은 삼육대학교 창업동아리{"\n"}'캠퍼스택시'가 제작하고{"\n"}
          운영하는 어플입니다.
          {"\n"}
          송금은
          <BlueText>TOSS앱</BlueText>,{"\n"}택시 호출은{" "}
          <YellowText>카카오 택시</YellowText>를{"\n"}
          이용해 주세요!
        </Description>
      </Container>
      <BlankButton
        backgroundColor="#CBCED7"
        color="white"
        onPress={() => {
          RNRestart.Restart();
        }}
        paddingBottom={8}
      >
        처음으로 돌아가기
      </BlankButton>
      <BlankButton
        backgroundColor="#172864"
        color="white"
        onPress={() => login()}
        paddingBottom={16}
      >
        로그인
      </BlankButton>
    </BlankBackground>
  );
};

const Container = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 48px;
  flex: 1;
`;

const LogoText = styled.Text`
  margin: 24px;
  font-size: 18px;
  text-align: center;
`;

const WelcomeText = styled.Text`
  margin: 24px;
  font-size: 18px;
  text-align: center;
  color: #6060dc;
`;

const Description = styled.Text`
  font-size: 18px;
  text-align: center;
`;

const BlueText = styled.Text`
  color: #0a39f6;
`;

const YellowText = styled.Text`
  color: #fdec00;
`;
