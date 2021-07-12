import styled from "@emotion/native";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BackHandler, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CustomAxios } from "../../../components/axios/axios";
import { API_URL } from "../../../constant";
import { useAuthContext } from "../../../contexts/AuthContext";
import { User } from "../../../contexts/User";

const Section = styled.View`
  padding: 14px 43px;
`;
const Title = styled.Text`
  color: #7d849b;
  font-size: 11px;
`;
const Input = styled.TextInput`
  font-size: 15px;
  color: black;
  padding: 0;
  margin: 0;
`;
const Scroll = styled.ScrollView`
  background-color: white;
`;
const Row = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;
const Col = styled.View`
  width: 50%;
`;
export const AccountScreen: React.FC = (props:any) => {
  //#region 유저 데이터 요청
  // AuthContext 시용하지 않고 직접 데이터 요청함
  const { token, resetToken, refresh,setNavName } = useAuthContext();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    CustomAxios(
      "GET",
      `${API_URL}/v1/accounts/me/`,
      resetToken,
      refresh,
      token,
      undefined, //"User API",
      undefined,
      (d: User) => setUser(d)
    );
  }, []);
  //#endregion 유저 데이터 요청
    //#region 뒤로 가기 제어
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    }
  }, [isFocused]);
  
  
  const handleBackButton = () => {
    setNavName({ istab: "Tab", tab: "SettingTabScreen" });
    return true;
  };
  //#endregion 뒤로 가기 제어
  return (
    <Container>
      <Scroll>
        <Section>
          <Title>이름</Title>
          <Input editable={false} value={user?.name}></Input>
        </Section>
        <Section>
          <Title>학교</Title>
          <Input editable={false} value={user?.campus_name}></Input>
        </Section>
        <Section>
          <Title>닉네임</Title>
          <Input editable={false} value={user?.nickname}></Input>
        </Section>
        <Section>
          <Row>
            <Col>
              <Title>성별</Title>
              <Input
                editable={false}
                value={user?.gender == "MALE" ? "남자" : "여자"}
              ></Input>
            </Col>
            {/* // TEST CODE 추후에 가입일 확인할 수 있도록 바꿔야함. 현재 확인 불가*/}
            {/* <Col>
              <Title>가입일</Title>
              <Input editable={false} value={user?.date_joined}></Input>
            </Col> */}
          </Row>
        </Section>
        <Section>
              <Title>아이디</Title>
              <Input editable={false} value={user?.username}></Input>
        <Section>
        </Section>
              <Title>이메일</Title>
              <Input editable={false} value={user?.email}></Input>
        </Section>
        <Section>
          <Row>
            <Col>
              <Title>학생증인증</Title>
              <Input
                editable={false}
                value={
                  // TEST CODE 추후에 학생증 검수 여부 확인할 수 있도록 바꿔야함. 현재 get 요청시 안줌.
                  "검수 진행중"
                  // user?.is_accepted ? "미인증" : "인증 완료"
                }
              ></Input>
            </Col>
            {/* <Col>
              <Title>프리미엄 여부</Title>
              <Input editable={false} value={"asd"}></Input>
            </Col> */}
          </Row>
        </Section>
      </Scroll>
    </Container>
  );
};

const Container = styled.SafeAreaView``;
