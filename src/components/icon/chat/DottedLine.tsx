import React from "react";
import Svg, { Path, Circle, G, Defs, Text, Ellipse } from 'react-native-svg';

export function DottedLine() {
	return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2"
      height="30.958"
      viewBox="0 0 1.2 30.958"
    >
      <Path
        fill="none"
        stroke="#707070"
        strokeDasharray="5"
        strokeLinecap="round"
        strokeWidth="1.2"
        d="M0 0L0 29.758"
        data-name="선 179"
        opacity="0.59"
        transform="translate(.6 .6)"
      ></Path>
    </Svg>
  );
}

