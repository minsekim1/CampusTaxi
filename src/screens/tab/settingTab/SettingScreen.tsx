import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { BackHandler, Platform, SafeAreaView } from 'react-native';
import { EmailSend } from '../../../components/chat-room/EmailSend';
import { RightIcon } from '../../../components/icon/RightIcon';
import { BlankBackground } from '../../../components/layout/BlankBackground';
import { showToast } from '../../../components/layout/Toast';
import { useAuthContext } from '../../../contexts/AuthContext';
import { SettingStackParamList } from './SettingStackNavigation';

type SettingScreenNavigationProp = StackNavigationProp<SettingStackParamList, 'SettingScreen'>;

type Props = {
  navigation: SettingScreenNavigationProp;
};
export const SettingScreen: React.FC<Props> = () => {
  const { setLoggedOut } = useAuthContext();
  const { setNavName } = useAuthContext();

  const navigation = useNavigation<SettingScreenNavigationProp>();
  //#region 뒤로가기 버튼 제어 & 더블클릭시 앱 종료
  let currentCount = 0;
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton)
      //console.log("focus MainScreen");
    });
    navigation.addListener('blur', () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
      //console.log("blur MainScreen");
    })
  }, []);
  const handleBackButton = () => {
    if (currentCount < 1) {
      currentCount += 1;
      if (Platform.OS === 'android') {
        showToast('뒤로 가기를 한번 더 누르면 앱이 종료됩니다.\n로그아웃은 설정->로그아웃으로 가주세요.')
      } else {
        BackHandler.exitApp();
      }
      setTimeout(() => {
        currentCount = 0;
      }, 2000);
      return true;
    }
  }
  //#endregion 뒤로가기 버튼 제어 & 더블클릭시 앱 종료
  return (
    <BlankBackground color="#fff">
      <SafeAreaView>
        <Container>
          <Title>계정</Title>
          <MenuItem onPress={() => setNavName({
            istab: "NoTab",
            tab: "SettingNoTabNavigation",
            screen: 'AccountScreen'
          })}>
            <MenuText>내 정보</MenuText>
            <RightIcon />
          </MenuItem>
          <MenuItem onPress={setLoggedOut}>
            <MenuText>로그아웃</MenuText>
            <RightIcon />
          </MenuItem>
          <MenuItem onPress={() => setNavName({
            istab: "NoTab",
            tab: "SettingNoTabNavigation",
            screen: 'BankScreen'
          })}>
            <MenuText>내 은행 계좌 목록</MenuText>
            <RightIcon />
          </MenuItem>
          <MenuItem onPress={()=>EmailSend('[캠퍼스택시문의:학생증재체출] 본인닉네임')}>
            <MenuText>학생증 다시 제출</MenuText>
            <RightIcon />
          </MenuItem>
          <Title>고객문의</Title>
          <MenuItem onPress={()=>EmailSend('[캠퍼스택시문의:신고 및 문의] 본인닉네임')}>
            <MenuText>신고 및 문의</MenuText>
            <RightIcon />
          </MenuItem>
          {/* <Title>앱 설정</Title>
          <MenuItem>
            <MenuText>알림 설정</MenuText>
            <RightIcon />
          </MenuItem> */}
          <Title>앱 정보</Title>
          <MenuItem onPress={() => setNavName({
            istab: "NoTab",
            tab: "SettingNoTabNavigation",
            screen: 'AppInfo'
          })}>
            <MenuText>앱 버전</MenuText>
            <RightIcon />
          </MenuItem>
          <Title>이용 규칙</Title>
          <MenuItem onPress={() => setNavName({
            istab: "NoTab",
            tab: "SettingNoTabNavigation",
            screen: 'PrivacyScreen'
          })}>
            <MenuText>개인정보처리방침</MenuText>
            <RightIcon />
          </MenuItem>
          <MenuItem onPress={() => setNavName({
            istab: "NoTab",
            tab: "SettingNoTabNavigation",
            screen: 'GeoScreen'
          })}>
            <MenuText>위치정보 이용약관</MenuText>
            <RightIcon />
          </MenuItem>
          <MenuItem onPress={() => setNavName({
            istab: "NoTab",
            tab: "SettingNoTabNavigation",
            screen: 'TermsScreen'
          })}>
            <MenuText>서비스 이용약관</MenuText>
            <RightIcon />
          </MenuItem>
          <MenuItem onPress={() => setNavName({
            istab: "NoTab",
            tab: "SettingNoTabNavigation",
            screen: 'MarketingScreen'
          })}>
            <MenuText>마케팅 정보 수신</MenuText>
            <RightIcon />
          </MenuItem>
        </Container>
      </SafeAreaView>
    </BlankBackground>
  );
};
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
  border-bottom-width:1px;
  border-color:#F0F0F0;
  padding: 24px 20px 24px 20px;
  margin-right: 25px;
`;

const MenuText = styled.Text`
  font-size: 15px;
`;