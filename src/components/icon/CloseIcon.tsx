import styled from '@emotion/native';
import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

type Props = {
  onPress?: () => void;
};
export const CloseIcon: React.FC<Props> = ({ onPress }) => {
  return (
    <Box onPress={onPress}>
      <Svg width="14.614" height="14.614" viewBox="0 0 14.614 14.614">
        <G transform="translate(-2.027 -0.007)">
          <Path
            d="M465.171,1556.235h18.667"
            transform="translate(-1426.617 -757.585) rotate(-45)"
            fill="none"
            stroke="#000"
            stroke-width="2"
          />
          <Path
            d="M465.171,1556.235h18.667"
            transform="translate(774.232 -1428.636) rotate(45)"
            fill="none"
            stroke="#000"
            stroke-width="2"
          />
        </G>
      </Svg>
    </Box>
  );
};

const Box = styled.TouchableOpacity`
  padding: 4px;
`;
