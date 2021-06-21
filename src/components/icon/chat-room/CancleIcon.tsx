import React from "react";
import Svg, { Path, Circle, G, Defs, Text, Ellipse } from 'react-native-svg';

export function CancleIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25.456"
      height="25.456"
      viewBox="0 0 25.456 25.456"
    >
      <G data-name="그룹 725" transform="translate(-2717.272 1913.728)">
        <G
          fill="#fff"
          stroke="#707070"
          strokeWidth="1"
          data-name="그룹 724"
          transform="rotate(45 2730 -1901)"
        >
          <G data-name="타원 1030" transform="translate(2721 -1910)">
            <Circle cx="9" cy="9" r="9" stroke="none"></Circle>
            <Circle cx="9" cy="9" r="8.5" fill="none"></Circle>
          </G>
          <G data-name="사각형 2156" transform="translate(2725 -1902)">
            <Path stroke="none" d="M0 0H10V2H0z"></Path>
            <Path fill="none" d="M0.5 0.5H9.5V1.5H0.5z"></Path>
          </G>
          <G data-name="사각형 2157" transform="translate(2729 -1906)">
            <Path stroke="none" d="M0 0H2V10H0z"></Path>
            <Path fill="none" d="M0.5 0.5H1.5V9.5H0.5z"></Path>
          </G>
        </G>
      </G>
    </Svg>
  );
}
