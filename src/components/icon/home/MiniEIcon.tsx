import styled from '@emotion/native';
import React from "react";
import Svg, { Path, Circle, G, Defs, Text, TSpan } from 'react-native-svg';

export function MiniEIcon() {
    return (
        <IconView>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="43"
                height="43"
                viewBox="0 0 43 43"
            >

                <G data-name="그룹 204" transform="translate(-186 -86)">
                    <G filter="url(#타원_50)" transform="translate(186 86)">
                        <Circle
                            cx="12.5"
                            cy="12.5"
                            r="12.5"
                            fill="#fff"
                            data-name="타원 50"
                            opacity="0.87"
                            transform="translate(9 6)"
                        ></Circle>
                    </G>
                    <Text
                        fill="#0d3664"
                        fontFamily="Roboto-Bold, Roboto"
                        fontSize="10"
                        fontWeight="700"
                        transform="translate(208 108)"
                    >
                        <TSpan x="-2.813" y="0">
                            E
                        </TSpan>
                    </Text>
                </G>
            </Svg>
        </IconView>
    );
}

const IconView = styled.View`
  width: 20px;
  padding:0;
  height: 20px;
  border-width: 0;
  border-radius: 50px;
  elevation: 10;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
  align-items: center;
  justify-content: center;
`;

export default MiniEIcon;
