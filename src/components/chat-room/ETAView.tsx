import styled from "@emotion/native";
import React from "react";
import { copyToClipboard } from "../button/CopyToClipboard";
import { GenderColor } from "../color/GenderColor";
import { DottedLine } from "../icon/chat/DottedLine";
import { MarkerSVG } from "../icon/chat/MarkerSVG";

type Props = {
	gender: number;
	start_address?: string;
	end_address?: string;
	start_time?: string;
}
export const ETAView: React.FC<Props>= (
{	gender,
	start_address,
	end_address,
	start_time}
) => {
	  const ClipeboardOnPressStart = () =>
    copyToClipboard(
      start_address,
      "출발지가 클립보드에 복사되었습니다."
    );
  const ClipeboardOnPressEnd = () =>
    copyToClipboard(
      end_address,
      "도착지가 클립보드에 복사되었습니다."
    );
	return (
		<Container>
        <TopView>
          <LeftView>
            <MarkerSVG type="start" />
          </LeftView>
          <RightView>
            <Clipeboard onPress={ClipeboardOnPressStart}>
              <PlaceText gender={gender}>
                {start_address}
              </PlaceText>
            </Clipeboard>
          </RightView>
        </TopView>
        <MidView>
          <LeftView>
            <DottedLine />
          </LeftView>
          <RightView>
            <StartTime>{start_time} 탑승</StartTime>
          </RightView>
        </MidView>
        <BottomView>
          <LeftView>
            <MarkerSVG type="end" />
          </LeftView>
          <RightView>
            <Clipeboard onPress={ClipeboardOnPressEnd}>
              <PlaceText gender={gender}>
                {end_address}
              </PlaceText>
            </Clipeboard>
          </RightView>
        </BottomView>
      </Container>
	);
};
const StartTime = styled.Text`
  text-align: right;
  font-size: 10px;
  margin-bottom: 10px;
  margin-right: 20px;
`;
const Clipeboard = styled.TouchableOpacity``;
const PlaceText = styled.Text`
  border-width: 1px;
  border-color: ${(props: any) => GenderColor(props.gender)};
  border-radius: 21px;
  width: 100%;
  padding: 5px 11px;
`;
const Container = styled.View`
  margin-top: 10px;
  width: 80%;
  justify-content: center;
  align-items: center;
`;
const TopView = styled.View`
  flex-direction: row;
`;
const MidView = styled.View`
  flex-direction: row;
`;
const BottomView = styled.View`
  flex-direction: row;
`;
const LeftView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const RightView = styled.View`
  flex: 5;
  justify-content: center;
`;
      