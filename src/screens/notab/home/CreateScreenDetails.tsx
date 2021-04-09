import styled from "@emotion/native";
import React, { useState, useEffect } from "react";
import {
  Platform,
  Button,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ListViewComponent,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { OptionButton } from "../../../components/button/OptionButton";
import { ChatRoom } from "../../../components/chat-room/ChatRoomList";
import { HomeLocationTextField } from "../../../components/form/HomeLocationTextField";
import ArriveIcon from "../../../components/icon/ArriveIcon";
import DepartIcon from "../../../components/icon/DepartIcon";
import DotlineIcon from "../../../components/icon/DotlineIcon";
import { CreateSelectedView } from "../../../components/map/CreateSelectedView";
import { HomeStackParamList } from "../../tab/homeTab/HomeStackNavigation";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useAuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import { API_URL, GOOGLE_MAPAPI_URL } from "../../../constant";
import { User } from "../../../contexts/User";
import { ETAView } from "../../../components/chat-room/ETAView";

type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "HomeScreen"
>;

// 타임피커 : https://github.com/react-native-datetimepicker/datetimepicker

type Props = {
  navigation: HomeScreenNavigationProp;
  selectRoom: ChatRoom;
};

export const CreateScreenDetails: React.FC<Props> = (props: any) => {
  const selectRoom: ChatRoom = props.route.params;

  const [date, setDate] = useState(new Date());
  const [timeonly, setTimeonly] = useState(
    date.getHours().toString() + ":" + date.getMinutes().toString()
  );
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const { token } = useAuthContext();
  const [refetch, setRefetch] = useState<Date>();

  const [personnelLimit, setPersonnelLimit] = useState(4);
  const [createRoom, setcreateRoom] = React.useState<ChatRoom>(selectRoom);

  const getInputDayLabel = (day: number) => {
    const week = new Array("일", "월", "화", "수", "목", "금", "토");
    return week[day];
  };

  const OptionDateFormat = (month: number, date: number, day: number) => {
    let korDay = getInputDayLabel(day);
    return month.toString() + "/" + date.toString() + " (" + korDay + ")";
  };

  const getNextThreeDay = (date: Date) => {
    let tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    let nextTomorrow = new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000);
    return [
      OptionDateFormat(date.getMonth() + 1, date.getDate(), date.getDay()) +
        "\n오늘",
      OptionDateFormat(
        tomorrow.getMonth() + 1,
        tomorrow.getDate(),
        tomorrow.getDay()
      ) + "\n내일",
      OptionDateFormat(
        nextTomorrow.getMonth() + 1,
        nextTomorrow.getDate(),
        nextTomorrow.getDay()
      ) + "\n모레",
    ];
  };

  let datelist = getNextThreeDay(date);

  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setTimeonly(
      currentDate.getHours().toString() +
        ":" +
        currentDate.getMinutes().toString()
    );
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode("time");
  };

  //#region 유저 데이터 요청
  // AuthContext 시용하지 않고 직접 데이터 요청함
  const [user, setUser] = useState<User>();
  useEffect(() => {
    axios
      .get("https://api.campustaxi.net/api/v1/accounts/me/", {
        headers: {
          Authorization: "Bearer " + token,
          accept: "application/json",
        },
      })
      .then((d) => setUser(d.data));
  }, []);
  //#endregion 유저 데이터 요청
  const Create = () => {
    const room = {
      start_address_code: "00000",
      start_address: selectRoom.start_address,
      start_address_detail: selectRoom.start_address_detail,
      start_lat: selectRoom.start_lat,
      start_lon: selectRoom.start_lon,
      end_address_code: "00000",
      end_address: selectRoom.end_address,
      end_address_detail: selectRoom.end_address_detail,
      end_lat: selectRoom.end_lat,
      end_lon: selectRoom.end_lon,
      //   TEST CODE 날짜 변경 들어가야함
      boarding_dtm: date,
      personnel_limit: personnelLimit,
      gender: selectRoom.gender == 0 ? user?.gender : "NONE",
      owner: 1,
      //   owner TEST CODE 백엔드 변경후 바꿔야함 , 현재 uuid 값을 받아올 수 없음.
    };
    console.log(room);
    axios
      .post(`${API_URL}/api/v1/rooms/`, room, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      })
      .then((r) => console.log(r))
      .catch((e) => console.log(e.response.data));
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Container>
          <SubContainer>
            <ETAView
              gender={0}
              start_address={createRoom.start_address_detail}
              end_address={createRoom.end_address_detail}
            />

            <CreateSelectedView data={createRoom} />
          </SubContainer>

          <SelectSubContainer>
            <SubTitle>탑승날짜</SubTitle>
            <OptionButton
              options={datelist}
              backgroundColor={"#76a2eb"}
              borderColor={"#76a2eb"}
              color={"#ffffff"}
              onChange={(option) => {
                console.log(option);
              }}
              height={43}
              width={70}
              borderRadius={"14px"}
              defaultIndex={0}
            />
          </SelectSubContainer>

          <SelectSubContainer>
            <SubTitle>탑승시각</SubTitle>
            {
              <TouchableOpacity onPress={showTimepicker}>
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
              </TouchableOpacity>
            }
          </SelectSubContainer>

          <SelectSubContainer>
            <SubTitle>탑승인원</SubTitle>
            <OptionButton
              options={["2", "3", "4"]}
              backgroundColor={"#76a2eb"}
              borderColor={"#76a2eb"}
              color={"#ffffff"}
              onChange={(option) => {
                setPersonnelLimit(Number(option) + 2);
              }}
              height={25}
              width={41}
              defaultIndex={2}
            />
          </SelectSubContainer>

          <SelectSubContainer>
            <SubTitle>탑승 인원</SubTitle>
            <OptionButton
              options={["동성만", "무관"]}
              backgroundColor={"#76a2eb"}
              borderColor={"#76a2eb"}
              color={"#ffffff"}
              onChange={(option) => {
                console.log(option);
              }}
              height={28}
              width={58}
              defaultIndex={1}
            />
          </SelectSubContainer>
        </Container>
      </ScrollView>

      <BottomButton
        underlayColor={"#83ABED"}
        onPress={Create}
        style={{ backgroundColor: "rgb(118, 162, 235)" }}
      >
        <BottomBtnTitle>방 만들기</BottomBtnTitle>
      </BottomButton>
    </View>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Platform.OS === "android" && "30px"};
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
  border-bottom-color: #e7e7eb;
  border-bottom-width: 0.5px;
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
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 48px;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const BottomBtnTitle = styled.Text`
  font-size: 14px;
  font-family: bold;
  color: #ffffff;
`;
