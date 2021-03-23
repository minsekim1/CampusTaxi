import styled from '@emotion/native';
import React, { SVGProps } from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';

type Props = SVGProps<SVGElement>;
export const PremiumIcon: React.FC<Props> = ({ width, height }) => {
  return (
    <Box>
      <Svg width={width ?? 16} height={height ?? 16} viewBox="0 0 13 10">
        <G transform="translate(-22 -481)">
          <G transform="translate(22 481)" fill="#fff" stroke="#3b589b" stroke-width="1.5">
            <Rect width="13" height="10" rx="2" stroke="none" />
            <Rect x="0.75" y="0.75" width="11.5" height="8.5" rx="1.25" fill="none" />
          </G>
          <Path
            d="M515.146,3454.113l5.325,5.258,5.3-5.258"
            transform="translate(-492 -2972)"
            fill="none"
            stroke="#3b589b"
            stroke-width="1.5"
          />
        </G>
      </Svg>
    </Box>
  );
};

const Box = styled.View`
  margin-right: 16px;
`;
