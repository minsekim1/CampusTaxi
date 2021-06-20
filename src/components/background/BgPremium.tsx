import React from "react";
import Svg, { Path, Circle, G, Defs, Text, Ellipse, Rect, LinearGradient, Stop, ClipPath } from 'react-native-svg';

export function BgPremium() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="1296"
      viewBox="0 0 375 1296"
    >
      <Defs>
        <LinearGradient
          id="linear-gradient"
          x1="0.832"
          x2="0.221"
          y1="1.042"
          y2="1.062"
          gradientUnits="objectBoundingBox"
        >
          <Stop offset="0" stopColor="#fff"></Stop>
          <Stop offset="1" stopColor="#dee9fa"></Stop>
        </LinearGradient>
        <ClipPath id="clip-결제페이_10">
          <Path d="M0 0H375V1296H0z"></Path>
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip-결제페이_10)" data-name="결제페이 – 10">
        <Path fill="#fff" d="M0 0H375V1296H0z"></Path>
        <G
          fill="url(#linear-gradient)"
          data-name="그룹 379"
          transform="translate(-38.077 102.926)"
        >
          <Rect
            width="419.052"
            height="39.568"
            data-name="사각형 1971"
            rx="5"
            transform="rotate(146 92.443 496.169)"
          ></Rect>
          <Rect
            width="164"
            height="10"
            data-name="사각형 1962"
            rx="5"
            transform="rotate(-34 290.092 -412.43)"
          ></Rect>
          <Rect
            width="164"
            height="10"
            data-name="사각형 2002"
            rx="5"
            transform="rotate(-34 1372.393 -124.457)"
          ></Rect>
          <Rect
            width="164"
            height="10"
            data-name="사각형 1965"
            rx="5"
            transform="rotate(-34 153.092 35.676)"
          ></Rect>
          <Rect
            width="257"
            height="47.031"
            data-name="사각형 1963"
            rx="23.515"
            transform="rotate(-34 379.556 -298.441)"
          ></Rect>
          <Rect
            width="465.112"
            height="91.098"
            data-name="사각형 1970"
            rx="5"
            transform="rotate(-34 1377.963 621.16)"
          ></Rect>
          <Rect
            width="257"
            height="10"
            data-name="사각형 1964"
            rx="5"
            transform="rotate(-34 405.61 221.747)"
          ></Rect>
        </G>
      </G>
    </Svg>
  );
}


export default BgPremium;
