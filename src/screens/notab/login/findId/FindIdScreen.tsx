import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { SimpleButton } from "../../../../components/button/SimpleButton";
import { PhoneVerification } from "../../../../components/form/PhoneVerification";
import { TextField } from "../../../../components/form/TextField";
import { BlankBackground } from "../../../../components/layout/BlankBackground";
import { Description } from "../../../../components/text/Description";
import { Title } from "../../../../components/text/Title";
import { LoginStackParamList } from "../LoginNavigation";

type LoginNavigation = StackNavigationProp<LoginStackParamList, "FindIdScreen">;

enum FindMethod {
  PHONE = "phone",
}

export const FindIdScreen: React.FC = ({}) => {
  const { navigate } = useNavigation<LoginNavigation>();
  const [method, setMethod] = useState<FindMethod>(FindMethod.PHONE);
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");

  const [isActivePhone, setIsActivePhone] = useState(false);
  const [phone, setPhoneG] = useState("");
  const [phoneCountry, setPhoneCountryG] = useState("");
  return (
    <BlankBackground>
      <SafeAreaView>
        <Container>
          {/* <Title>아이디 찾는 방법을 선택해 주세요.</Title> */}
          <Title />
          <RadioContainer>
            <RadioForm formHorizontal={true} animation={true}>
              <RadioButton labelHorizontal={true}>
                <RadioButtonInput
                  obj={{ label: "휴대전화로 인증", value: FindMethod.PHONE }}
                  index={0}
                  isSelected={method === FindMethod.PHONE}
                  onPress={() => {
                    setMethod(FindMethod.PHONE);
                  }}
                  buttonInnerColor={"#707070"}
                  buttonOuterColor={
                    method === FindMethod.PHONE ? "#707070" : "#707070"
                  }
                  buttonSize={12}
                  buttonOuterSize={24}
                />
                <RadioButtonLabel
                  obj={{
                    label: isActivePhone
                      ? "휴대전화로 인증 💌"
                      : "휴대전화로 인증",
                    value: FindMethod.PHONE,
                  }}
                  index={0}
                  labelHorizontal={true}
                  onPress={() => {
                    setMethod(FindMethod.PHONE);
                  }}
                />
              </RadioButton>
            </RadioForm>
            {method === FindMethod.PHONE && (
              <Description>
                회원정보에 등록한 휴대전화 번호와 입력한 휴대전화 번호가 같아야,
                인증번호를 받을 수 있습니다.
              </Description>
            )}
            <RadioLine />
            {method === FindMethod.PHONE && (
              <>
                <TextField
                  value={name}
                  setValue={setName}
                  placeholder="이름(본명)"
                />
                  <PhoneVerification
                    setIsActivePhone={setIsActivePhone}
                    setPhoneG={setPhoneG}
                    setPhoneCountryG={setPhoneCountryG}
                  />
                {isActivePhone && (
                  <SimpleButton
                    isActive={true}
                    onPress={() =>
                      navigate("FoundScreen", {
                        name: name,
                        phone: phone,
                      })
                    }
                  >
                    확인
                  </SimpleButton>
                )}
                <TouchableHighlight></TouchableHighlight>
              </>
            )}
          </RadioContainer>
        </Container>
      </SafeAreaView>
    </BlankBackground>
  );
};

const Container = styled.View`
  margin-left: 24px;
  margin-right: 24px;
`;

const RadioLine = styled.View`
  width: 350px;
  margin-bottom: 12px;
  border: 1px solid #f5f5f5;
  align-self: center;
`;

const RadioContainer = styled.View``;

const SentContainer = styled.View`
  margin-top: 24px;
`;
