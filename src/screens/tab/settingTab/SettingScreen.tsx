import styled from "@emotion/native";
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  BackHandler,
  Platform,
  SafeAreaView,
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from "react-native";
import { EmailSend } from "../../../components/chat-room/EmailSend";
import { RightIcon } from "../../../components/icon/RightIcon";
import { BlankBackground } from "../../../components/layout/BlankBackground";
import { showToast } from "../../../components/layout/Toast";
import { useAuthContext } from "../../../contexts/AuthContext";
import { SettingStackParamList } from "./SettingStackNavigation";
import { CustomAxios } from "../../../components/axios/axios";
import { API_URL, socketURL, premiumURL } from "../../../constant";
import { User } from "../../../contexts/User";
import { PlusIcon } from "../../../components/icon/setting/PlusIcon";
import { DefaultIcon } from "../../../components/icon/setting/DefaultIcon";
import axios from "axios";

import {
  PurchaseGoogle,
  getSubscriptions,
  getAvailablePurchases,
  requestSubscription,
} from "../premiumTab/RNIapFunction";
import { TouchableOpacity } from "react-native-gesture-handler";

type SettingScreenNavigationProp = StackNavigationProp<
  SettingStackParamList,
  "SettingScreen"
>;

type Props = {
  navigation: SettingScreenNavigationProp;
};

