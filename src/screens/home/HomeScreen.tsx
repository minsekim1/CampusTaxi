import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect} from 'react';
import { Platform, Button, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { OptionButton } from '../../components/button/OptionButton';
import { CardButton } from '../../components/button/CardButton';
import { TextField } from '../../components/form/TextField';
import { HomeLocationTextField } from '../../components/form/HomeLocationTextField';
import { ArriveIcon } from '../../components/icon/ArriveIcon';
import { DepartIcon } from '../../components/icon/DepartIcon';
import { DotlineIcon } from '../../components/icon/DotlineIcon';
import { BookIcon } from '../../components/icon/home/BookIcon';
import { BusIcon } from '../../components/icon/home/BusIcon';
import { ClubIcon } from '../../components/icon/home/ClubIcon';
import { GameIcon } from '../../components/icon/home/GameIcon';
import { PencilIcon } from '../../components/icon/home/PencilIcon';
import { PoolIcon } from '../../components/icon/home/PoolIcon';
import { RideIcon } from '../../components/icon/home/RideIcon';
import { EtcIcon } from '../../components/icon/home/EtcIcon';
import { SchoolIcon } from '../../components/icon/home/SchoolIcon';
import { MiniHomeIcon } from '../../components/icon/home/MiniHomeIcon';
import { MiniEIcon } from '../../components/icon/home/MiniEIcon';
import { Search } from '../../components/icon/home/Search';
import { SkiIcon } from '../../components/icon/home/SkiIcon';
import { CreateRoomIcon } from '../../components/icon/home/CreateRoomIcon';
import { AlarmBellIcon } from '../../components/icon/home/AlarmBellIcon';
import { BlankBackground } from '../../components/layout/BlankBackground';
import { MainLogo } from '../../components/logo/MainLogo';
import { HomeStackParamList } from './HomeNavigation';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen: React.FC<Props> = () => {
  const { navigate } = useNavigation<HomeScreenNavigationProp>();
  const [category, setCategory] = useState(0);
  const [limit, setLimit] = useState(0);
  const [gender, setGender] = useState(0);

  return (
      <BlankBackground color="#76A2EB">
        <Container>

          <AlarmBell>
            <AlarmBellIcon/>
          </AlarmBell>
          <LogoContainer>
            <MainLogo fill="#fff" />
            <MyCampusInfo>
              <UserCampusInfo>택시 대학교 [서울]</UserCampusInfo>
            </MyCampusInfo>

            <MiniIconContainer>
              <MiniIconTouchable>
                <MiniHomeIcon/>
                <MiniIconText>학교 홈</MiniIconText>
              </MiniIconTouchable>
              <MiniIconTouchable>
                <MiniEIcon/>
                <MiniIconText>E-Class</MiniIconText>
              </MiniIconTouchable>
            </MiniIconContainer>


          </LogoContainer>

          <ScrollView>
            <MainContainer>
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
                options={["2", "3", "4"]}
                onChange={(option) => { setLimit(parseInt(option) + 2); }}
                height={26} width={26} />
              </SubContainer>

              <SubContainer>
                <SubTitleView>
                  <SubTitle>탑승 성별</SubTitle>
                </SubTitleView>
              <OptionButton
                options={["동성만", "무관"]}
                onChange={(option) => { setGender(parseInt(option)); }}
                height={28} width={58} />
              </SubContainer>

              <SubContainer>
                <SubTitleView>
                  <SubTitle>검색</SubTitle>
                </SubTitleView>

                <SearchView>
                  <DepartIcon/>
                  <HomeLocationTextField placeholder={"출발지를 검색하세요"} centered={true}/>
                </SearchView>
                <SearchView>
                  <DotlineIcon/>
                  <View style={{width: 263}}/>
                </SearchView>
                <SearchView>
                  <ArriveIcon/>
                  <HomeLocationTextField placeholder={"도착지를 검색하세요"} centered={true}/>
                </SearchView>
              </SubContainer>

              <SubContainer>
              <SearchRoom onPress={() => navigate("CreateScreen", { type: category, gender: gender, limit: limit, value: "택시 대학교" })}>
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


const BannerContainer = styled.View`
  height: 110px;
  background-color: #F2F2F2;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 124px;
`;

const SubContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const CardContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

const Card = styled.TouchableOpacity`
  ${Platform.OS === 'android' && 'elevation: 6;'}
  height: 101px;
  width: 102px;
  flex: 1;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  margin: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
`;

const CardTitle = styled.Text`
  text-align: center;
  margin-top: 16px;
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

const TempImage = styled.View`
  margin-top: -24px;
  height: 110px;
  background-color: red;
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

const CreateRoom = styled.TouchableOpacity`
  width: 69px;
  height: 69px;
  background-color: #76A2EB;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  position: absolute;
  bottom: 20px;
  right: 15px;
  shadow-color: #d9d9d9;
`;

const CreateRoomText = styled.Text`
  color: white;
  font-size: 10px;
  margin-top: 4px;
`;


const AlarmBell = styled.TouchableOpacity`
  position: absolute;
  top: 30px;
  right: 15px;
  z-index : 1
`;
