import React from "react";
import Svg, { Path, Circle, G, Defs, Text, TSpan } from 'react-native-svg';
import { View } from 'react-native';
export function HomeIcon() {
    return (
        <View style={{ height: 22.22, justifyContent: "center", alignItems: "center" }}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="22.169"
            height="21.171"
            viewBox="0 0 22.169 21.171"
        >
            <G transform="translate(.672 .728)">
                <G data-name="그룹 2">
                    <G data-name="그룹 1">
                        <Path
                            fill="none"
                            stroke="#707070"
                            strokeWidth="1.3"
                            d="M20.475 8.794L11.132.28a1.063 1.063 0 00-1.438 0L.35 8.794a1.068 1.068 0 00.719 1.857h1.492v8.53a.612.612 0 00.612.612h5.122a.612.612 0 00.612-.612v-5.179h3.01v5.179a.612.612 0 00.612.612h5.121a.612.612 0 00.612-.612v-8.53h1.493a1.068 1.068 0 00.719-1.857z"
                            data-name="패스 5"
                        ></Path>
                    </G>
                </G>
                <G data-name="그룹 4" transform="translate(13.99 1.222)">
                    <G data-name="그룹 3">
                        <Path
                            fill="none"
                            stroke="#707070"
                            strokeWidth="1.3"
                            d="M4.113 0H0l4.725 4.3V.612A.612.612 0 004.113 0z"
                            data-name="패스 6"
                        ></Path>
                    </G>
                </G>
            </G>
        </Svg>
        </View>
    );
}