export const SettingScreen: React.FC<Props> = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // region 프리미엄인지 아닌지 페이지 바뀔 때마다 확인
  const { setLoggedOut, getPremium, setNavName } = useAuthContext();
  const [isPremium, setIsPremium] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused)
      getPremium().then((isP) => {
        setIsPremium(isP);
        if (!!user?.email) GetMyProfile(user?.email);
      });
  }, [isFocused]);
  useFocusEffect(() => {
    getAvailablePurchases();
  });
  // #endgion 프리미엄인지 아닌지 페이지 바뀔 때마다 확인

  //프로필 화면을 위해 데이터를 요청
  const { token, resetToken, refresh } = useAuthContext();
  const [user, setUser] = useState<User>();
  const [myprofilepath, setMyprofilepath] = useState<string>("default");

  const GetProfileIconList: React.FC<{
    email?: string;
    iconPath?: string;
    iconName?: string;
  }> = ({ email,iconPath, iconName }) => {
    if (!iconPath) return <></>;
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            height: 70,
            width: 70,
          }}
          onPress={() => {
            if (isPremium === true && email) {
              setMyprofilepath(iconPath);
              UpdateMyProfile(email,iconPath)
              setModalVisible(!modalVisible);
            }
          }}
        >
          <Image
            style={{
              height: 70,
              width: 70,
              position: "absolute",
              opacity: isPremium === true ? 1 : 0.3,
            }}
            source={{
              uri:
                "https://s3.ap-northeast-2.amazonaws.com/api.campustaxi.net/profile_icon/" +
                iconPath +
                ".png",
            }}
          />
        </Pressable>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#E8E9F2",
            width: 40,
            borderRadius: 20,
          }}
        >
          <Text>{iconName}</Text>
        </View>
      </View>
    );
  };


  const UpdateMyProfile = (email: string, imagepath: string) => {
    axios
      .post(`${premiumURL}updateProfileIcon`, {
        email: email,
        imagepath: imagepath,
      })
      .then((response) => {console.log(response)})
      .catch((error) => {
        console.log(error);
      });
  };

  const GetMyProfile = (email: string) => {
    axios
      .post(`${premiumURL}getProfileIcon`, {
        email: email,
      })
      .then((dbProfilepath) => {
        try {
          if (
            dbProfilepath.data[0].imagepath !== null &&
            dbProfilepath.data[0].imagepath != undefined
          )
            setMyprofilepath(dbProfilepath.data[0].imagepath);
        } catch {
          (err: any) => {
            console.log("ERROR GetMyProfile", err);
          };
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    CustomAxios(
      "GET",
      `${API_URL}/v1/accounts/me/`,
      resetToken,
      refresh,
      token,
      undefined, //"User API",
      undefined,
      (d: User) => {
        setUser(d);
        GetMyProfile(d.email);
      }
    );
  }, []);

  const navigation = useNavigation<SettingScreenNavigationProp>();
  //#region 뒤로가기 버튼 제어 & 더블클릭시 앱 종료
  let currentCount = 0;
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
      //console.log("focus MainScreen");
    });
    navigation.addListener("blur", () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
      //console.log("blur MainScreen");
    });
  }, []);
  const handleBackButton = () => {
    if (currentCount < 1) {
      currentCount += 1;
      if (Platform.OS === "android") {
        showToast(
          "뒤로 가기를 한번 더 누르면 앱이 종료됩니다.\n로그아웃은 설정->로그아웃으로 가주세요."
        );
      } else {
        BackHandler.exitApp();
      }
      setTimeout(() => {
        currentCount = 0;
      }, 2000);
      return true;
    }
  };
  //#endregion 뒤로가기 버튼 제어 & 더블클릭시 앱 종료
  return (
    <BlankBackground color="#fff">
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <OuterTouchableView onPress={() => setModalVisible(!modalVisible)} />
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    style={{
                      height: 70,
                      width: 70,
                    }}
                    onPress={() => {
                      setMyprofilepath("default");
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <DefaultIcon />
                  </Pressable>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#E8E9F2",
                      width: 40,
                      borderRadius: 20,
                    }}
                  >
                    <Text>기본</Text>
                  </View>
                </View>
                <GetProfileIconList email={user?.email}iconPath="profile_icon0" iconName="무무" />
                <GetProfileIconList email={user?.email} iconPath="profile_icon1" iconName="교수" />
                <GetProfileIconList email={user?.email} iconPath="profile_icon2" iconName="로치" />
              </View>
              <View style={{ flexDirection: "row" }}>
                <GetProfileIconList email={user?.email} iconPath="profile_icon3" iconName="샤코" />
                <GetProfileIconList email={user?.email} iconPath="profile_icon4" iconName="비아" />
                <GetProfileIconList email={user?.email} iconPath="profile_icon5" iconName="타코" />
                <GetProfileIconList email={user?.email} iconPath="profile_icon6" iconName="유미" />
              </View>
            </View>
          </View>
        </Modal>
        <Container>
          {
            //상단 프로필
          }
          <ProfileContainer>
            {isPremium === true ? (
              <ProfileImage
                source={{
                  uri:
                    "https://s3.ap-northeast-2.amazonaws.com/api.campustaxi.net/profile_icon/" +
                    myprofilepath +
                    ".png",
                }}
              />
            ) : (
              <DefaultIcon />
            )}
            <PlusButton onPress={() => setModalVisible(true)}>
              <PlusIcon />
            </PlusButton>
            <ProfileTextContainer>
              <NicknameText>{user?.nickname}</NicknameText>
              <CampusNameText>{user?.campus_name}</CampusNameText>
              <EmailTextBackView>
                <EmailText>{user?.email}</EmailText>
              </EmailTextBackView>
              <MembershipGroupText
                style={{ color: isPremium == true ? "#00567C" : "#000000" }}
              >
                {isPremium == true ? "프리미엄 회원" : "일반 회원"}
              </MembershipGroupText>
            </ProfileTextContainer>
          </ProfileContainer>
          <Title>계정</Title>
          <MenuItem
            onPress={() =>
              setNavName({
                istab: "NoTab",
                tab: "SettingNoTabNavigation",
                screen: "AccountScreen",
              })
            }
          >
            <MenuText>내 정보</MenuText>
            <RightIcon />
          </MenuItem>
          <MenuItem onPress={setLoggedOut}>
            <MenuText>로그아웃</MenuText>
            <RightIcon />
          </MenuItem>
          <MenuItem
            onPress={() =>
              setNavName({
                istab: "NoTab",
                tab: "SettingNoTabNavigation",
                screen: "BankScreen",
              })
            }
          >
            <MenuText>내 은행 계좌 목록</MenuText>
            <RightIcon />
          </MenuItem>
          <MenuItem
            onPress={() =>
              EmailSend("[캠퍼스택시문의:학생증재체출] 본인닉네임")
            }
          >
            <MenuText>학생증 다시 제출</MenuText>
            <RightIcon />
          </MenuItem>
          <Title>고객문의</Title>
          <MenuItem
            onPress={() =>
              EmailSend("[캠퍼스택시문의:신고 및 문의] 본인닉네임")
            }
          >
            <MenuText>신고 및 문의</MenuText>
            <RightIcon />
          </MenuItem>
          {/* <Title>앱 설정</Title>
          <MenuItem>
            <MenuText>알림 설정</MenuText>
            <RightIcon />
          </MenuItem> */}
          <Title>앱 정보</Title>
          <MenuItem
            onPress={() =>
              setNavName({
                istab: "NoTab",
                tab: "SettingNoTabNavigation",
                screen: "AppInfo",
              })
            }
          >
            <MenuText>앱 버전</MenuText>
            <RightIcon />
          </MenuItem>
          <Title>이용 규칙</Title>
          <MenuItem
            onPress={() =>
              setNavName({
                istab: "NoTab",
                tab: "SettingNoTabNavigation",
                screen: "PrivacyScreen",
              })
            }
          >
            <MenuText>개인정보처리방침</MenuText>
            <RightIcon />
          </MenuItem>
          <MenuItem
            onPress={() =>
              setNavName({
                istab: "NoTab",
                tab: "SettingNoTabNavigation",
                screen: "GeoScreen",
              })
            }
          >
            <MenuText>위치정보 이용약관</MenuText>
            <RightIcon />
          </MenuItem>
          <MenuItem
            onPress={() =>
              setNavName({
                istab: "NoTab",
                tab: "SettingNoTabNavigation",
                screen: "TermsScreen",
              })
            }
          >
            <MenuText>서비스 이용약관</MenuText>
            <RightIcon />
          </MenuItem>
          <MenuItem
            onPress={() =>
              setNavName({
                istab: "NoTab",
                tab: "SettingNoTabNavigation",
                screen: "MarketingScreen",
              })
            }
          >
            <MenuText>마케팅 정보 수신</MenuText>
            <RightIcon />
          </MenuItem>
        </Container>
      </SafeAreaView>
    </BlankBackground>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const Container = styled.ScrollView`
  margin-left: 30px;
`;

const Title = styled.Text`
  margin-top: 16px;
  font-size: 18px;
  font-weight: bold;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-color: #f0f0f0;
  padding: 24px 20px 24px 20px;
  margin-right: 25px;
`;

const MenuText = styled.Text`
  font-size: 15px;
`;

const ProfileContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  flex-direction: row;
  flex: 1;
`;

const ProfileTextContainer = styled.View`
  margin-left: 20px;
  flex: 1;
`;

const EmailTextBackView = styled.View`
  height: 15px;
  justify-content: center;
  align-self: baseline;
  padding: 0 5px 0 5px;
  align-items: center;
  border-radius: 10px;
  background-color: #e8e9f2;
  margin-bottom: 15px;
`;

const NicknameText = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

const CampusNameText = styled.Text`
  color: #828282;
  font-size: 11px;
`;

const EmailText = styled.Text`
  color: #828282;
  font-size: 11px;
`;

const MembershipGroupText = styled.Text`
  margin-top: 3px;
  font-size: 11px;
`;

const ProfileImage = styled.Image`
  width: 70px;
  height: 70px;
`;

const PlusButton = styled.TouchableOpacity`
  width: 15px;
  height: 15px;
  margin-top: 60px;
`;

const OuterTouchableView = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
  position: absolute;
`;
