import React, { SVGProps } from 'react';
import Svg, { Path, Circle, G } from 'react-native-svg';

type Props = SVGProps<SVGElement>;
export const EtcIcon: React.FC<Props> = ({ width, height }) => {
  return (
    <Svg width={width ?? 45.531} height={height ?? 43.589} viewBox="0 0 45.531 43.589">
      <G
        fill="none"
        stroke="#414141"
        strokeWidth="1.3"
        data-name="그룹 254"
        transform="translate(-2894.525 -1036.581)"
      >
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2929.747 1044.694l-17.991 16.925.991.4.717.772.6 1.03 17.147-16.956 1.762-.677 4.141-4.427v-2.586h-2.6l-4.151 3.717z"
          data-name="패스 416"
        ></Path>
        <Path
          d="M2916.024 1057.438a4.923 4.923 0 00-4.546-1.914c-2.96.394-5.488 4.849-5.488 4.849s-.189.364-.2.425a20.359 20.359 0 00-6.109 1.87 8.366 8.366 0 00-3.288 3.05 8.043 8.043 0 000 8.073 11.882 11.882 0 006.6 5.716 9.741 9.741 0 006.146-.446c2.872-1.376 4.25-8.511 4.25-8.511l.45-.625a43.522 43.522 0 004.043-3c.577-.666 1.609-3.021-1.43-5.631"
          data-name="패스 418"
        ></Path>
        <Path
          strokeLinecap="round"
          d="M2901.815 1066.898c5.8 6.55 5.955 6.772 5.955 6.772"
          data-name="패스 419"
        ></Path>
        <G data-name="타원 60" transform="translate(2907.5 1061)">
          <Circle cx="3.5" cy="3.5" r="3.5" stroke="none"></Circle>
          <Circle cx="3.5" cy="3.5" r="2.85"></Circle>
        </G>
        <Path
          strokeLinecap="round"
          d="M0 1L1 0"
          data-name="선 197"
          transform="translate(2933 1047.5)"
        ></Path>
        <Path
          strokeLinecap="round"
          d="M0 1L1 0"
          data-name="선 198"
          transform="translate(2936 1045)"
        ></Path>
        <Path
          strokeLinecap="round"
          d="M0 1L1 0"
          data-name="선 199"
          transform="translate(2938.5 1042.5)"
        ></Path>
        <Path
          strokeLinecap="round"
          d="M0 1L1 0"
          data-name="선 200"
          transform="translate(2932.5 1037.5)"
        ></Path>
        <Path
          strokeLinecap="round"
          d="M0 1L1 0"
          data-name="선 201"
          transform="translate(2927.5 1042)"
        ></Path>
        <Path
          strokeLinecap="round"
          d="M0 1L1 0"
          data-name="선 202"
          transform="translate(2930 1039.5)"
        ></Path>
      </G>
    </Svg>
  );
};
