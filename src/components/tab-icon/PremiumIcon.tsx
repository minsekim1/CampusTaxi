import React from "react";
import Svg, { Path, Circle, G, Defs, Text, TSpan, Rect } from 'react-native-svg';
import { View } from 'react-native';
export function PremiumIcon() {
    return (
        <View style={{height: 22.22, justifyContent: "center", alignItems: "center"}}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="42.908"
            height="17.84"
            viewBox="0 0 42.908 17.84"
        >
            <G fill="none" stroke="#707070" strokeWidth="1.3" data-name="사각형 1900">
                <Rect width="42.908" height="17.84" stroke="none" rx="8.92"></Rect>
                <Rect width="41.608" height="16.54" x="0.65" y="0.65" rx="8.27"></Rect>
            </G>
            <Text
                fill="#707070"
                fontFamily="Roboto-Bold, Roboto"
                fontSize="10"
                fontWeight="700"
                transform="translate(22 13)"
            >
                <TSpan x="-7.952" y="0">
                    VIP
        </TSpan>
            </Text>
            </Svg>
        </View>
    );
}

