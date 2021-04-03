import styled from '@emotion/native';
import React, { useState, useEffect} from 'react';
import { Platform, Button, ScrollView, Text, View, TouchableOpacity, ListViewComponent} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OptionButton } from '../../../components/button/OptionButton';
import { ChatRoom } from '../../../components/chat-room/ChatRoomList';
import { HomeLocationTextField } from '../../../components/form/HomeLocationTextField';
import ArriveIcon from '../../../components/icon/ArriveIcon';
import DepartIcon from '../../../components/icon/DepartIcon';
import DotlineIcon from '../../../components/icon/DotlineIcon';
import { CreateSelectedView } from '../../../components/map/CreateSelectedView';
import { HomeStackParamList } from '../../tab/homeTab/HomeStackNavigation';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useAuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import { API_URL, GOOGLE_MAPAPI_URL } from "../../../constant";

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;

// 타임피커 : https://github.com/react-native-datetimepicker/datetimepicker

type Props = {
    navigation: HomeScreenNavigationProp;
    selectRoom: ChatRoom;
};

export const CreateScreenDetails: React.FC<Props> = ({selectRoom}) => {

    let testRoomData = { // test code
        id: 5,
        unreadMessage: 'string',
        distance: 5.1,
        start_address_code: '123',
        start_address: '공릉역 2번출구',
        start_address_detail: '공릉역 2번출구',
        start_lat: 37,
        start_lon: 127,
        end_address: '석계역 2번출구',
        end_address_detail: '석계역 2번출구',
        end_lat: 37,
        end_lon: 127,
        boarding_dtm: '2021-04-03T16:59:56.326Z',
        personnel_limit: 3,
        gender: 1,
        owner: 2,
        category: 'string',
        current: '3',
    }
    
    const [date, setDate] = useState(new Date());
    const [timeonly, setTimeonly] = useState(date.getHours().toString() + ":" + date.getMinutes().toString());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const { token } = useAuthContext();
    const [refetch, setRefetch] = useState<Date>();

    console.log({selectRoom})
    const [createRoom, setcreateRoom] = React.useState<ChatRoom>(testRoomData);

    const getInputDayLabel = (day:number) => {
        const week = new Array('일', '월', '화', '수', '목', '금', '토');
        
        return week[day];
    }

    const OptionDateFormat = (month:number, date:number, day:number) => {
        let korDay = getInputDayLabel(day);
        return month.toString() + "/" + date.toString() + " (" + korDay + ")";
    }

    const getNextThreeDay = (date: Date) => {
        let tomorrow = new Date(date.getTime() + (24 * 60 * 60 * 1000));
        let nextTomorrow = new Date(tomorrow.getTime() + (24 * 60 * 60 * 1000));
        return [OptionDateFormat(date.getMonth()+1,date.getDate(),date.getDay())+"\n오늘",
        OptionDateFormat(tomorrow.getMonth()+1,tomorrow.getDate(),tomorrow.getDay())+"\n내일",
        OptionDateFormat(nextTomorrow.getMonth()+1,nextTomorrow.getDate(),nextTomorrow.getDay())+"\n모레",]
    }

    let datelist = getNextThreeDay(date);

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
        <View style={{flex:1, backgroundColor: 'white'}}>
        <ScrollView>
        <Container>
            <SubContainer>
                <SearchView>
                    <DepartIcon/>
                    {<HomeLocationTextField myvalue = {"출발지: " + createRoom.start_address_detail} border={"1px solid #578fee"} iconvisible={false} centered={true}/>}
                </SearchView>
                <SearchView>
                    <DotlineIcon/>
                    <View style={{width: 263}}/>
                </SearchView>
                <SearchView>
                    <ArriveIcon/>
                    {<HomeLocationTextField myvalue = {"도착지: " + createRoom.end_address_detail} border={"1px solid #578fee"} iconvisible={false} centered={true}/>}
                </SearchView>

                <CreateSelectedView data={createRoom} />

            </SubContainer>

            <SelectSubContainer>
                <SubTitle>탑승날짜</SubTitle>
                <OptionButton
                    options={datelist}
                    backgroundColor={'#76a2eb'}
                    borderColor={'#76a2eb'}
                    color={'#ffffff'}
                    onChange={(option) => { console.log(option); }}
                    height={43} width={58}
                    borderRadius={"14px"}
                    defaultIndex={0} />
            </SelectSubContainer>

            <SelectSubContainer>
                <SubTitle>탑승시각</SubTitle>

                {<TouchableOpacity onPress={showTimepicker}>
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
                </TouchableOpacity>}
            </SelectSubContainer>

            <SelectSubContainer>
                <SubTitle>탑승인원</SubTitle>
                <OptionButton
                    options={["2", "3", "4"]}
                    backgroundColor={'#76a2eb'}
                    borderColor={'#76a2eb'}
                    color={'#ffffff'}
                    onChange={(option) => { console.log(option); }}
                    height={21} width={21}
                    defaultIndex={2} />
            </SelectSubContainer>

            <SelectSubContainer>
                <SubTitle>탑승 인원</SubTitle>
                <OptionButton
                    options={["동성만", "무관"]}
                    backgroundColor={'#76a2eb'}
                    borderColor={'#76a2eb'}
                    color={'#ffffff'}
                    onChange={(option) => { console.log(option); }}
                    height={28} width={58}
                    defaultIndex={1}/>
            </SelectSubContainer>
        </Container>

        </ScrollView>

        <BottomButton
            underlayColor={'#83ABED'}
            onPress={() => {
                console.log(token)
                axios.post(
                    `${API_URL}/api/v1/rooms/`,
                    {
                        "start_address_code": testRoomData.start_address_code,
                        "start_address": testRoomData.start_address,
                        "start_address_detail": testRoomData.start_address_detail,
                        "start_lat": testRoomData.start_lat,
                        "start_lon": testRoomData.start_lon,
                        "end_address_code": "123",
                        "end_address": testRoomData.end_address,
                        "end_address_detail": testRoomData.end_address_detail,
                        "end_lat": testRoomData.end_lat,
                        "end_lon": testRoomData.end_lon,
                        "boarding_dtm": testRoomData.boarding_dtm,
                        "personnel_limit": testRoomData.personnel_limit,
                        "gender": testRoomData.gender,
                        "owner": testRoomData.owner
                    },
                    {
                        headers:{
                            Authorization: `Bearer ${token}`
                        },
                    },
                ),[token, refetch];
            }}
            style={{ backgroundColor: "rgb(118, 162, 235)"}}>
            <BottomBtnTitle>
                방 만들기
            </BottomBtnTitle> 
        </BottomButton>
        </View>
        
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

const BottomButton = styled.TouchableHighlight`
	position:absolute;
	bottom:0;
	width:100%;
	height: 48px;
	justify-content: center;
	align-items: center;
	z-index: 1;
`;

const BottomBtnTitle = styled.Text`
	font-size: 14px;
	font-family: bold;
	color: #FFFFFF;
`