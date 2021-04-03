import React from "react";
import Svg, { Path, Circle, G, Defs, Text, Ellipse,TSpan, Rect } from 'react-native-svg';

type Props = {
	isActive?: boolean;
};
export const DownArrowIcon: React.FC<Props> = ({ isActive }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="22.131"
      height="12.131"
      viewBox="0 0 22.131 12.131"
    >
      <G
        fill="none"
        stroke={isActive ? '#707070' : "#B7B7BB"}
        strokeWidth="1.6"
        data-name="그룹 329"
        transform="rotate(180 157.533 295.033)"
      >
        <Path
          d="M0 11L11 0"
          data-name="선 235"
          transform="translate(293.5 578.5)"
        ></Path>
        <Path
          d="M11 11L0 0"
          data-name="선 236"
          transform="translate(303.5 578.5)"
        ></Path>
      </G>
    </Svg>
  );
}

