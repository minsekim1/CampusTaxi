import React from "react";
import Svg, { Path, Circle, G, Defs, Text, Ellipse,TSpan, Rect } from 'react-native-svg';

type Props = {
	isActive?: boolean;
};
export const SendIcon: React.FC<Props> = ({ isActive }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="28"
      viewBox="0 0 35 28"
    >
      <G data-name="그룹 330" transform="translate(-332 -629)">
        <G
          fill={isActive ? '#FFF' : "#FAF9F9"}
          stroke={isActive ? '#707070' : "#B7B7BB"}
          strokeWidth="1"
          data-name="사각형 1919"
          transform="translate(332 629)"
        >
          <Rect width="35" height="28" stroke="none" rx="5"></Rect>
          <Rect
            width="34"
            height="27"
            x="0.5"
            y="0.5"
            fill="none"
            rx="4.5"
          ></Rect>
        </G>
        <Text
          fill={isActive ? '#707070' : "#B7B7BB"}
          fontFamily="AppleSDGothicNeo-Regular, Apple SD Gothic Neo"
          fontSize="10"
          transform="translate(341 646)"
        >
          <TSpan x="0" y="0">
            전송
          </TSpan>
        </Text>
      </G>
    </Svg>
  );
}

