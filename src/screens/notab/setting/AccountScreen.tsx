import styled from "@emotion/native";
import React from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useAuthContext } from "../../../contexts/AuthContext";

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
`
export const AccountScreen: React.FC = () => {
	const User = useAuthContext().User
  return (
    <Container>
      <Scroll>
        <Section>
          <Title>이름</Title>
          <Input editable={false} value={User.username}></Input>
        </Section>
        <Section>
          <Title>학교</Title>
          <Input editable={false} value={User.campus_name}></Input>
        </Section>
        <Section>
          <Title>닉네임</Title>
          <Input editable={false} value={User.nickname}></Input>
        </Section>
        <Section>
          <Row>
            <Col>
              <Title>성별</Title>
              <Input editable={false} value={User.gender == 0 ? "여자" : "남자"}></Input>
            </Col>
            <Col>
              <Title>가입일</Title>
              <Input editable={false} value={User.date_joined}></Input>
            </Col>
          </Row>
        </Section>
        <Section>
          <Row>
            <Col>
              <Title>아이디</Title>
              <Input editable={false} value={User.name}></Input>
            </Col>
            <Col>
              <Title>이메일</Title>
              <Input editable={false} value={User.email}></Input>
            </Col>
          </Row>
        </Section>
        <Section>
          <Row>
            <Col>
              <Title>학생증인증</Title>
              <Input editable={false} value={User.is_cert ? "미인증" : "인증 완료("+User.cert_dtm+")"}></Input>
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
