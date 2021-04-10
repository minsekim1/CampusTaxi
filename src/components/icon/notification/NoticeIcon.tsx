import React from "react";
import Svg, {
  Path,
  Circle,
  G,
  Defs,
  Text,
  Ellipse,
  TSpan,
} from "react-native-svg";

type Props = {
  color?: string;
};
export const NoticeIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="13.928"
      height="14.396"
      viewBox="0 0 13.928 14.396"
    >
      <G data-name="Event Icon" transform="translate(.509 .52)">
        <G data-name="그룹 54" transform="translate(0 4.648)">
          <G data-name="그룹 53">
            <Path
              fill="#fff"
              stroke={color ? color :"#4862a7"}
              strokeWidth="1"
              d="M12.866 2.734L11.654.348A.615.615 0 0011.11 0H1.801a.615.615 0 00-.544.348L.045 2.734a.412.412 0 00.016.4.364.364 0 00.311.178h.987v4.8a.6.6 0 00.572.618h9.05a.6.6 0 00.572-.618v-2.06a.2.2 0 00-.392 0v2.06a.21.21 0 01-.18.226h-4.33V1.016l1.022 2.012a.506.506 0 00.448.285h3.04v1.824a.2.2 0 10.392 0V3.313h.987a.364.364 0 00.311-.178.412.412 0 00.015-.401zM.392 2.92a.018.018 0 010-.008L1.604.526a.226.226 0 01.2-.134h4.335L4.891 2.848h0a.117.117 0 01-.1.071zm5.867 5.417h-4.33a.21.21 0 01-.18-.226v-4.8h3.04a.506.506 0 00.448-.285l1.022-2.012zM8.121 2.92a.117.117 0 01-.1-.071L6.773.393h4.335a.226.226 0 01.2.134l1.212 2.386a.018.018 0 010 .008z"
              data-name="패스 324"
            ></Path>
          </G>
        </G>
        <G data-name="그룹 56" transform="translate(4.07)">
          <G data-name="그룹 55">
            <Path
              fill="#fff"
              stroke={color ? color :"#4862a7"}
              strokeWidth="1"
              d="M2.385.609A1.29 1.29 0 000 1.293a3.233 3.233 0 001.828 2.643.2.2 0 00.2-.338A2.991 2.991 0 01.393 1.292.9.9 0 011.41.4a.946.946 0 01.691.486.366.366 0 00.575-.003.935.935 0 01.8-.491.9.9 0 01.9.9A2.962 2.962 0 012.741 3.6a.2.2 0 00.2.336 3.22 3.22 0 001.827-2.645A1.29 1.29 0 002.385.609z"
              data-name="패스 325"
            ></Path>
          </G>
        </G>
      </G>
    </Svg>
  );
};
