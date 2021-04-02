import React from "react";
import Svg, { Path, Circle, G, Defs, Text, Ellipse, Rect } from 'react-native-svg';

export function AddIcon() {
	return (
		<Svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="29"
      viewBox="0 0 28 29"
    >
      <G stroke="#b7b7bb" data-name="그룹 326" transform="translate(-12 -629)">
        <G
          fill="#fff"
          strokeWidth="1"
          data-name="사각형 43"
          transform="translate(12 629)"
        >
          <Rect width="28" height="29" stroke="none" rx="10"></Rect>
          <Rect
            width="27"
            height="28"
            x="0.5"
            y="0.5"
            fill="none"
            rx="9.5"
          ></Rect>
        </G>
        <Path
          fill="none"
          strokeWidth="1.5"
          d="M0 0L0 14.5"
          data-name="선 233"
          transform="translate(26.25 636)"
        ></Path>
        <Path
          fill="none"
          strokeWidth="1.5"
          d="M0 0L0 14.5"
          data-name="선 234"
          transform="rotate(90 -304.875 338.375)"
        ></Path>
      </G>
    </Svg>
	);
}