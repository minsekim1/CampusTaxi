import React, { SVGProps } from "react";
import Svg, { Path, Circle, G, Defs, Text, Ellipse } from 'react-native-svg';

export function  PlusIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
    >
      <G strokeWidth="1" data-name="그룹 383" transform="translate(-77 -142)">
        <G
          fill="#fff"
          stroke="#828282"
          data-name="타원 85"
          transform="translate(77 142)"
        >
          <Circle cx="8.5" cy="8.5" r="8.5" stroke="none"></Circle>
          <Circle cx="8.5" cy="8.5" r="8" fill="none"></Circle>
        </G>
        <G
          fill="none"
          stroke="#707070"
          data-name="그룹 352"
          transform="translate(18 -60)"
        >
          <Path
            d="M0 0L8 0"
            data-name="선 233"
            transform="translate(63.5 210.5)"
          ></Path>
          <Path
            d="M0 0L0 8.5"
            data-name="선 234"
            transform="translate(67.5 206.25)"
          ></Path>
        </G>
      </G>
    </Svg>
  );
}

export default PlusIcon;