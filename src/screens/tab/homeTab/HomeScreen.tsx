import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState} from 'react';
import { Platform, ScrollView, View, Linking, BackHandler } from 'react-native';
import { OptionButton } from '../../../components/button/OptionButton';
import { CardButton } from '../../../components/button/CardButton';
import { HomeLocationTextField } from '../../../components/form/HomeLocationTextField';
import { ArriveIcon } from '../../../components/icon/ArriveIcon';
import { DepartIcon } from '../../../components/icon/DepartIcon';
import { DotlineIcon } from '../../../components/icon/DotlineIcon';
import { BusIcon } from '../../../components/icon/home/BusIcon';
import { EtcIcon } from '../../../components/icon/home/EtcIcon';
import { SchoolIcon } from '../../../components/icon/home/SchoolIcon';
import { MiniHomeIcon } from '../../../components/icon/home/MiniHomeIcon';
import { MiniEIcon } from '../../../components/icon/home/MiniEIcon';
import { AlarmBellIcon } from '../../../components/icon/home/AlarmBellIcon';
import { BlankBackground } from '../../../components/layout/BlankBackground';
import { MainLogo } from '../../../components/logo/MainLogo';
import { HomeStackParamList } from './HomeStackNavigation';
import { useAuthContext } from '../../../contexts/AuthContext';
import { showToast } from '../../../components/layout/Toast';
import { useNavigation } from '@react-navigation/native';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen: React.FC<Props> = () => {
  const [category, setCategory] = useState(0);
  const [limit, setLimit] = useState(0);
  const [gender, setGender] = useState(0);
  const [schoollocation] = useState("택시대학교");
  const { setNavName } = useAuthContext();
  const navigation = useNavigation<HomeScreenNavigationProp>();
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
      <BlankBackground color="#76A2EB">
        <Container>

          <AlarmBell>
            <AlarmBellIcon/>
          </AlarmBell>
          <LogoContainer>
            <MainLogo fill="#fff" />
            <MyCampusInfo>
              <UserCampusInfo>{schoollocation} [서울]</UserCampusInfo>
            </MyCampusInfo>
            <MiniIconContainer>
            <MiniIconTouchable onPress={() => Linking.openURL("https://syu.ac.kr")}>
                <MiniHomeIcon/>
                <MiniIconText>학교 홈</MiniIconText>
              </MiniIconTouchable>
            <MiniIconTouchable onPress={() => Linking.openURL("https://lms.suwings.syu.ac.kr/")}>
                <MiniEIcon/>
                <MiniIconText>E-Class</MiniIconText>
              </MiniIconTouchable>
            </MiniIconContainer>
          </LogoContainer>
          <ScrollView>
            <MainContainer>
              {/* <Button title="방 만들기 (test)" onPress={() => navigate("CreateScreenDetails")}/> */}
            {/* <Button title="No Tab 으로 이동 (test)" onPress={() => */}
              {/* setNavName({
                name: "HomeCreateNavigation",
                props: {
                  screen: 'CreateScreen', //CreateScreenDetails하면 기본 초기화 화면 바꿔서 바로 그쪽으로 이동. 안의 props값은 useAuthContext로 해당 페이지에서 또 읽음
                  type: category,
                  gender: gender,
                  limit: limit,
                  value: schoollocation
                }
              })} /> */}
              <SubContainer>
                <SubTitleView>
                  <SubTitle>카테고리</SubTitle>
                </SubTitleView>
                <CardButton
                options={["등교", "하교", "기타"]}
                onChange={(option) => {setCategory(parseInt(option));}}
                icon={[<SchoolIcon />, <BusIcon />, <EtcIcon />]} />
              </SubContainer>
              <SubContainer>
                <SubTitleView>
                  <SubTitle>인원</SubTitle>
                </SubTitleView>
              <OptionButton
                options={["2명", "3명", "4명", "무관"]}
                onChange={(option) => { setLimit(parseInt(option) + 2); }}
                height={26} width={40}
                defaultIndex={3}/>
              </SubContainer>
              <SubContainer>
                <SubTitleView>
                  <SubTitle>탑승 성별</SubTitle>
                </SubTitleView>
              <OptionButton
                options={["동성만", "무관"]}
                onChange={(option) => { setGender(parseInt(option)); }}
                height={28} width={58}
                defaultIndex={1} />
              </SubContainer>
              <SubContainer>
                <SubTitleView>
                  <SubTitle>검색</SubTitle>
                </SubTitleView>
                <SearchView>
                  <DepartIcon/>
                <HomeLocationTextField onFocus={() => setNavName({
                  istab: "NoTab",
                  tab : "HomeNoTabNavigation",
                  props: {
                    screen: 'CreateScreen', //CreateScreenDetails하면 기본 초기화 화면 바꿔서 바로 그쪽으로 이동. 안의 props값은 useAuthContext로 해당 페이지에서 또 읽음
                    type: category,
                    gender: gender,
                    limit: limit,
                    value: schoollocation
                  }
                })} myvalue = {(category == 1) ? schoollocation : ""} placeholder={"출발지를 검색하세요"} centered={true}/>
                </SearchView>
                <SearchView>
                  <DotlineIcon/>
                  <View style={{width: 263}}/>
                </SearchView>
                <SearchView>
                  <ArriveIcon/>
                <HomeLocationTextField onFocus={() => setNavName({
                  istab: "NoTab",
                  tab: "HomeNoTabNavigation",
                  props: {
                    screen: 'CreateScreen',
                    type: category,
                    gender: gender,
                    limit: limit,
                    value: schoollocation
                  }
                })} myvalue = {(category == 0) ? schoollocation : ""} placeholder={"도착지를 검색하세요"} centered={true}/>
                </SearchView>
              </SubContainer>
              <SubContainer>
              <SearchRoom onPress={() => setNavName({
                istab: "NoTab",
                tab: "HomeNoTabNavigation",
                props: {
                  screen: 'CreateScreen',
                  type: category,
                  gender: gender,
                  limit: limit,
                  value: schoollocation
                }
              })}>
                  <SearchRoomText>방 검색하기 & 만들기</SearchRoomText>
                </SearchRoom>
              </SubContainer>
            </MainContainer>
          </ScrollView>
        </Container>
      </BlankBackground>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Platform.OS === 'android' && '30px'};
