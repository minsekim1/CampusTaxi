import styled from '@emotion/native';
import React, { useState, useEffect} from 'react';
import { Platform, Button, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OptionButton } from '../../../components/button/OptionButton';
import { ChatRoom } from '../../../components/chat-room/ChatRoomList';
import { HomeLocationTextField } from '../../../components/form/HomeLocationTextField';
import ArriveIcon from '../../../components/icon/ArriveIcon';
import DepartIcon from '../../../components/icon/DepartIcon';
import DotlineIcon from '../../../components/icon/DotlineIcon';
import { SelectedBottomView } from '../../../components/map/SelectedBottomView';
import { HomeStackParamList } from '../../tab/homeTab/HomeStackNavigation';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;

// 타임피커 : https://github.com/react-native-datetimepicker/datetimepicker

type Props = {
    navigation: HomeScreenNavigationProp;
};

export const CreateScreenDetails: React.FC<Props> = () => {

    let testRoomData = { // test code
        id: 5,
        unreadMessage: 'string',
        distance: 5.1,
        start_address_code: 'string',
        start_address: '공릉역 2번출구',
        start_address_detail: '공릉역 2번출구',
        start_lat: 37.625317280381715,
        start_lon: 127.07327644534814,
        end_address: '삼육대학교',
        end_address_detail: '삼육대학교 분수대 앞',
        end_lat: 37.64353854399491,
        end_lon: 127.10579154192136,
        boarding_dtm: 'string',
        personnel_limit: 3,
        gender: 1,
        owner: 5,
        category: 'string',
        current: '3',
    }

    const [date, setDate] = useState(new Date(1598051730000));
    const [timeonly, setTimeonly] = useState(date.getHours().toString() + ":" + date.getMinutes().toString());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [createRoom, setcreateRoom] = React.useState<ChatRoom>(testRoomData);

    const onChange = (event: any, selectedDate: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setTimeonly(currentDate.getHours().toString() + ":" + currentDate.getMinutes().toString());
    };

    const showMode = (currentMode: React.SetStateAction<string>) => {
        setShow(true);
        setMode(currentMode);
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <ScrollView>
        <Container>
            <SubContainer>
                <SearchView>
                    <DepartIcon/>
                    {/* <HomeLocationTextField onFocus={() => navigate("CreateScreen", { type: category, gender: gender, limit: limit, value: schoollocation })} myvalue = {"출발지: " + createRoom.start_address_detail} centered={true}/> */}
                </SearchView>
                <SearchView>
                    <DotlineIcon/>
                    <View style={{width: 263}}/>
                </SearchView>
                <SearchView>
                    <ArriveIcon/>
                    {/* <HomeLocationTextField onFocus={() => navigate("CreateScreen", { type: category, gender: gender, limit: limit, value: schoollocation })} myvalue = {"출발지: " + createRoom.end_address_detail} placeholder={"도착지를 검색하세요"} centered={true}/> */}
                </SearchView>
            </SubContainer>


            <SelectedBottomView data={createRoom} />

            <SelectSubContainer>
                <SubTitle>탑승날짜</SubTitle>
                <OptionButton
                    options={["3/18(월)\n오늘", "3월/19(화)\n내일", "3월/20(화)\n모레"]}
                    onChange={(option) => { console.log(option); }}
                    height={50} width={60}
                    borderRadius={"13px"}
                    defaultIndex={0} />
            </SelectSubContainer>

            <SelectSubContainer>
                <SubTitle>탑승시각</SubTitle>

                {/* <TouchableOpacity onPress={showTimepicker}>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                    <Text>{timeonly}</Text>
                </TouchableOpacity> */}
            </SelectSubContainer>

            <SelectSubContainer>
                <SubTitle>탑승인원</SubTitle>
                <OptionButton
                    options={["2", "3", "4"]}
                    onChange={(option) => { console.log(option); }}
                    height={26} width={26}
                    defaultIndex={2} />
            </SelectSubContainer>

            <SelectSubContainer>
                <SubTitle>탑승 인원</SubTitle>
                <OptionButton
                    options={["동성만", "무관"]}
                    onChange={(option) => { console.log(option); }}
                    height={28} width={58}
                    defaultIndex={1}/>
            </SelectSubContainer>
        </Container>
        </ScrollView>
    );
};

const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Platform.OS === 'android' && '30px'};
`;

const SubContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const SelectSubContainer = styled.View`
  flex: 1;
  margin: 5px 40px 5px 40px;
  padding: 10px 0px 10px 0px;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  border-bottom-color: #B7B7BB;
  border-bottom-width: 1px; 
  
`;

const SearchView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const SubTitle = styled.Text`
  color: #808080;
  text-align: center;
  font-size: 11px;
  margin-bottom: 10px;
`;