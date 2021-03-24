import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { RightIcon } from '../../components/icon/RightIcon';
import { BlankBackground } from '../../components/layout/BlankBackground';
import { useAuthContext } from '../../contexts/AuthContext';
import { SettingStackParamList } from './SettingNavigation';

type SettingScreenNavigationProp = StackNavigationProp<SettingStackParamList, 'SettingScreen'>;

type Props = {
  navigation: SettingScreenNavigationProp;
};
export const SettingScreen: React.FC<Props> = () => {
  const { setLoggedOut } = useAuthContext();

  return (
    <BlankBackground color="#fff">
      <SafeAreaView>
        <Container>
          <Title>계정</Title>
          <MenuItem>
            <MenuText>내 정보</MenuText>
            <RightIcon />
          </MenuItem>
          <MenuItem onPress={setLoggedOut}>
            <MenuText>로그아웃</MenuText>
            <RightIcon />
          </MenuItem>
          <MenuItem>
            <MenuText>계좌 등록</MenuText>
            <RightIcon />
          </MenuItem>
          <MenuItem>
            <MenuText>학생증 제출</MenuText>
            <RightIcon />
          </MenuItem>
          <Title>앱 설정</Title>
          <MenuItem>
            <MenuText>알림 설정</MenuText>
            <RightIcon />
          </MenuItem>
          <Title>앱 정보</Title>
          <MenuItem>
            <MenuText>앱 버전</MenuText>
            <RightIcon />
          </MenuItem>
          <Title>이용 규칙</Title>
          <MenuItem>
            <MenuText>개인정보처리방침</MenuText>
            <RightIcon />
          </MenuItem>
          <MenuItem>
            <MenuText>위치정보 이용약관</MenuText>
            <RightIcon />
          </MenuItem>
          <MenuItem>
            <MenuText>서비스 이용약관</MenuText>
            <RightIcon />
          </MenuItem>
          <MenuItem>
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