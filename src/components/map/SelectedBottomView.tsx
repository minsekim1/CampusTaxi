import styled from "@emotion/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerActionType } from "@react-navigation/native";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { View, Text, Dimensions } from "react-native";
import { TMAP_API } from "../../constant";
import { myCoordProps } from "../../screens/notab/home/CreateScreen";
import { ChatRoom } from "../chat-room/ChatRoomList";
import { LogoColor } from "../color/GenderColor";
const windowWidth = Dimensions.get("window").width;
type Props = {
  data?: ChatRoom;
  SetRoute: Dispatch<SetStateAction<myCoordProps[]>>;
};

export const SelectedBottomView: React.FC<Props> = ({ data, SetRoute }) => {
  const [time, setTime] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);

  if (!data || !data?.start_lon || !data?.end_lon) return <></>;
  useEffect(() => {
    setTime(-1);
    //캐쉬 메모리에 저장해서 있으면 씀
    AsyncStorage.getItem(
      "route(" +
        data.end_lon +
        "," +
        data.end_lat +
        "," +
        data.start_lon +
        "," +
        data.start_lat +
        ")"
    ).then((r) => {
      if (!r) {
        axios
          .get(
            `${TMAP_API}endX=${data.end_lon}&endY=${data.end_lat}&startX=${data.start_lon}&startY=${data.start_lat}`,
            {
              headers: {
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            // TEST CODE Type 설정법 모르겠음..
            if (!!response) {
              setCost(response.data.features[0].properties.taxiFare);
              setDistance(response.data.features[0].properties.totalDistance);
              setTime(response.data.features[0].properties.totalTime);
              response.data.features.map((c: any) => {
                if (!!c) SetRoute(c.geometry.coordinates);
                AsyncStorage.setItem(
                  "route(" +
                    data.end_lon +
                    "," +
                    data.end_lat +
                    "," +
                    data.start_lon +
                    "," +
                    data.start_lat +
                    ")",
                  JSON.stringify(response.data.features[0])
                );
              });
            }
          })
          .catch((e) =>
            Alert.alert(
              "예상금액가져오기: 데이터 처리 과정에서 에러가 발생했습니다."
            )
          );
			} else {
				r = JSON.parse(r)
        setCost(r.properties.taxiFare);
        setDistance(r.properties.totalDistance);
        setTime(r.properties.totalTime);
        SetRoute(r.geometry.coordinates);
      }
    });
  }, [data]);
  return (
    <Container>
      {time == -1 ? (
        <ActivityIndicator size="large" color={LogoColor} />
      ) : (
        <>
          <Col>
            <TitleText>예상시간</TitleText>
            <Row>
              <BlueText>
                {time / 3600 >= 1.0
                  ? (time / 3600).toFixed(0) +
                    "시간 " +
                    (time / 60).toFixed(0) +
                    "분 "
                  : (time / 60).toFixed(0) + "분 "}
              </BlueText>
              <TitleText>{(distance / 1000).toFixed(2)} km</TitleText>
            </Row>
          </Col>
          <VerticalBar />
          <Col>
            <TitleText>예상금액</TitleText>
            <BlueText>약 {cost}원</BlueText>
          </Col>
        </>
      )}
    </Container>
  );
};

const VerticalBar = styled.View`
  border-width: 0.3px;
  border-color: #707070;
  height: 48px;
`;
const Col = styled.View`
  flex-direction: column;
  align-items: center;
`;
const DownText = styled.View``;
const Row = styled.View`
  align-items: flex-end;
  flex-direction: row;
`;
const BlueText = styled.Text`
  color: #276fff;
  font-size: 15px;
  font-weight: bold;
  padding-top: 3px;
`;
const TitleText = styled.Text`
  font-size: 11px;
  font-weight: bold;
`;
const Container = styled.View`
  position: absolute;
  bottom: 106px;
  left: 70px;
  width: ${(windowWidth - 80).toString()}px;
  height: 72px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
