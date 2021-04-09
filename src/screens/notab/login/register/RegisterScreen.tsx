import styled, { css } from "@emotion/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Alert,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { BottomButton } from "../../../../components/button/BottomButton";
import { SimpleButton } from "../../../../components/button/SimpleButton";
import { SimpleCheckBox } from "../../../../components/checkbox/SimpleCheckBox";
import { PhoneVerification } from "../../../../components/form/PhoneVerification";
import { API_URL, UNIV_LIST } from "../../../../constant";
import { LoginStackParamList } from "../LoginNavigation";
import RNPickerSelect from "react-native-picker-select";

type LoginNavigation = NavigationProp<LoginStackParamList, "RegisterScreen">;
type pickerProps = { label: string; value: string };
export const RegisterScreen: React.FC = (props) => {
  const { SMS, appPush, emailMarket } = props.route.params;
  const { navigate } = useNavigation<LoginNavigation>();
  const [isActivePhone, setIsActivePhone] = useState(false);
  const [isActiveInfo, setIsActiveInfo] = useState(false);
  const [phone, setPhoneG] = useState("");
  const [phoneCountry, setPhoneCountryG] = useState("");
  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [gender, setGender] = useState(-1);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [focusInput, setFocusInput] = useState(-1);
  const RefScroll = useRef<ScrollView>(null);
  const InputRefList = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];
  //포커싱 : 입력후 다음으로 넘어가는 함수
  useEffect(() => {
    if (focusInput != -1) InputRefList[focusInput].current?.focus();
    //닉네임
    if (focusInput == 0)
      RefScroll.current?.scrollTo({ x: 0, y: 310, animated: true });
    //아이디
    else if (focusInput == 1)
      RefScroll.current?.scrollTo({ x: 0, y: 396, animated: true });
    //비밀번호
    else if (focusInput == 2)
      RefScroll.current?.scrollTo({ x: 0, y: 478, animated: true });
    //비밀번호 확인
    else if (focusInput == 3)
      RefScroll.current?.scrollTo({ x: 0, y: 560, animated: true });
    //성별
    else if (focusInput == 4)
      RefScroll.current?.scrollTo({ x: 0, y: 646, animated: true });
    //이메일(선택)
    else if (focusInput == 5)
      RefScroll.current?.scrollTo({ x: 0, y: 722, animated: true });
    //주소(선택)
    else if (focusInput == 6)
      RefScroll.current?.scrollTo({ x: 0, y: 805, animated: true });
    //학생증 사진
    else if (focusInput == 7)
      RefScroll.current?.scrollTo({ x: 0, y: 908, animated: true });
    //이름(본명)
    else if (focusInput == 8)
      RefScroll.current?.scrollTo({ x: 0, y: 1160, animated: true });
    //학교
    else if (focusInput == 9)
      RefScroll.current?.scrollTo({ x: 0, y: 1160, animated: true });
  }, [focusInput]);
  const BottomButtonOnPress = (navigate: any) => {
    if (!id) Alert.alert("", "아이디가 빈 칸입니다.");
    else if (!password || !passwordCheck)
      Alert.alert("", "비밀번호를 입력해주세요.");
    else if (password.length < 8)
      Alert.alert("", "비밀번호는 최소 8문자 이상이여야합니다.");
    else if (password != passwordCheck)
      Alert.alert("", "비밀번호가 서로 다릅니다.");
    else if (!nickname) Alert.alert("", "닉네임이 빈 칸입니다.");
    else if (!name) Alert.alert("", "이름(본명)이 빈 칸입니다.");
    else if (gender == -1) Alert.alert("", "성별을 선택해주세요.");
    else if (!file) Alert.alert("", "학생증을 반드시 첨부해주세요.");
    else if (school == "0") Alert.alert("", "학교를 선택해주세요.");
    else {
      // 회원가입
      // curl -X POST "https://api.campustaxi.net/api/v1/accounts/signup/" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{  \"username\": \"string\",  \"password\": \"string\",  \"password1\": \"string\",  \"nickname\": \"string\",  \"gender\": \"NONE\",  \"phone\": \"string\",  \"name\": \"string\",  \"email\": \"user@example.com\",  \"address\": \"string\",  \"campus_name\": \"string\",  \"is_cert\": true,  \"is_accepted\": true,  \"is_geo_service\": true,  \"is_privacy\": true,  \"is_pushed_app\": true,  \"is_pushed_sms\": true,  \"is_pushed_email\": true}"

      // TEST CODE 추후 국가코드 phoneCountry도 전송할 것.
      /// 추후 학생증 추가할것. 추후 닉네임 중복확인할것. 핸드폰 중복확인할것. 이메일 중복 확인할것.
      let genderToText = gender == 1 ? "MALE" : "FEMALE";
      axios
        .post(
          "https://api.campustaxi.net/api/v1/accounts/signup/",
          {
            username: id,
            password: password,
            password1: passwordCheck,
            nickname: nickname,
            gender: genderToText,
            phone: phone,
            name: name,
            email: email,
            address: address,
            campus_name: school,
            is_cert: true,
            is_accepted: true,
            is_geo_service: true,
            is_privacy: true,
            is_pushed_app: appPush,
            is_pushed_sms: SMS,
            is_pushed_email: emailMarket,
          },
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .catch((e) => {
          if (
            JSON.stringify(e.response.data).substring(0, 20) !=
            '"\\n<!doctype html>\\n'
          )
            Alert.alert("", JSON.stringify(e.response.data));
          else {
            // 회원가입 완료
            Alert.alert(
              "",
                "아이디:"+  id+ "\n"+
                "비밀번호:"+  password+ "\n"+
                "닉네임:"+  nickname+ "\n"+
                "성별:"+  genderToText+ "\n"+
                "휴대폰번호:"+  phone+ "\n"+
                "실명:"+  name+ "\n"+
                "이메일:"+  email+ "\n"+
                "주소:"+  address+ "\n"+
                "학교:"+  school+ "\n"+
                "앱 푸쉬 알림:"+  appPush+ "\n"+
                "문자 푸쉬 알림:"+  SMS+ "\n"+
                "이메일 푸쉬 알림:"+  emailMarket+ "\n"+ "\n"
               + "해당 정보로 회원가입이 완료되었습니다."
            );
            navigate("RegisterSuccessScreen",{id:id,password:password});
          }
        });
    }
  };
  const [pickerItem, setPickerItem] = useState<pickerProps[]>([]);

  // 대학교 목록 초기화
  useEffect(() => {
    let result: pickerProps[] = [];
    UNIV_LIST.map((univ) => result.push({ label: univ, value: univ }));
    setPickerItem(result);
  }, []);
  const checkIsActiveInfo = (
    setFunction: any,
    t: string | number,
    type: "id" | "password" | "passwordCheck" | "nickname" | "gender"
  ) => {
    setFunction;
    if (
      type == "id" &&
      !!t &&
      password == passwordCheck &&
      !!password &&
      !!nickname &&
      gender != -1
    )
      setIsActiveInfo(true);
    else if (
      type == "password" &&
      !!id &&
      t == passwordCheck &&
      !!t &&
      !!nickname &&
      gender != -1
    )
      setIsActiveInfo(true);
    else if (
      type == "passwordCheck" &&
      !!id &&
      password == t &&
      !!t &&
      !!password &&
      !!nickname &&
      gender != -1
    )
      setIsActiveInfo(true);
    else if (
      type == "nickname" &&
      !!id &&
      password == passwordCheck &&
      !!password &&
      !!t &&
      gender != -1
    )
      setIsActiveInfo(true);
    else if (
      type == "gender" &&
      !!id &&
      password == passwordCheck &&
      !!password &&
      !!nickname &&
      t != -1
    )
      setIsActiveInfo(true);
    else setIsActiveInfo(false);
  };
  return (
    <Container>
      <ScrollContainer ref={RefScroll}>
        <KeyboardContainer>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ContentContainer>
              <SectionContainer>
                <CheckboxContainer>
                  <Content>휴대폰 인증{isActivePhone ? ' 💌' : null}</Content>
                </CheckboxContainer>
                <PhoneVerification
                  setIsActivePhone={setIsActivePhone}
                  setFocusInput={setFocusInput}
                  setPhoneG={setPhoneG}
                  setPhoneCountryG={setPhoneCountryG}
                />
              </SectionContainer>
              <SectionContainer>
                <CheckboxContainer>
                  <Content>회원 정보 입력{isActiveInfo ? ' 🧸' : null}</Content>
                </CheckboxContainer>
                <FormContainer>
                  <FormDescription>닉네임</FormDescription>
                  <FormInput
                    ref={InputRefList[0]}
                    value={nickname}
                    onChangeText={(t) =>
                      checkIsActiveInfo(setNickname(t), t, "nickname")
                    }
                    autoCapitalize="none"
                    returnKeyType={"next"}
                    onSubmitEditing={() => setFocusInput(1)}
                  />
                </FormContainer>
                <FormContainer>
                  <FormDescription>아이디</FormDescription>
                  <FormInput
                    ref={InputRefList[1]}
                    value={id}
                    onChangeText={(t) => checkIsActiveInfo(setId(t), t, "id")}
                    autoCapitalize="none"
                    returnKeyType={"next"}
                    onSubmitEditing={() => setFocusInput(2)}
                  />
                </FormContainer>
                <FormContainer>
                  <FormDescription>비밀번호</FormDescription>
                  <FormInput
                    ref={InputRefList[2]}
                    value={password}
                    onChangeText={(t) =>
                      checkIsActiveInfo(setPassword(t), t, "password")
                    }
                    autoCapitalize="none"
                    textContentType="password"
                    returnKeyType={"next"}
                    onSubmitEditing={() => setFocusInput(3)}
                  />
                </FormContainer>
                <FormContainer>
                  <FormDescription>비밀번호 확인</FormDescription>
                  <FormInput
                    ref={InputRefList[3]}
                    value={passwordCheck}
                    onChangeText={(t) =>
                      checkIsActiveInfo(setPasswordCheck(t), t, "passwordCheck")
                    }
                    autoCapitalize="none"
                    textContentType="newPassword"
                    returnKeyType={"next"}
                    onSubmitEditing={() => setFocusInput(4)}
                  />
                </FormContainer>
                <FormContainer>
                  <FormDescription>성별</FormDescription>
                  <FormSelect>
                    <SelectItem
                      active={gender === 1}
                      onPress={() => {
                        checkIsActiveInfo(setGender(1), 1, "gender");
                        setFocusInput(5);
                      }}
                    >
                      <WhiteText>{gender === 1 ? '🎉 남자 🕺' : '남자'}</WhiteText>
                    </SelectItem>
                    <SelectItem
                      active={gender === 2}
                      onPress={() => {
                        checkIsActiveInfo(setGender(2), 2, "gender");
                        setFocusInput(5);
                      }}
                    >
                      <WhiteText>{gender === 2 ? '💃 여자 🎊' : '여자'}</WhiteText>
                    </SelectItem>
                  </FormSelect>
                </FormContainer>
                <FormContainer>
                  <FormDescription>이메일(선택)</FormDescription>
                  <FormInput
                    ref={InputRefList[5]}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType={"next"}
                    onSubmitEditing={() => setFocusInput(6)}
                  />
                </FormContainer>
                <FormContainer>
                  <FormDescription>주소(선택)</FormDescription>
                  <FormInput
                    ref={InputRefList[6]}
                    value={address}
                    onChangeText={setAddress}
                    autoCapitalize="none"
                    returnKeyType={"next"}
                    onSubmitEditing={() => setFocusInput(7)}
                  />
                </FormContainer>
              </SectionContainer>
              <SectionContainer>
                <CheckboxContainer>
                  <Content>학생증 인증 (온라인 학생증도 가능)</Content>
                </CheckboxContainer>
                <SimpleButton
                  isActive={true}
                  onPress={() => {
                    launchImageLibrary(
                      { mediaType: "photo", includeBase64: true },
                      (response) => {
                        if (response.base64) {
                          setFile(response.base64);
                          setFocusInput(8);
                        }
                      }
                    );
                  }}
                  clicked={Boolean(file)}
                >
                  {file ? "완료" : "학생증 사진 선택"}
                </SimpleButton>
                <ImageContainer
                  source={{ uri: `data:image/jpg;base64,${file}` }}
                />
                <FormContainer>
                  <FormDescription>이름(본명)</FormDescription>
                  <FormInput
                    ref={InputRefList[8]}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="none"
                    returnKeyType={"next"}
                    onSubmitEditing={() => setFocusInput(9)}
                  />
                </FormContainer>
                <FormContainer>
                  <FormDescription>학교</FormDescription>
                  <RNPickerSelect
                    style={{
                      inputAndroidContainer: PickerContainer,
                      inputIOSContainer: PickerContainer,
                      viewContainer: PickerViewContainer,
                      placeholder: PickerText,
                      inputAndroid: PickerText,
                    }}
                    onValueChange={(value) => setSchool(value)}
                    items={pickerItem}
                    value={school}
                    placeholder={{ label: "선택", value: "0" }}
                  />
                </FormContainer>
              </SectionContainer>
            </ContentContainer>
          </TouchableWithoutFeedback>
        </KeyboardContainer>
      </ScrollContainer>
      <BottomButton onPress={() => BottomButtonOnPress(navigate)}>
        가입 하기
      </BottomButton>
    </Container>
  );
};
const PickerText = css`
  color: black;
`;

