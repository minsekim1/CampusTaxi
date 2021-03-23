import React from "react";
import Svg, { Path, Circle, G, Defs, Text, Ellipse } from 'react-native-svg';

export function ArriveIcon() {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="26"
            viewBox="0 0 17 26"
        >
            <G
                fill="#FD6A6A"
                data-name="그룹 256"
                transform="translate(-188 -191.334)"
            >
                <Path
                    d="M7.5 0L15 15H0z"
                    data-name="다각형 16"
                    transform="rotate(180 102 108.667)"
                ></Path>
                <Ellipse
                    cx="8.5"
                    cy="8"
                    data-name="타원 40"
                    rx="8.5"
                    ry="8"
                    transform="translate(188 191.334)"
                ></Ellipse>
            </G>
        </Svg>
    );
}

export default ArriveIcon;
