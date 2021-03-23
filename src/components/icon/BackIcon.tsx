import styled from '@emotion/native';
import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

type Props = {
  onPress?: () => void;
};
export const BackIcon: React.FC<Props> = ({ onPress }) => {
  return (
    <Box onPress={onPress}>
      <Svg width="20.081" height="16.043" viewBox="0 0 20.081 16.043">
        <G transform="translate(1.414 0.707)">
          <Path
            d="M472.486,1548.91l-7.314,7.314,7.314,7.314"
            transform="translate(-465.171 -1548.91)"
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />
          <Path
            d="M465.171,1556.235h18.667"
            transform="translate(-465.171 -1548.921)"
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />
        </G>
      </Svg>
    </Box>
  );
};

const Box = styled.TouchableOpacity`
  padding: 4px;
`;
