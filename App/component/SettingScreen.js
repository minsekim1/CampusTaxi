import React, { Component } from "react";
import { View, Text, ScrollView, Linking, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
//UI
import { Button, ThemeProvider } from "react-native-elements";
import { ListItem, Divider } from "react-native-elements";
//약관 TXT import
import { text1, text2, text3, text4 } from "../constant/policy.js";
import { TextInput } from "react-native";
import { Picker } from "@react-native-community/picker";
import { bbsStore, userStore, anotherStore } from "store";
import Constants from "expo-constants";
function HomeScreen({ navigation }) {
  const list = [
    {
      type: "title",
      title: "계정",
    },
    {
      type: "text",
      title: "내 정보",
      navigation: "내 정보",
    },
    {
      type: "text",
      title: "로그아웃",
      navigation: "로그아웃",
    },
    // {
    //   type: "title",
    //   title: "로그아웃",
    // },
    // {
    //   type: "text",
    //   title: "알림 설정",
    //   navigation: "알림 설정",
    // },
    {
      type: "title",
      title: "앱 정보",
    },
    {
      type: "text",
      title: "앱 버전",
      navigation: "앱 버전",
    },
    {
      type: "text",
      title: "문의하기",
      navigation: "문의하기",
    },
    {
      type: "title",
      title: "이용 규칙",
    },
    {
      type: "text",
      title: "개인정보처리방침",
      navigation: "개인정보처리방침",
    },
    {
      type: "text",
      title: "위치정보 이용약관",
      navigation: "위치정보 이용약관",
    },
    {
      type: "text",
      title: "서비스 이용약관",
      navigation: "서비스 이용약관",
    },
    {
      type: "text",
      title: "마케팅 정보 수신",
      navigation: "마케팅 정보 수신",
    },
  ];

  return (
    <ScrollView>
      {list.map((item, i) =>
        (function () {
          return (
            <ListItem
              keyExtractor={(item) => item.id}
              key={i}
              title={
                <Text style={item.type === "text" ? styles.text : styles.title}>
                  {item.title}
                </Text>
              }
              onPress={() => navigation.navigate({ name: item.navigation })} //styles.title item.type === "text" item.type === "title"
              chevron
            />
          );
        })()
      )}
    </ScrollView>
  );
}
//내 정보: 회원정보 수정페이지
function clientChangePage({ navigation: { goBack } }) {
  userStore.asyncUser();
  const originName = userStore.user.h; //원래이름
  const [clientName, onChangeName] = useState(originName);
  const originNickName = userStore.user.i; //원래닉네임
  const [clientNickName, onChangeNickName] = useState(userStore.user.i);
  const [email, setEmail] = useState(userStore.user.b);
  const [isVaildNickName, setVaildNickName] = useState(1); //1=수정가능 2=사용불가능 3=적용가능
  let NickNameColor = {
    1: "blue",
    2: "#F83C3C", //red
    3: "#27BE5E", //green
  }[isVaildNickName];
  const originGender = userStore.user.d;
  const [clientGender, setChangeGender] = useState(userStore.user.d);
  const [clientCert, onChangeCert] = useState("완료");

  //수정완료 버튼
  async function submit(userkey, email, gender, name, nickname) {
    if (isVaildNickName == 1 || isVaildNickName == 3) {
      await userStore.changeUserAll(userkey, email, gender, name, nickname);
      goBack();
    } else {
      alert("이미 있는 닉네임입니다. 다른 닉네임을 골라주세요.");
    }
  }
  //샘플 아이디 데이터
  function changeNickName(changedNickName) {
    onChangeNickName(changedNickName);
    //DB에 이미 있는 닉네임인지 확인하기
    if (changedNickName != userStore.user.i) {
      userStore.findUserByAttributes("i", changedNickName).then((result) => {
        if (result) {
          setVaildNickName(2);
        } else {
          setVaildNickName(3);
        }
      });
    } else {
      setVaildNickName(1);
    }
  }
  return (
    <ScrollView
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "white",
      }}
    >
      {/* 이름 */}
      <Text style={{ marginBottom: 20, padding: 10, fontSize: 24 }}>계정</Text>
      <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
        이름
      </Text>
      <TextInput
        placeholder="이름없음"
        style={{
          fontSize: 18,
          padding: 0,
          paddingBottom: 5,
          margin: 0,
          borderColor: originName == clientName ? "blue" : "#27BE5E",
          borderBottomWidth: 2,
        }}
        onChangeText={(text) => onChangeName(text)}
        value={clientName}
      />
      <Text
        style={{
          marginBottom: 15,
          color: originName == clientName ? "blue" : "#27BE5E",
          fontSize: 11,
        }}
      >
        {originName == clientName ? "수정 가능합니다." : "적용 가능합니다."}
      </Text>
      {/* 학교/학과 */}
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
            학교
          </Text>
          <Text style={{ marginBottom: 10, color: "gray" }}>
            {userStore.user.l}
          </Text>
        </View>
      </View>
      {/* 닉네임 */}
      <Text style={{ marginBottom: 15, color: "#F83C3C", fontSize: 11 }}>
        ※ 학교 및 학과 변경은 학생증 재인증을 통해서만 가능합니다.
      </Text>
      <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
        닉네임
      </Text>
      <Text style={{ marginBottom: 10, color: "gray" }}>{clientNickName}</Text>
      {/* <TextInput
        placeholder="사용할 닉네임을 입력해주세요."
        style={{
          fontSize: 18,
          padding: 0,
          paddingBottom: 5,
          margin: 0,
          borderColor: NickNameColor,
          borderBottomWidth: 2,
        }}
        onChangeText={(text) => changeNickName(text)}
        value={clientNickName}
      /> */}
      <Text
        style={{
          marginBottom: 15,
          color: "#F83C3C",
          // NickNameColor
          fontSize: 11,
        }}
      >
        {
          {
            1: "현재 닉네임 변경은 불가능합니다.",
            // 2: "이미 있거나 불가능한 닉네임입니다.",
            // 3: "사용가능한 닉네임입니다.",
          }[isVaildNickName]
        }
      </Text>
      {/* 성별&최초가입일 */}
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
            성별
          </Text>
          <Picker
            selectedValue={clientGender}
            onValueChange={(val, index) => setChangeGender(val)}
          >
            <Picker.Item label="여자" value="1" />
            <Picker.Item label="남자" value="0" />
          </Picker>

          <Text
            style={{
              marginBottom: 15,
              color: originGender == clientGender ? "blue" : "#27BE5E",
              fontSize: 11,
            }}
          >
            {originGender == clientGender
              ? "변경 가능합니다."
              : "적용 가능합니다"}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
            최초가입일
          </Text>
          <Text style={{ fontSize: 18, fontSize: 11, color: "gray" }}>
            {anotherStore.toLocal(userStore.user.e)}
          </Text>
        </View>
      </View>
      {/* 아이디 */}

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
            아이디
          </Text>
          <Text style={{ marginBottom: 10 }}>{userStore.user.f}</Text>
          <Text style={{ marginBottom: 15, color: "#F83C3C", fontSize: 11 }}>
            ※ 아이디 변경은 탈퇴후 재가입 바랍니다.
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
            이메일
          </Text>
          <TextInput
            placeholder="사용할 이메일을 입력해주세요."
            style={{
              fontSize: 18,
              padding: 0,
              paddingBottom: 5,
              margin: 0,
              borderBottomWidth: 2,
              fontSize: 11,
            }}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
      </View>

      <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />
      {/* 학생증 인증 */}
      <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
        학생증인증
      </Text>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 3 }}>
          <Text
            style={
              userStore.user.n == 1
                ? { marginBottom: 10, color: "#27BE5E" }
                : { marginBottom: 10, color: "#F83C3C" }
            }
          >
            {userStore.user.n == 1 ? "완료" : "인증처리중"}
          </Text>
        </View>
        {/* <View style={{ flex: 1 }}>
          <Button
            containerStyle={{ borderRadius: 100 }}
            titleStyle={{ fontSize: 10, fontWeight: "100" }}
            buttonStyle={{
              backgroundColor: "#F83C3C",
              minHeight: 21,
            }}
            title="학생증 재인증"
          ></Button>
          <Input type="file" name="file" onChange={null}/>
        </View> */}
      </View>
      <Divider
        style={{ marginTop: 20, marginBottom: 20, backgroundColor: "#D2D2D2" }}
      />

      {/* 수정 완료 버튼 */}
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Button
          containerStyle={{ borderRadius: 100 }}
          buttonStyle={{ backgroundColor: "#172864", width: 189 }}
          onPress={() =>
            submit(
              userStore.userkey,
              email,
              clientGender,
              clientName,
              clientNickName
            )
          }
          title="수정 완료"
        />
      </View>
    </ScrollView>
  );
}
//내 정보 페이지
import { Observer, useLocalStore } from "mobx-react";
class clientpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: userStore.user.h,
      univ: userStore.user.l,
      nickname: userStore.user.i,
      gender: userStore.user.d,
      firstDate: userStore.user.e,
      id: userStore.user.f,
      email: userStore.user.b,
      auth: userStore.user.n,
    };
  }
  render() {
    userStore.asyncUser();
    const { navigation } = this.props;
    return (
      <ScrollView
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 20,
          paddingBottom: 20,
          backgroundColor: "white",
        }}
      >
        <Text style={{ marginBottom: 20, padding: 10, fontSize: 24 }}>
          계정
        </Text>
        <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
          이름
        </Text>

        <Observer>
          {() => <Text style={{ marginBottom: 10 }}>{userStore.user.h}</Text>}
        </Observer>

        <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
              학교
            </Text>
            <Observer>
              {() => (
                <Text style={{ marginBottom: 10 }}>{userStore.user.l}</Text>
              )}
            </Observer>
          </View>
        </View>
        <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />
        <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
          닉네임
        </Text>
        <Observer>
          {() => <Text style={{ marginBottom: 10 }}>{userStore.user.i}</Text>}
        </Observer>
        <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
              성별
            </Text>
            <Observer>
              {() => (
                <Text style={{ marginBottom: 10 }}>
                  {userStore.user.d == 0 ? "남자" : "여자"}
                </Text>
              )}
            </Observer>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
              최초가입일
            </Text>
            <Observer>
              {() => (
                <Text style={{ marginBottom: 10 }}>
                  {anotherStore.toLocal(userStore.user.e)}
                </Text>
              )}
            </Observer>
          </View>
        </View>
        <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
              아이디
            </Text>
            <Observer>
              {() => (
                <Text style={{ marginBottom: 10 }}>{userStore.userkey}</Text>
              )}
            </Observer>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
              이메일
            </Text>
            <Observer>
              {() => (
                <Text style={{ marginBottom: 10, fontSize: 11 }}>
                  {userStore.user.b}
                </Text>
              )}
            </Observer>
          </View>
        </View>

        <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />
        <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
          학생증인증
        </Text>
        <Observer>
          {() => {
            let status = userStore.user.n;
            switch (status) {
              case 0:
                return (
                  <Text style={{ marginBottom: 10, color: "#F83C3C" }}>
                    미인증
                  </Text>
                );
                break;
              case 1:
                return (
                  <Text style={{ marginBottom: 10, color: "#27BE5E" }}>
                    인증완료
                  </Text>
                );
                break;
              case 2:
                return (
                  <Text style={{ marginBottom: 10, color: "#F83C3C" }}>
                    인증거부-문의필요
                  </Text>
                );
                break;
              default:
                return (
                  <Text style={{ marginBottom: 10, color: "#F83C3C" }}>
                    {status}까지 정지
                  </Text>
                );

                break;
            }
          }}
        </Observer>

        <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <Button
            style={{ borderRadius: 100 }}
            containerStyle={{ borderRadius: 100 }}
            buttonStyle={{ backgroundColor: "gray", width: 189 }} //172864
            title="회원정보 수정(현재 미지원)"
            onPress={() => {}} //navigation.navigate("회원정보 수정")
          />
        </View>
      </ScrollView>
    );
  }
}

