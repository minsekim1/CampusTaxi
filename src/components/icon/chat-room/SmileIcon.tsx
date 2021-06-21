import React from "react";
import Svg, { Path, Circle, G, Defs, Text, Ellipse } from 'react-native-svg';

export function SmileIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <G stroke="#0c678e" data-name="그룹 724" transform="translate(504 17149)">
        <G
          fill="none"
          strokeWidth="1.5"
          data-name="타원 1027"
          transform="translate(-504 -17149)"
        >
          <Circle cx="12" cy="12" r="12" stroke="none"></Circle>
          <Circle cx="12" cy="12" r="11.25"></Circle>
        </G>
        <G
          fill="#0c678e"
          strokeWidth="1"
          data-name="타원 1028"
          transform="translate(-498 -17141)"
        >
          <Circle cx="2" cy="2" r="2" stroke="none"></Circle>
          <Circle cx="2" cy="2" r="1.5" fill="none"></Circle>
        </G>
        <G
          fill="#0c678e"
          strokeWidth="1"
          data-name="타원 1029"
          transform="translate(-490 -17141)"
        >
          <Circle cx="2" cy="2" r="2" stroke="none"></Circle>
          <Circle cx="2" cy="2" r="1.5" fill="none"></Circle>
        </G>
        <Path
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M-495.705-17133.543l.227.177a5.528 5.528 0 007.25 0l.227-.177"
          data-name="패스 667"
        ></Path>
      </G>
    </Svg>
  );
}
