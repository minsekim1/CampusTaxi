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
  data?: {
    time: number;
    cost: string;
    distance: number;
  };
};

export const SelectedBottomView: React.FC<Props> = ({ data: d  }) => {

  if (!d) return <></>;
    console.log('data seleB:',d)
  return (
    <Container>
      {d.time == -1 ? (
        <ActivityIndicator size="large" color={LogoColor} />
      ) : (
        <>
          <Col>
            <TitleText>예상시간</TitleText>
            <Row>
              <BlueText>
                {d.time / 3600 >= 1.0
                  ? (d.time / 3600).toFixed(0) +
                    "시간 " +
                    (d.time % 60).toFixed(0) +
                    "분 "
                  : (d.time / 60).toFixed(0) + "분 "}
              </BlueText>
              <TitleText>{(d.distance / 1000).toFixed(2)} km</TitleText>
            </Row>
          </Col>
          <VerticalBar />
          <Col>
            <TitleText>예상금액</TitleText>
            <BlueText>약 {d.cost}원</BlueText>
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