function clientpageAlram() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Details Scrㄴㄴeen</Text>
    </View>
  );
}

function clientpageAppvesion() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>{Constants.nativeAppVersion}</Text>
    </View>
  );
}
export function clientpagePolicy1() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScrollView style={{ margin: 15 }}>
        <Text>{text1}</Text>
      </ScrollView>
    </View>
  );
}
export function clientpagePolicy2() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScrollView style={{ margin: 15 }}>
        <Text>{text2}</Text>
      </ScrollView>
    </View>
  );
}
export function clientpagePolicy3() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScrollView style={{ margin: 15 }}>
        <Text>{text3}</Text>
      </ScrollView>
    </View>
  );
}
export function clientpagePolicy4() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScrollView style={{ margin: 15 }}>
        <Text>{text4}</Text>
      </ScrollView>
    </View>
  );
}

import SendEmail from "./Email/EmailComposer";
import { useState } from "react";

function clientpageQuestion() {
  const [email_title, setemail_title] = useState(
    "제목: 아이디/닉네임/문의사항요약"
  );
  const [email_body, setemail_body] = useState(
    "양식에 맞추어 이메일을 보내주세요.\n  \n 내용: 아이디 닉네임 문의사항 표기"
  );

  function GO_SendFunction() {
    //let email_body = document.getElementsByName("body").value;
    //let email_title = document.getElementsByName("title").value;

    SendEmail(email_title, email_body);
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View>
        <Button title="문의 하기" onPress={GO_SendFunction} />
      </View>
    </View>
  );
}
function logout() {
  userStore.logout();
  alert("로그아웃 되었습니다.");
  return <View></View>;
}
function SettingScreen() {
  return (
    <Stack.Navigator initialRouteName="설정">
      <Stack.Screen
        options={{
          headerLeft: null,
          headerStyle: {
            backgroundColor: "#0D3664",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
        name="설정"
        component={HomeScreen}
      />
      <Stack.Screen
        options={navOptions}
        name="내 정보"
        component={clientpage}
      />
      <Stack.Screen
        options={navOptions}
        name="알림 설정"
        component={clientpageAlram}
      />
      <Stack.Screen
        options={navOptions}
        name="앱 버전"
        component={clientpageAppvesion}
      />
      <Stack.Screen
        options={navOptions}
        name="문의하기"
        component={clientpageQuestion}
      />
      <Stack.Screen
        options={navOptions}
        name="개인정보처리방침"
        component={clientpagePolicy1}
      />
      <Stack.Screen
        options={navOptions}
        name="위치정보 이용약관"
        component={clientpagePolicy2}
      />
      <Stack.Screen
        options={navOptions}
        name="서비스 이용약관"
        component={clientpagePolicy3}
      />
      <Stack.Screen
        options={navOptions}
        name="마케팅 정보 수신"
        component={clientpagePolicy4}
      />
      <Stack.Screen
        options={navOptions}
        name="회원정보 수정"
        component={clientChangePage}
      />
      <Stack.Screen options={navOptions} name="로그아웃" component={logout} />
    </Stack.Navigator>
  );
}
const navOptions = {
  headerStyle: {
    backgroundColor: "#0D3664",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerTitleAlign: "center",
};
const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey",
  },
  text: {
    //'설정' 텍스트
    fontSize: 15,
  },
  title: {
    //설정 제목
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SettingScreen;
