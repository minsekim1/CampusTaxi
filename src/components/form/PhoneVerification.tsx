import styled, { css } from "@emotion/native";
import axios, { AxiosResponse } from "axios";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Alert, TextInput } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { API_URL } from "../../constant";
import { SimpleButton } from "../button/SimpleButton";
import { CustomAlert } from "../chat-room/CustomAlert";

type Props = {
  setIsActivePhone: Dispatch<SetStateAction<boolean>>;
  setPhoneG: Dispatch<SetStateAction<string>>;
  setPhoneCountryG: Dispatch<SetStateAction<string>>;
  setFocusInput?: Dispatch<SetStateAction<number>>;
};
export const PhoneVerification: React.FC<Props> = ({
  setIsActivePhone,
  setFocusInput,
  setPhoneG,
  setPhoneCountryG,
}) => {
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("+82");
  const [code, setCode] = useState("");
  const [isCodeInput, setCodeInput] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const RefTextInputCode = useRef<TextInput>();
  const checkCode = (t: string) => {
    // curl -X POST "https://api.campustaxi.net/api/v1/accounts/auth/verify/" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{  \"receiver\": \"01022039894\",  \"channel\": \"phone\",  \"code\": \"270500\"}"
    setCode(t);
    if (t.length == 6)
      axios
        .post(
          `${API_URL}/v1/auth/send/`,
          {
            //TEST CODE 이종률로 고정임 현재 번호, 바꿔야함.
            receiver: phone,
            channel: "phone",
            // code: t,
          },
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((r) => {
          if (r.data) {
            setIsActive(true);
            setCodeInput(false);
            setIsActivePhone(true);
            {
              setFocusInput ? setFocusInput(0) : null;
            }
          } else Alert.alert("", JSON.stringify(r.data));
        })
        .catch((e) =>
          Alert.alert(
            e.toString(),
            "\n잘못된 인증번호입니다. \n다시확인해주세요."
          )
        );
  };
  return (
    <>
      <PhoneContainer>
        <RNPickerSelect
          disabled={isActive}
          style={{
            inputAndroidContainer: PickerContainer,
            inputIOSContainer: PickerContainer,
            viewContainer: PickerViewContainer,
            placeholder: PickerText,
            inputAndroid: PickerText,
          }}
          onValueChange={(value) => {
            setPhoneCountry(value);
            setPhoneCountryG(value);
          }}
          items={[{ label: "+82(대한민국)", value: "82" }]}
          value={phoneCountry}
          placeholder={{ label: "+82(대한민국)", value: "82" }}
        />
        <PhoneNumber
          editable={!isActive}
          value={phone}
          onChangeText={(t:any) => {
            setPhone(t);
            setPhoneG(t);
          }}
          placeholder="휴대폰 번호 예)01012341234"
          placeholderTextColor="#b0b0b2"
          keyboardType="decimal-pad"
        />
      </PhoneContainer>
      {isCodeInput ? (
        <CodeContainer>
          <Code
            ref={RefTextInputCode}
            value={code}
            onChangeText={checkCode}
            maxLength={6}
            keyboardType="numeric"
          />
        </CodeContainer>
      ) : (
        <></>
      )}
      <SimpleButton
        isActive={!isActive}
        onPress={() => {
          if (!phone) Alert.alert("", "휴대폰 번호를 입력해주세요.");
          else if (phone.length < 11)
            Alert.alert("", "올바른 휴대폰 번호를 입력해주세요.");
          else if (!phoneCountry) Alert.alert("", "국가코드를 선택해주세요.");
          else {
            setSent(true);
            // curl -X POST "https://api.campustaxi.net/api/v1/accounts/auth/" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{  \"receiver\": \"01024419894\",  \"channel\": \"phone\"}"
            // curl -X POST "http://13.209.251.131:8000/api/v1/accounts/auth/" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{  \"receiver\": \"01024419894\",  \"channel\": \"phone\"}"
            // 확인을 눌렀을경우
            // TEST CODE receiver 바꿨을 때 다시 봐야함 현재  의미가 없음
            const onPressOk = () => {
              axios
                .post<{ status: string }>(
                  // https://api.campustaxi.net/api/v1/auth/send/
                  `${API_URL}/v1/auth/send/`,
                  { receiver: "01022039894", channel: "phone" },
                  {
                    headers: {
                      accept: "application/json",
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((r) => {
                  if (r.data.status == "생성") {
                    setCodeInput(true);
                    RefTextInputCode.current?.focus();
                  } else
                    Alert.alert(
                      "인증번호 생성에 실패하였습니다. 잠시 뒤에 다시 이용해주세요. 해당 상황이 지속적으로 반복된다면, campustaxi@naver.com로 이메일을 남겨주세요."
                    );
                })
                .catch((err) => console.log("phone verification: ", err));
            };
            CustomAlert(
              "",
              phoneCountry +
                ")" +
                phone +
                "\n" +
                "해당 번호로 인증번호를 만드시겠습니까?",
              true,
              true,
              onPressOk
            );
          }
        }}
        clicked={sent}
      >
        {sent ? (!isActive ? "재전송하기" : "인증완료") : "인증번호 전송하기"}
      </SimpleButton>
    </>
  );
};

const CodeContainer = styled.View`
  align-items: center;
  text-align: center;
`;

const Code: any = styled.TextInput`
  width: 100px;
  text-align: center;
  padding: 2px;
  margin-bottom: 10px;
  border: 0px solid #646481;
  border-bottom-width: 2px;
`;

const PhoneContainer = styled.View`
  margin-bottom: 12px;
`;

const PhoneNumber: any = styled.TextInput`
  padding: 10px 15px;
  border: 2px solid rgba(149, 149, 149, 0.09);
  border-radius: 8px;
  margin: 0;
`;

const PickerViewContainer = css`
  border: 2px solid rgba(149, 149, 149, 0.09);
  border-radius: 8px;
`;
const PickerContainer = css`
  padding: 10px 15px;
  margin: 0;
`;

const PickerText = css`
  color: black;
`;
