import appleAuth from "@invertase/react-native-apple-authentication";
import KakaoLogins, { KAKAO_AUTH_TYPES } from "@react-native-seoul/kakao-login";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Platform, SafeAreaView, StatusBar } from "react-native";
import { BlankButton } from "../../../components/button/BlankButton";
import { KakaoIcon } from "../../../components/icon/KakaoIcon";
import { BlankBackground } from "../../../components/layout/BlankBackground";
import { Logo } from "../../../components/logo/Logo";
import { API_URL } from "../../../constant";
import { useAuthContext } from "../../../contexts/AuthContext";
import { LoginStackParamList } from "./LoginNavigation";

import image from "../../../../images/login/bg.png";
import styled from "@emotion/native";
import { GenderColor } from "../../../components/color/GenderColor";
type LoginScreenNavigation = StackNavigationProp<
  LoginStackParamList,
  "LoginScreen"
>;

export const LoginScreen: React.FC = ({}) => {
  const { navigate } = useNavigation<LoginScreenNavigation>();
  const [isSimpleLogin, setIsSimpleLogin] = useState(false);
  const [id, setId] = useState("admin");
  const [password, setPassword] = useState("12");
  const { setLoggedIn } = useAuthContext();

  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
    }
    StatusBar.setBarStyle("dark-content");
  }, []);
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
            "accept": "application/json",
            "Content-Type": "application/json",
          },
        }
    ).then(d => {
      if (d.data.access && d.data.refresh)
        setLoggedIn(d.data.access, d.data.refresh);
    })
      .catch((e) => Alert.alert("로그인 오류", "아이디 또는 비밀번호가 일치하지 않습니다.\n"+e.response.data.detail));
  };

  const handleAppleLogin = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticateda
    }
  };
  return isSimpleLogin ? (
    <BlankBackground>
      <Background source={image}>
        <Overlay>
          <SafeAreaView>
            <LoginContainer>
              <Logo />
              <LoginContentContainer>
                <LoginInput
                  value={id}
                  onChangeText={setId}
                  placeholder="아이디 입력"
                  placeholderTextColor="white"
                  autoCapitalize="none"
                />
                <InputBorder />
                <LoginInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="비밀번호 입력"
                  placeholderTextColor="white"
                  secureTextEntry={true}
                />
                <InputBorder />
                <FindContainer>
                  <FindText onPress={() => navigate("FindIdScreen")}>
                    아이디 찾기
                  </FindText>
                  <InputVerticalBorder />
                  <FindText onPress={() => navigate("FindPasswordScreen")}>
                    비밀번호 찾기
                  </FindText>
                </FindContainer>
                <ButtonContainer>
                  <BlankButton
                    borderRadius={36}
                    onPress={() => login()}
                    backgroundColor="rgb(237, 237, 237)"
                  >
                    로그인하기
                  </BlankButton>
                </ButtonContainer>
                <ButtonContainer>
                  <BlankButton
                    onPress={() => navigate("AgreeScreen")}
                    color="white"
                  >
                    회원가입
                  </BlankButton>
                </ButtonContainer>
              </LoginContentContainer>
            </LoginContainer>
          </SafeAreaView>
        </Overlay>
      </Background>
    </BlankBackground>
  ) : (
    <BlankBackground>
      <Background source={image}>
        <SafeAreaView>
          <LoginContainer>
            <Logo />
            <LoginContentContainer>
              <ButtonContainer>
                <BlankButton
                  borderRadius={36}
                  onPress={() => {
                    KakaoLogins.login([KAKAO_AUTH_TYPES.Talk]);
                  }}
                  backgroundColor="#fdec00"
                  icon={<KakaoIcon />}
                >
                  카카오 로그인
                </BlankButton>
              </ButtonContainer>
              {Platform.OS == "ios" && (
                <ButtonContainer>
                  <BlankButton
                    borderRadius={36}
                    onPress={handleAppleLogin}
                    backgroundColor="white"
                    icon={<KakaoIcon />}
                  >
                    애플 로그인
                  </BlankButton>
                </ButtonContainer>
              )}
              <ButtonContainer>
                <BlankButton onPress={() => setIsSimpleLogin(true)}>
                  일반 로그인 및 회원가입
                </BlankButton>
              </ButtonContainer>
            </LoginContentContainer>
          </LoginContainer>
        </SafeAreaView>
      </Background>
    </BlankBackground>
  );
};

const Background = styled.ImageBackground`
  flex: 1;
  align-items: center;
`;

const LoginContainer = styled.View`
  margin-top: 120px;
  margin-bottom: 64px;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const LoginContentContainer = styled.View`
  align-items: center;
`;

const LoginInput = styled.TextInput`
  padding-bottom: 16px;
  color: white;
  font-size: 18px;
  text-align: center;
`;

const InputBorder = styled.View`
  width: 211px;
  border: 1px solid #f0f0f0;
  margin-bottom: 36px;
`;

const InputVerticalBorder = styled.View`
  height: 12px;
  border: 1px solid #f0f0f0;
  margin-left: 16px;
  margin-right: 16px;
`;

const ButtonContainer = styled.View`
  margin-bottom: 8px;
`;

const FindContainer = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

const FindText = styled.Text`
  color: white;
`;

const Overlay = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.47);
  opacity: 0.8;
`;
