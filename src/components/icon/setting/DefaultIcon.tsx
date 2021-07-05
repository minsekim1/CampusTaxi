import React, { SVGProps } from "react";
import Svg, { Path, Circle, G, Defs, Text, Ellipse } from 'react-native-svg';

export function DefaultIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="72"
      height="72"
      viewBox="0 0 52 52"
    >
      <G data-name="그룹 728" transform="translate(-53 -251)">
        <Path
          fill="#e1e4f0"
          d="M-152.691 83.725a26.082 26.082 0 00-26-26.162 26.082 26.082 0 00-26 26.162 26.173 26.173 0 0011.056 21.4v-.285a14.99 14.99 0 0114.944-15.037 14.99 14.99 0 0114.943 15.037v.285a26.173 26.173 0 0011.057-21.4z"
          data-name="패스 542"
          transform="translate(257.691 193.437)"
        ></Path>
        <Path
          fill="#fff"
          d="M-172.825 104.6c-8.635 0-15.634 6.273-15.634 14.011v.266a29.263 29.263 0 0015.634 4.435 29.263 29.263 0 0015.633-4.435v-.266c0-7.734-6.999-14.011-15.633-14.011z"
          data-name="패스 543"
          transform="translate(251.826 179.684)"
        ></Path>
        <Circle
          cx="7.135"
          cy="7.135"
          r="7.135"
          fill="#fff"
          data-name="타원 132"
          transform="translate(71.865 265.398)"
        ></Circle>
      </G>
    </Svg>
  );
}

export default DefaultIcon;