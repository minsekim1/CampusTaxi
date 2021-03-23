import React, { SVGProps } from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';

type Props = SVGProps<SVGElement>;
export const BusIcon: React.FC<Props> = ({ width, height }) => {
  return (
    <Svg width={width ?? 36} height={height ?? 41} viewBox="0 0 36.186 41.299">
      <G transform="translate(-167.859 -274.523)">
        <G transform="translate(175 302)" fill="#ff9515" stroke="#ff9515" stroke-width="1">
          <Rect width="6" height="3" stroke="none" />
          <Rect x="0.5" y="0.5" width="5" height="2" fill="none" />
        </G>
        <G transform="translate(191 302)" fill="#ff9515" stroke="#ff9515" stroke-width="1">
          <Rect width="6" height="3" stroke="none" />
          <Rect x="0.5" y="0.5" width="5" height="2" fill="none" />
        </G>
        <G transform="translate(169 282)" fill="#ff9515" stroke="#ff9515" stroke-width="1">
          <Rect width="3" height="9" stroke="none" />
          <Rect x="0.5" y="0.5" width="2" height="8" fill="none" />
        </G>
        <G transform="translate(200 282)" fill="#ff9515" stroke="#ff9515" stroke-width="1">
          <Rect width="3" height="9" stroke="none" />
          <Rect x="0.5" y="0.5" width="2" height="8" fill="none" />
        </G>
        <G transform="translate(167.859 274.523)">
          <G transform="translate(6.155 26.904)">
            <G>
              <Path
                d="M77.3,216.8H70.945a.763.763,0,0,0-.745.745v2.829a.763.763,0,0,0,.745.745H77.3a.763.763,0,0,0,.745-.745v-2.829A.731.731,0,0,0,77.3,216.8Zm-3.921,2.829H71.689v-1.34h1.688Zm3.177-.05H74.866v-1.34h1.688Z"
                transform="translate(-70.2 -216.8)"
                fill="#414141"
              />
            </G>
          </G>
          <G transform="translate(21.742 26.904)">
            <G>
              <Path
                d="M202.9,216.8h-6.354a.763.763,0,0,0-.745.745v2.829a.763.763,0,0,0,.745.745H202.9a.763.763,0,0,0,.745-.745v-2.829A.731.731,0,0,0,202.9,216.8Zm-3.921,2.829h-1.688v-1.34h1.688Zm3.177-.05h-1.688v-1.34h1.688Z"
                transform="translate(-195.8 -216.8)"
                fill="#414141"
              />
            </G>
          </G>
          <G transform="translate(14.345 3.177)">
            <G transform="translate(0)">
              <Path
                d="M142.454,25.6h-5.51a.745.745,0,1,0,0,1.489h5.51a.745.745,0,0,0,0-1.489Z"
                transform="translate(-136.2 -25.6)"
                fill="#414141"
              />
            </G>
          </G>
          <G>
            <Path
              d="M54.354,6.8h-.943V4.914A4.894,4.894,0,0,0,48.5,0H28.84a4.894,4.894,0,0,0-4.914,4.914V6.8h-.943A2.426,2.426,0,0,0,20.6,9.233v5.51a2.436,2.436,0,0,0,2.432,2.432h.943V39.264A2.044,2.044,0,0,0,26.011,41.3h5.957A2.044,2.044,0,0,0,34,39.264V37.328h9.382v1.936A2.044,2.044,0,0,0,45.419,41.3h5.957a2.044,2.044,0,0,0,2.035-2.035V17.175h.943a2.436,2.436,0,0,0,2.432-2.432V9.233A2.436,2.436,0,0,0,54.354,6.8ZM23.926,15.686h-.943a.942.942,0,0,1-.943-.943V9.233a.942.942,0,0,1,.943-.943h.943ZM31.868,39.81H25.911a.551.551,0,0,1-.546-.546V35.938a4.971,4.971,0,0,0,3.425,1.39h3.574v1.936h.05A.551.551,0,0,1,31.868,39.81Zm19.309,0H45.221a.551.551,0,0,1-.546-.546V37.328h3.574a4.971,4.971,0,0,0,3.425-1.39v3.326A.483.483,0,0,1,51.177,39.81Zm.546-8.935v1.588A3.432,3.432,0,0,1,48.3,35.889H28.84a3.432,3.432,0,0,1-3.425-3.425V25.514h26.11c.1,0,.149,0,.2-.05Zm0-6.751c-.05,0-.149-.05-.2-.05H50.036l-10.97-7.148a.75.75,0,0,0-.844,1.241l9.034,5.857H38.668l-10.92-7.1a.75.75,0,1,0-.844,1.241l9.034,5.857H25.415V8.29H51.723Zm0-17.324H25.415V4.914A3.432,3.432,0,0,1,28.84,1.489H48.3a3.432,3.432,0,0,1,3.425,3.425Zm3.326,7.942a.942.942,0,0,1-.943.943h-.943V8.29h.943a.942.942,0,0,1,.943.943Z"
              transform="translate(-20.6)"
              fill="#414141"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
};
