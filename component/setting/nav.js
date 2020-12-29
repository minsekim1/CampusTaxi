import React, { Component } from "react";
import { View, Text, ScrollView, Linking, StyleSheet, SectionList, FlatList } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
const s = createStackNavigator();
import { Button, ThemeProvider, ListItem, Divider } from "react-native-elements";
//약관 TXT import
import { text1, text2, text3, text4 } from "./policy.js";
import { TextInput } from "react-native";
import { Picker } from "@react-native-community/picker";
import { userStore } from "../store/store";
import Constants from "expo-constants";

function HomeScreen({ navigation }) {
  // {
  //   type: "text",
  //   title: "알림 설정",
  //   navigation: "알림 설정",
  // },
  const { setUser, setId, setPw } = React.useContext(CustomContext);
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
      type: "button",
      title: "로그아웃",
      ft_function: () => {
        userStore.logout();
        setUser(null); setId(null); setPw(null);
        navigation.navigate("SignIn")
        alert("로그아웃 되었습니다.");
      }
    },
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
    <FlatList
      data={list}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) =>
        <ListItem onPress={(item.type == "text") ? () => navigation.navigate({ name: item.navigation }) : (item.type == "button") ? item.ft_function : null}>
          <Text style={item.type === "title" ? styles.title : styles.text}>{item.title}</Text>
        </ListItem>
      }
    >
    </FlatList >
  );
}
//내 정보: 회원정보 수정페이지
function clientChangePage({ navigation: { goBack } }) {
  const [clientName, onChangeName] = useState(userStore.user.name);
  const [clientNickName, onChangeNickName] = useState(userStore.user.nickname);
  const [email, setEmail] = useState(userStore.user.joindatemail);
  const [isVaildNickName, setVaildNickName] = useState(1);
  let NickNameColor = {
    1: "blue",
    2: "#F83C3C", //red
    3: "#27BE5E", //green
  }[isVaildNickName];
  const [clientGender, setChangeGender] = useState(userStore.user.gender);
  const [clientCert, onChangeCert] = useState("완료");

  //수정완료 버튼 REST API updateUser
  // async function submit(userkey, email, gender, name, nickname) {
  //   if (isVaildNickName == 1 || isVaildNickName == 3) {
  //     await userStore.changeUserAll(userkey, email, gender, name, nickname);
  //     goBack();
  //   } else {
  //     alert("이미 있는 닉네임입니다. 다른 닉네임을 골라주세요.");
  //   }
  // }

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
            {userStore.user.nickname}
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
          <Text style={{ fontSize: 18, color: "gray" }}>
            {userStore.user.joindate}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
            아이디
          </Text>
          <Text style={{ marginBottom: 10 }}>{userStore.user.loginid}</Text>
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
              userStore.user.userStatus == 1
                ? { marginBottom: 10, color: "#27BE5E" }
                : { marginBottom: 10, color: "#F83C3C" }
            }
          >
            {userStore.user.userStatus == 1 ? "완료" : "인증처리중"}
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
class clientpage extends React.Component {
  studentText() {
    let status = userStore.user.get('userStatus');
    switch (status) {
      case 0:
        return (
          <Text style={{ marginBottom: 10, color: "#F83C3C" }}>
            미인증
          </Text>
        );
      case 1:
        return (
          <Text style={{ marginBottom: 10, color: "#27BE5E" }}>
            인증완료
          </Text>
        );
      case 2:
        return (
          <Text style={{ marginBottom: 10, color: "#F83C3C" }}>
            인증거부-문의필요
          </Text>
        );
      default:
        return (
          <Text style={{ marginBottom: 10, color: "#F83C3C" }}>
            {status}까지 정지
          </Text>
        );
    }
  }


  render() {
    const { navigation } = this.props;
    function f1() {
      console.log(userStore.user.get('name'));
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
        <Text style={{ marginBottom: 20, padding: 10, fontSize: 24 }}>
          계정
        </Text>
        <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
          이름
        </Text>
        <Text style={{ marginBottom: 10 }}>{userStore.user.get('name')}</Text>
        <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
              학교
            </Text>
            <Text style={{ marginBottom: 10 }}>{userStore.user.get('univ')}</Text>
          </View>
        </View>
        <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />
        <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
          닉네임
        </Text>
        <Text style={{ marginBottom: 10 }}>{userStore.user.get('nickname')}</Text>
        <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
              성별
            </Text>
            <Text style={{ marginBottom: 10 }}>
              {userStore.user.get('gender') == 0 ? "남자" : "여자"}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
              최초가입일
            </Text>
            <Text style={{ marginBottom: 10 }}>
              {userStore.tokoreanTime(String(userStore.user.get('createdAt')))}
            </Text>
          </View>
        </View>
        <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
              아이디
            </Text>
            <Text style={{ marginBottom: 10 }}>{userStore.user.get('username')}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
              이메일
            </Text>
            <Text style={{ marginBottom: 10, fontSize: 11 }}>
              {userStore.user.get('email')}
            </Text>
          </View>
        </View>

        <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />
        <Text style={{ marginBottom: 3, fontSize: 11, color: "#7D849B" }}>
          학생증인증
        </Text>
        <View>
          {this.studentText()}
        </View>

        <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <Button
            style={{ borderRadius: 100 }}
            containerStyle={{ borderRadius: 100 }}
            buttonStyle={{ backgroundColor: "gray", width: 189 }} //172864
            title="회원정보 수정(현재 미지원)"
            onPress={() => { }} //navigation.navigate("회원정보 수정")
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
      <Text>{Constants.platform == 'ios' ? Constants.manifest.ios.buildNumber : Constants.manifest.android.versionCode}</Text>
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

import SendEmail from "./EmailComposer";
import { useState } from "react";
import { CustomContext } from "../store/context.js";
function clientpageQuestion({ navigation: { goBack } }) {
  const [email_title, setemail_title] = useState(
    "제목: 아이디/닉네임/문의사항요약"
  );
  const [email_body, setemail_body] = useState(
    "양식에 맞추어 이메일을 보내주세요.\n  \n 내용: 아이디 닉네임 문의사항 표기"
  );

  function GO_SendFunction() {
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
        {GO_SendFunction()}
        {goBack()}
      </View>
    </View>
  );
}

function setting() {
  return (
    <s.Navigator
      initialRouteName="설정"
      initialRouteName="Login"
      screenOptions={{
        backgroundColor: "white",
        headerShown: true,
        cardStyle: { backgroundColor: "white" },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: "clamp",
            }),
          },
        }),
      }}
      mode="modal"
    >
      <s.Screen
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
      <s.Screen
        options={navOptions}
        name="내 정보"
        component={clientpage}
      />
      <s.Screen
        options={navOptions}
        name="알림 설정"
        component={clientpageAlram}
      />
      <s.Screen
        options={navOptions}
        name="앱 버전"
        component={clientpageAppvesion}
      />
      <s.Screen
        options={navOptions}
        name="문의하기"
        component={clientpageQuestion}
      />
      <s.Screen
        options={navOptions}
        name="개인정보처리방침"
        component={clientpagePolicy1}
      />
      <s.Screen
        options={navOptions}
        name="위치정보 이용약관"
        component={clientpagePolicy2}
      />
      <s.Screen
        options={navOptions}
        name="서비스 이용약관"
        component={clientpagePolicy3}
      />
      <s.Screen
        options={navOptions}
        name="마케팅 정보 수신"
        component={clientpagePolicy4}
      />
      <s.Screen
        options={navOptions}
        name="회원정보 수정"
        component={clientChangePage}
      />
    </s.Navigator>
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

export default setting;
