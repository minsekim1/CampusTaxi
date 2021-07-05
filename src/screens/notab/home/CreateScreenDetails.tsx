import styled from "@emotion/native";
import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import {
  Platform,
  Button,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ListViewComponent,
  Alert,
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
import {
  StackActions,
  TabActions,
  useNavigation,
} from "@react-navigation/native";
import { MessageNoTabNavigationProp } from "../message/ChatRoomScreen";
import { NoTabNavigation } from "../NoTabNavigation";
import { CustomAxios } from "../../../components/axios/axios";
import { Message } from "../../../components/chat/Message";

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
  //#region
  const selectRoom: ChatRoom = props.route.params;

  const { setNavName } = useAuthContext();

  const [dateBtn, setDateBtn] = useState<string>("0");
  const [date, setDate] = useState(new Date());
  const [timeonly, setTimeonly] = useState(
    date.getHours().toString() + ":" + date.getMinutes().toString()
  );
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [refetch, setRefetch] = useState<Date>();

  const [personnelLimit, setPersonnelLimit] = useState(4);
  const [createRoom, setcreateRoom] = React.useState<ChatRoom>(selectRoom);

  const [gender_, setGender_] = React.useState<string>("1");

  const getInputDayLabel = (day: number) => {
    const week = new Array("일", "월", "화", "수", "목", "금", "토");
    return week[day];
  };

  const OptionDateFormat = (month: number, date: number, day: number) => {
    let korDay = getInputDayLabel(day);
    return month.toString() + "/" + date.toString() + " (" + korDay + ")";
  };

  const getNextThreeDay = (date: Date) => {
    return [
      OptionDateFormat(date.getMonth() + 1, date.getDate(), date.getDay()) +
        "\n오늘",
      OptionDateFormat(date.getMonth() + 1, date.getDate() + 1, date.getDay()+1) +
        "\n내일",
      OptionDateFormat(date.getMonth() + 1, date.getDate() + 2, date.getDay()+2) +
        "\n모레",
    ];
  };

  const datelist = getNextThreeDay(date);

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
  //#endregion
  //#region 유저 데이터 요청
  // AuthContext 시용하지 않고 직접 데이터 요청함
  const { token, resetToken, refresh } = useAuthContext();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    //내 정보 가져오기
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
      }
    );
  }, []);

  const Create = () => {
    const date_ = new Date().getDate() + Number(dateBtn);
    const hour = Number(timeonly.split(":")[0]);
    const min = Number(timeonly.split(":")[1]);
    const date_result = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      date_,
      hour + 9, //KOREA TIME TEST CODE
      min,
      0
    );
    const date_string =
      format(date_result, "yyyy-MM-dd") + "T"+format(date_result,"HH:mm");
    //TEST CODE minsekim 백엔드 끝나면 비공개=>무관으로 변경해야함
    let gender_Local = gender_ == "0" ? user?.gender : "NONE";

    if (selectRoom.category == "0")
    selectRoom.category  = "97"
    else if (selectRoom.category == "1")
    selectRoom.category  = "98"
    else if (selectRoom.category == "2")
    selectRoom.category  = "486" // 공용코드로 업데이트됌 20210630       
    
    let room = {
      start_address: selectRoom.start_address,
      start_address_detail: selectRoom.start_address_detail,
      start_lat: selectRoom.start_lat.toFixed(6),
      start_lon: selectRoom.start_lon.toFixed(6),
      end_address: selectRoom.end_address,
      end_address_detail: selectRoom.end_address_detail,
      end_lat: selectRoom.end_lat.toFixed(6),
      end_lon: selectRoom.end_lon.toFixed(6),
      boarding_dtm: date_string,
      personnel_limit: personnelLimit,
      gender: gender_Local,
      category: selectRoom.category,
    };
    axios
      .post(`${API_URL}/v1/rooms/`, room, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      })
      .then((r) => {
        let room: ChatRoom = r.data;
        console.log("r.data",r.data);
        // setNavName({
        //   istab: "Tab",
        //   tab: "MessageTabScreen",
        //   props: {
        //     data: room,
        //   },
        // });
      })
      .catch((e) => console.log(JSON.stringify(e.response)));
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Container>
          <SubContainer>
            <ETAView
              gender={"MALE"}
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
              onChange={(num) => setDateBtn(num)}
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
              onChange={(option) => setGender_(option)}
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
