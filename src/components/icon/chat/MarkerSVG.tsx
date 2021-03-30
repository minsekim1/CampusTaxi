import React from "react";
import Svg, { Path, Circle, G, Defs, Text, Ellipse,TSpan } from 'react-native-svg';

type Props = {
	type: 'start' | 'end';
};
export const MarkerSVG: React.FC<Props> = ({ type }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="26.208"
      viewBox="0 0 17 26.208"
    >
      <G
        fill={type=='start' ? '#749DFA' : "#EF5152"}
        data-name="그룹 321"
        transform="translate(-33 -356.643)"
      >
        <Path
          d="M8.3 0l7.786 15H.5z"
          data-name="패스 423"
          transform="rotate(180 24.9 191.425)"
        ></Path>
        <Ellipse
          cx="8.5"
          cy="8"
          data-name="타원 40"
          rx="8.5"
          ry="8"
          transform="translate(33 356.643)"
        ></Ellipse>
      </G>
    </Svg>
  );
}

