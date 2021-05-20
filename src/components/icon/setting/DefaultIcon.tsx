import React, { SVGProps } from "react";
import Svg, { Path, Circle, G, Defs, Text, Ellipse } from 'react-native-svg';

export function DefaultIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="45.951"
      height="45.952"
      viewBox="0 0 45.951 45.952"
    >
      <G data-name="그룹 398" transform="rotate(-5.13 42.405 1.95)">
        <G data-name="그룹 471">
          <Circle
            cx="21.208"
            cy="21.208"
            r="21.208"
            fill="#e8e9f2"
            data-name="타원 113"
          ></Circle>
          <Path
            fill="#fff"
            d="M0 12.382A12.961 12.961 0 0122.112 3.8a12.866 12.866 0 013.783 8.587A22.182 22.182 0 0112.947 16.5 22.183 22.183 0 010 12.382z"
            data-name="교차 5"
            transform="translate(7.082 25.921)"
          ></Path>
        </G>
        <Ellipse
          cx="5.891"
          cy="7.069"
          fill="#fff"
          data-name="타원 114"
          rx="5.891"
          ry="7.069"
          transform="translate(16.495 9.426)"
        ></Ellipse>
      </G>
    </Svg>
  );
}

export default DefaultIcon;