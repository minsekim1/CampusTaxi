import React, { Component } from "react";
import { View, Text, ScrollView, Linking, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

//UI
import { Button, ThemeProvider } from "react-native-elements";
import { ListItem, Divider } from "react-native-elements";

//약관 TXT import
import { text1, text2, text3, text4 } from "./policy.js";
import MyText from "../Components/MyText";
import MyButton from "../Components/MyButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInput, Picker } from "react-native";

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
      type: "title",
      title: "앱 설정",
    },
    {
      type: "text",
      title: "알림 설정",
      navigation: "알림 설정",
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
    <>
      <ScrollView>
        {list.map((item, i) =>
          (function () {
            if (item.type === "text")
              return (
                <>
                  <ListItem
                    key={i}
                    title={<Text style={styles.text}>{item.title}</Text>}
                    onPress={() =>
                      navigation.navigate({ name: item.navigation })
                    }
                    chevron
                  />
                </>
              );
            if (item.type === "title")
              return (
                <ListItem
                  key={i}
                  title={<Text style={styles.title}>{item.title}</Text>}
                />
              );
          })()
        )}
      </ScrollView>
    </>
  );
}
//내 정보: 회원정보 수정페이지
function clientChangePage({ navigation: { goBack } }) {
  const originName = "윤수정"; //원래이름
  const [clientName, onChangeName] = React.useState(originName);
  const originNickName = "DoyouLife"; //원래닉네임
  const [clientNickName, onChangeNickName] = React.useState(originNickName);
  const [isVaildNickName, setVaildNickName] = React.useState(1); //1=수정가능 2=사용불가능 3=적용가능
  let NickNameColor = {
    1: "blue",
    2: "#F83C3C", //red
    3: "#27BE5E", //green
  }[isVaildNickName];
  const originGender = "여자";
  const [clientGender, setChangeGender] = React.useState(originGender);
  const [clientCert, onChangeCert] = React.useState("완료");

  //수정완료 버튼
  function submit() {
    goBack();
  }
  //샘플 아이디 데이터
  const SampleIdList = ["Mins", "준상"];
  function changeNickName(changedNickName) {
    let differ = true;
    //DB에 이미 있는 닉네임인지 확인하기
    SampleIdList.map((name, i) => {
      if (changedNickName == name || changedNickName == "") {
        //이미 있을경우
        setVaildNickName(2);
        differ = false;
      }
      if (changedNickName == originNickName) {
        //원래 아이디와 같을 경우
        setVaildNickName(1);
        differ = false;
      }
    });
    if (differ) {
      //없을경우
      setVaildNickName(3);
    }
    onChangeNickName(changedNickName);
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
      <MyText marginBottom={20} style={{ padding: 10 }} type="h1" text="계정" />
      <MyText marginBottom={3} type="subtitle" text="이름" />
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
          <MyText marginBottom={3} type="subtitle" text="학교" />
          <MyText marginBottom={10} text="삼육대학교" color="gray" />
        </View>
        <View style={{ flex: 1 }}>
          <MyText marginBottom={3} type="subtitle" text="학과" />
          <MyText marginBottom={10} text="컴퓨터메카트로..." color="gray" />
        </View>
      </View>
      {/* 닉네임 */}
      <Text style={{ marginBottom: 15, color: "#F83C3C", fontSize: 11 }}>
        ※ 학교 및 학과 변경은 학생증 재인증을 통해서만 가능합니다.
      </Text>
      <MyText marginBottom={3} type="subtitle" text="닉네임" />
      <TextInput
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
      />
      <Text style={{ marginBottom: 15, color: NickNameColor, fontSize: 11 }}>
        {
          {
            1: "수정 가능합니다.",
            2: "이미 있거나 불가능한 닉네임입니다.",
            3: "사용가능한 닉네임입니다.",
          }[isVaildNickName]
        }
      </Text>
      {/* 성별&최초가입일 */}
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <MyText marginBottom={3} type="subtitle" text="성별" />
          <Picker
            selectedValue={clientGender}
            onValueChange={(itemValue, itemIndex) => setChangeGender(itemValue)}
          >
            <Picker.Item label="여자" value="여자" />
            <Picker.Item label="남자" value="남자" />
          </Picker>
          <Divider
            style={{
              borderColor: originGender == clientGender ? "blue" : "#27BE5E",
              borderBottomWidth: 2,
            }}
          />
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
          <MyText type="subtitle" text="최초가입일" />
          <Text style={{ fontSize: 18, marginTop: 16, color: "gray" }}>
            2020년 06월 08일
          </Text>
        </View>
      </View>
      {/* 아이디 */}
      <MyText marginBottom={3} type="subtitle" text="이메일(아이디)" />
      <MyText marginBottom={10} text="campusTaxi@naver.com" />
      <Text style={{ marginBottom: 15, color: "#F83C3C", fontSize: 11 }}>
        ※ 아이디 변경은 탈퇴후 재가입 바랍니다.
      </Text>
      <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />
      {/* 학생증 인증 */}
      <MyText marginBottom={3} type="subtitle" text="학생증 인증" />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 3 }}>
          <MyText marginBottom={10} text="완료" color="#27BE5E" />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            containerStyle={{ borderRadius: 100 }}
            titleStyle={{ fontSize: 10, fontWeight: "100" }}
            buttonStyle={{ backgroundColor: "#F83C3C", height: 17 }}
            title="학생증 재인증"
          ></Button>
          {/* <Input type="file" name="file" onChange={null}/> */}
        </View>
      </View>
      <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />

      {/* 수정 완료 버튼 */}
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Button
          containerStyle={{ borderRadius: 100 }}
          buttonStyle={{ backgroundColor: "#172864", width: 189 }}
          onPress={() => submit()}
          title="수정 완료"
        />
      </View>
    </ScrollView>
  );
}
//내 정보 페이지
function clientpage({ navigation }) {
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
      <MyText marginBottom={20} style={{ padding: 10 }} type="h1" text="계정" />
      <MyText marginBottom={3} type="subtitle" text="이름" />
      <MyText marginBottom={10} text="윤수정" />
      <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <MyText marginBottom={3} type="subtitle" text="학교" />
          <MyText marginBottom={10} text="삼육대학교" />
        </View>
        <View style={{ flex: 1 }}>
          <MyText marginBottom={3} type="subtitle" text="학과" />
          <MyText marginBottom={10} text="컴퓨터메카트로..." />
        </View>
      </View>
      <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />
      <MyText marginBottom={3} type="subtitle" text="닉네임" />
      <MyText marginBottom={10} text="두유인생" />
      <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <MyText marginBottom={3} type="subtitle" text="성별" />
          <MyText marginBottom={10} text="여자" />
        </View>
        <View style={{ flex: 1 }}>
          <MyText marginBottom={3} type="subtitle" text="최초가입일" />
          <MyText marginBottom={10} text="2020년 06월 08일" />
        </View>
      </View>
      <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />
      <MyText marginBottom={3} type="subtitle" text="이메일(아이디)" />
      <MyText marginBottom={10} text="campusTaxi@naver.com" />
      <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />
      <MyText marginBottom={3} type="subtitle" text="학생증 인증" />
      <MyText marginBottom={10} text="완료" color="#27BE5E" />
      <Divider style={{ marginBottom: 20, backgroundColor: "#D2D2D2" }} />

      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Button
          style={{ borderRadius: 100 }}
          containerStyle={{ borderRadius: 100 }}
          buttonStyle={{ backgroundColor: "#172864", width: 189 }}
          title="회원정보 수정"
          onPress={() => navigation.navigate("회원정보 수정")}
        />
      </View>
    </ScrollView>
  );
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
      <Text>Details Screen</Text>
    </View>
  );
}
function clientpagePolicy1() {
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
function clientpagePolicy2() {
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
function clientpagePolicy3() {
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
function clientpagePolicy4() {
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
function clientpageQuestion() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Details Screen</Text>
    </View>
  );
}
function SettingScreen() {
  return (
    <Stack.Navigator initialRouteName="설정">
      <Stack.Screen options={navOptions} name="설정" component={HomeScreen} />
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
