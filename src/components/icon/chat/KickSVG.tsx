import React from "react";
import Svg, { Path, Circle, G, Defs, Text, Ellipse,TSpan } from 'react-native-svg';

type Props = {
	color?: string;
};
export const KickSGV: React.FC<Props> = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="17.442"
      height="33.867"
      viewBox="0 0 17.442 33.867"
    >
      <G data-name="그룹 216" transform="translate(-287.845 -147.99)">
        <Text
          fill={color ? color : "black"}
          fontFamily="AppleSDGothicNeo-Bold, Apple SD Gothic Neo"
          fontSize="9"
          fontWeight="700"
          transform="translate(288.966 178.857)"
        >
          <TSpan x="0" y="0">
            강퇴
          </TSpan>
        </Text>
        <G
          fill="none"
          stroke={color ? color : "black"}
          strokeLinecap="round"
          strokeWidth="3"
          data-name="Return Button"
          transform="translate(287.232 149.397)"
        >
          <Path d="M2.733 13.914l13.2-13.2" data-name="패스 267"></Path>
          <Path d="M2.733.714l13.2 13.2" data-name="패스 343"></Path>
        </G>
      </G>
    </Svg>
  );
}

