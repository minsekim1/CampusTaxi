import styled from "@emotion/native";
import AsyncStorage from '@react-native-community/async-storage';
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { ChatRoom } from "../chat-room/ChatRoomList";
const windowWidth = Dimensions.get("window").width;
type Props = {
  data?: ChatRoom;
};
export const CreateSelectedView: React.FC<Props> = ({ data: selectRoom }) => {
  if (!selectRoom) return <></>;
  const [cost, setCost] = useState<number>(0);
  const [time, setTaxiTime] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  useEffect(() => {
    AsyncStorage.getItem(
      "route(" +
        selectRoom.end_lon +
        "," +
        selectRoom.end_lat +
        "," +
        selectRoom.start_lon +
        "," +
        selectRoom.start_lat +
        ")"
    ).then((r: any) => {
      r = JSON.parse(r);
      setCost(r.properties.taxiFare);
      setTaxiTime(r.properties.totalTime);
      setDistance(r.properties.totalDistance);
    });
  }, []);

  return (
    <Container>
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
          <TitleText>{(distance / 1000).toFixed(2)}km</TitleText>
        </Row>
      </Col>
      <VerticalBar />
      <Col>
        <TitleText>예상금액</TitleText>
        <BlueText>약 {cost}원</BlueText>
      </Col>
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
  margin-top: 30px;
  width: ${(windowWidth - 150).toString()}px;
  height: 72px;
  background-color: rgba(118, 162, 235, 0.14);
  border-radius: 8px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
