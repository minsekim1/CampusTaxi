import React from "react";
import Svg, {
  Path,
  Circle,
  G,
  Defs,
  Text,
  Ellipse,
  TSpan,
	Rect,
} from "react-native-svg";

type Props = {
  color?: string;
};
export const MessageIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="10"
      viewBox="0 0 13 10"
    >
      <G
        stroke={color ? color :"#4862a7"}
        strokeWidth="1.5"
        data-name="메세지 아이콘"
        transform="translate(-22 -481)"
      >
        <G fill="#fff" data-name="사각형 1663" transform="translate(22 481)">
          <Rect width="13" height="10" stroke="none" rx="2"></Rect>
          <Rect
            width="11.5"
            height="8.5"
            x="0.75"
            y="0.75"
            fill="none"
            rx="1.25"
          ></Rect>
        </G>
        <Path
          fill="none"
          d="M23.146 482.113l5.325 5.258 5.3-5.258"
          data-name="패스 332"
        ></Path>
      </G>
    </Svg>
  );
};
