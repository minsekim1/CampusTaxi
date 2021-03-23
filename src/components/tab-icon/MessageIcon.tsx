import React from "react";
import Svg, { Path, Circle, G, Defs, Text, TSpan } from 'react-native-svg';
import { View } from 'react-native';

export function MessageIcon() {
    return (
        <View style={{ height: 22.22, justifyContent: "center", alignItems: "center" }}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="21.301"
            height="22.22"
            viewBox="0 0 21.301 22.22"
        >
            <G data-name="그룹 272" transform="translate(-119.349 -765.35)">
                <Path
                    fill="none"
                    stroke="#707070"
                    strokeWidth="1.3"
                    d="M138 766h-16a2 2 0 00-1.99 2l-.01 18 4-4h14a2.006 2.006 0 002-2v-12a2.006 2.006 0 00-2-2zm-14 7.3h12v1.928h-12zm8 5.828h-8v-2.043h8zm4-8.171h0l-12 .459v-1.95h12z"
                    data-name="패스 372"
                ></Path>
                <Path
                    fill="#fff"
                    d="M0 0H16V13H0z"
                    data-name="사각형 1873"
                    transform="translate(122 768)"
                ></Path>
                <Path
                    fill="none"
                    stroke="#707070"
                    strokeWidth="1.5"
                    d="M0 0L11 0"
                    data-name="선 197"
                    transform="translate(124.5 770.5)"
                ></Path>
                <Path
                    fill="none"
                    stroke="#707070"
                    strokeWidth="1.5"
                    d="M0 0L11 0"
                    data-name="선 199"
                    transform="translate(124.5 773.5)"
                ></Path>
                <Path
                    fill="none"
                    stroke="#707070"
                    strokeWidth="1.5"
                    d="M0 0L8 0"
                    data-name="선 200"
                    transform="translate(124.5 776.5)"
                ></Path>
            </G>
        </Svg>
        </View>
    );
}