`;

const LogoContainer = styled.View`
  align-items: center;
  background-color: #76A2EB;
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: #F2F2F2;
  padding-top: 6px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 50px;
`;

const SearchView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;



const SubContainer = styled.View`
  flex: 1;
  align-items: center;
`;




const MiniIconText = styled.Text`
  color: white;
  margin-top: 5px;
  font-size: 9px;
`;

const MiniIconContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const MiniIconTouchable = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
`;

const SubTitleView = styled.View`
  flex: 1;
  height: 21px;
  width: 88px;
  color: #5F88CD;
  justify-content: center;
  align-items: center;
  border-width: 1.5px;
  border-color: #76A2EB;
  border-radius: 6px;
  background-color: white;
  font-size: 11px;
  margin-top: 25px;
  margin-bottom: 15px;
`;

const SubTitle = styled.Text`
  color: #5F88CD;
  text-align: center;
  font-size: 11px;
`;

const UserCampusInfo = styled.Text`
  color: #F4F4F4;
  text-align: center;
  font-size: 11px;
`;


const MyCampusInfo = styled.View`
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  width: 105px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.13);
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.83);
  border-top-left-radius: 108px;
  border-top-right-radius: 108px;
  border-bottom-left-radius: 108px;
  border-bottom-right-radius: 108px;
`;

const SearchRoom = styled.TouchableOpacity`
  margin-top: 40px;
  width: 144px;
  height: 34.5px;
  background-color: #76A2EB;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 11px;
  border-radius: 17px;
`;

const SearchRoomText = styled.Text`
  color: #FFFFFF;
  font-size: 12px;
`;




const AlarmBell = styled.TouchableOpacity`
  position: absolute;
  top: 30px;
  right: 15px;
  z-index : 1
`;
