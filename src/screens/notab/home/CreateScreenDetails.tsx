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
    
    const [date, setDate] = useState(new Date());
    const [timeonly, setTimeonly] = useState(date.getHours().toString() + ":" + date.getMinutes().toString());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

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
            onPress={() => console.log("createScreenDetails : createroom")}
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