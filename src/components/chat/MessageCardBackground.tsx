import styled from '@emotion/native';
import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

type Props = {
  isRight?: boolean;
  length: number;
};
export const MessageCardBackground: React.FC<Props> = ({ isRight = false, length }) => {
  return (
    <Container>
      {isRight ? (
        <Svg width="272.802" height={18 * length + 20} viewBox={`0 0 272.802 ${18 * length + 20}`}>
          <Rect
            width="257.108"
            height={18 * length + 18}
            rx="9.5"
            transform="translate(0.5 0.5)"
            fill="#fff"
            stroke="#b7b7bb"
            stroke-width="1"
          />
          <Path
            d="M2231.5,521.262s7.8.866,13.331,4.505c5.152,3.388-5.908-10.291-13.331-13.511C2231.247,512.143,2231.5,521.262,2231.5,521.262Z"
            transform="translate(-1973.9 -494.102)"
            fill="#fff"
            stroke="#b7b7bb"
            stroke-width="1"
          />
        </Svg>
      ) : (
        <Svg width="219.801" height={18 * length + 20} viewBox={`0 0 219.801 ${18 * length + 20}`}>
          <Rect
            width="207.919"
            height="38"
            rx="9.5"
            transform="translate(219.801 38) rotate(180)"
            fill="#e5e5e8"
          />
          <Path
            d="M2230.23,517s6.846-1.052,11.321-4.789-5.638,12.825-11.321,14.339S2230.23,517,2230.23,517Z"
            transform="translate(2242.662 544.222) rotate(180)"
            fill="#e5e5e8"
          />
        </Svg>
      )}
    </Container>
  );
};

const Container = styled.View``;
