import styled from "@emotion/native";
import { useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, Platform, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Boarding_dtmToDate,
  Boarding_dtmToRecently,
} from "../../../components/chat/date";
import { MessageIcon } from "../../../components/icon/notification/MessageIcon";
import { NoticeIcon } from "../../../components/icon/notification/NoticeIcon";
import { API_URL } from "../../../constant";
import { NotificationNoTabNavigationParamList } from "./NotificationNoTabNavigation";

type NotificationScreenNavigationProp = StackNavigationProp<
  NotificationNoTabNavigationParamList,
  "NotificationScreen"
>;

type Props = {
  navigation: NotificationScreenNavigationProp;
};

// {
//   "count": 0,
//   "next": "string",
//   "previous": "string",
//   "results": [
//     {
//       "id": 0,
//       "title": "string",
//       "content": "string",
//       "is_view": true,
//       "view_at": "2021-04-10T09:02:09.872Z"
//     }
//   ]
// }

type Data = {
  title: string;
  view_at: string;
  content: string;
  type: "message" | "notice" | "info" | "marketting"; //TEST CODE 백엔드에 추가해야함.
  is_view?: boolean;
  image?: string; // = URL (이미지 파일 ㄴㄴ 주소만) TEST CODE 백엔드에 추가해야함.
};
const DummyNotifiList: Data[] = [
  {
    title: "비행기 예매 이벤트",
    content: "비행기 행사.. 다 팔아요..",
    is_view: true,
    view_at: "2021-04-08T09:02:09.872Z",
    image: "https://drive.google.com/file/d/1fEyLYrEq22Etow3WqKEbscgbNj1IwXbi/view?usp=sharing",
    type: "notice",
  },
  {
    title: "학생 백팩 이벤트..",
    content: "백팩 사가세요.. 싸게 파라요..",
    is_view: true,
    view_at: "2021-04-09T09:02:09.872Z",
    image: "https://homepages.cae.wisc.edu/~ece533/images/arctichare.png",
    type: "notice",
  },
  {
    title: "유저닉네임1",
    content: "어디계세요?",
    is_view: true,
    view_at: "2021-04-10T09:02:09.872Z",
    type: "message",
  },
  {
    title: "유저닉네임2",
    content: "어디계세요?",
    is_view: true,
    view_at: "2021-04-11T09:02:09.872Z",
    type: "message",
  },
  {
    title: "유저닉네임3",
    content: "어디계세요?",
    is_view: true,
    view_at: "2021-04-12T09:02:09.872Z",
    type: "message",
  },
  {
    title: "유저닉네임3",
    content: "어디계세요?",
    is_view: true,
    view_at: "2021-04-12T09:02:09.872Z",
    type: "message",
  },
  {
    title: "유저닉네임3",
    content: "어디계세요?",
    is_view: true,
    view_at: "2021-04-12T09:02:09.872Z",
    type: "message",
  },
];
export const NotificationScreen: React.FC<Props> = () => {
  //#region 상태바 제어
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor("transparent");
      }
      StatusBar.setBarStyle("dark-content");
    }
  }, [isFocused]);
  //#endregion

  const [datas, setData] = useState<Data[]>(DummyNotifiList.reverse());

  // useEffect(() => {
  //   axios.get(`${API_URL}/api/v1/notifications/`).then((response) => {
  //     if (response.data.results) {
  //       setData(response.data.results);
  //       console.log(response.data)
  //     }
  //   });
  // }, []);
  return (
    <Container>
      <ScrollView>
        {datas.map((data, i) => (
          <DataContainer key={i}>
            <Card>
              <CardHeaderContainer>
                <LeftContainer>
                  <IconView>
                    {data.type == "notice" ? <NoticeIcon /> : null}
                    {data.type == "message" ? <MessageIcon /> : null}
                    {data.type == "info" ? <NoticeIcon /> : null}
                    {data.type == "marketting" ? <NoticeIcon /> : null}
                  </IconView>
                  <Title>{data.title}</Title>
                </LeftContainer>
                <Time>{Boarding_dtmToRecently(data.view_at)}</Time>
              </CardHeaderContainer>
              <Description>{data.content}</Description>
              {data.image ? (
                <Image
                  source={{
                    uri: data.image,
                  }}
                  style={{width:'100%', minHeight:100,marginTop:10}}
                  resizeMethod={'resize'}
                  resizeMode={'center'}
                />
              ) : null}
            </Card>
            <Line />
          </DataContainer>
        ))}
      </ScrollView>
    </Container>
  );
};
const IconView = styled.View`
  justify-content: center;
  padding: 0 5px 0 10px;
`;
const Container = styled.SafeAreaView`
  flex: 1;
`;

const DataContainer = styled.View``;

const Card = styled.View`
  background-color: #ffffff;
  padding-top: 24px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 12px;
`;

const CardHeaderContainer = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
  justify-content: space-between;
`;

const LeftContainer = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  color: black;
  font-size: 16px;
  font-weight: bold;
`;

const Time = styled.Text`
  color: #b6b6bf;
  font-size: 11px;
`;

const Description = styled.Text`
  color: #585864;
  margin-left: 30px;
`;

const Line = styled.View`
  align-self: center;
  width: 80%;
  height: 1px;
  background-color: #e5e5e8;
`;
