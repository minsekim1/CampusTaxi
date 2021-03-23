import React from "react";
import Svg, { Path, Circle, G, Defs, Text, TSpan } from 'react-native-svg';
import { View } from 'react-native';

export function SettingIcon() {
    return (
        <View style={{ height: 22.22, justifyContent: "center", alignItems: "center" }}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="20.055"
            height="20.5"
            viewBox="0 0 20.055 20.5"
        >
            <Path
                fill="none"
                stroke="#707070"
                strokeWidth="1.3"
                d="M17.167 11.19a7.074 7.074 0 00.06-.94 5.777 5.777 0 00-.07-.94l2.03-1.58a.491.491 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96a7.064 7.064 0 00-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84a.474.474 0 00-.47.41l-.36 2.54a7.22 7.22 0 00-1.62.94l-2.39-.96a.477.477 0 00-.59.22L.767 7.12a.455.455 0 00.12.61l2.03 1.58a5.563 5.563 0 00-.02 1.88l-2.03 1.58a.491.491 0 00-.12.61l1.92 3.32a.488.488 0 00.59.22l2.39-.96a7.064 7.064 0 001.62.94l.36 2.54a.492.492 0 00.48.41h3.84a.466.466 0 00.47-.41l.36-2.54a6.859 6.859 0 001.62-.94l2.39.96a.477.477 0 00.59-.22l1.92-3.32a.463.463 0 00-.12-.61zm-7.14 2.66a3.6 3.6 0 113.6-3.6 3.611 3.611 0 01-3.6 3.6z"
                data-name="패스 427"
            ></Path>
        </Svg>
        </View>
    );
}
