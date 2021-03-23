import React from "react";
import Svg, { Path, Circle, G, Defs, TSpan, Rect, Text } from 'react-native-svg';
import { View } from 'react-native';

export function PremiumIconActive() {
    return (
        <View style={{ height: 22.22, justifyContent: "center", alignItems: "center" }}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="42.908"
            height="17.84"
            viewBox="0 0 42.908 17.84"
        >
            <G data-name="그룹 302" transform="translate(-212 -767)">
                <Rect
                    width="42.908"
                    height="17.84"
                    fill="#76a2eb"
                    data-name="사각형 1833"
                    rx="8.92"
                    transform="translate(212 767)"
                ></Rect>
                <Text
                    fill="#fff"
                    fontFamily="Roboto-Bold, Roboto"
                    fontSize="10"
                    fontWeight="700"
                    transform="translate(234 780)"
                >
                    <TSpan x="-7.952" y="0">
                        VIP
          </TSpan>
                </Text>
            </G>
        </Svg>
        </View>
    );
}

