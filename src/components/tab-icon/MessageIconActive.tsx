import React from "react";
import Svg, { Path, Circle, G, Defs, Text, TSpan } from 'react-native-svg';
import { View } from 'react-native';

export function MessageIconActive() {
    return (
        <View style={{ height: 22.22, justifyContent: "center", alignItems: "center" }}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
        >
            <Path
                fill="#76a2eb"
                d="M20 2H4a2 2 0 00-1.99 2L2 22l4-4h14a2.006 2.006 0 002-2V4a2.006 2.006 0 00-2-2zM6 9h12v2H6zm8 5H6v-2h8zm4-6H6V6h12z"
                data-name="패스 420"
                transform="translate(-2 -2)"
            ></Path>
        </Svg>
        </View>
    );
}