const PickerViewContainer = css`
  flex: 2;
  border: 2px solid rgba(149, 149, 149, 0.09);
  border-radius: 8px;
  margin-bottom: 80px;
  margin-top: 12px;
`;

const PickerContainer = css`
  padding: 8px;
`;

const KeyboardContainer = styled(KeyboardAwareScrollView)`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const ScrollContainer: any = styled.ScrollView`
  padding: 0 20px;
  flex: 1;
`;

const ContentContainer = styled.View`
  flex: 1;
  margin: 36px 16px;
`;

const SectionContainer = styled.View`
  margin-bottom: 36px;
`;

const CheckboxContainer = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
  align-items: center;
`;

const Content = styled.Text`
  margin-left: 8px;
`;

const FormContainer = styled.View`
  margin-bottom: 14px;
`;

const FormDescription = styled.Text`
  color: #7d849b;
  font-size: 11px;
`;

const FormInput = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: #e5e5e8;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 15px;
`;

const FormSelect = styled.View`
  flex-direction: row;
  margin-top: 16px;
  justify-content: center;
`;

const SelectItem = styled.TouchableOpacity<{ active: boolean }>`
  background-color: ${({ active }) => (active ? "#579FEE" : "#cbced7")};
  padding: 4px 36px;
  border-radius: 19px;
  margin-right: 8px;
`;

const ImageContainer = styled.Image`
  margin-top: 12px;
  margin-bottom: 16px;
  width: 300px;
  height: 500px;
  justify-content: center;
  align-self: center;
`;

const WhiteText = styled.Text`
  color: white;
`;
