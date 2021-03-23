import React from "react";
import Svg, { Path, Circle, G, Defs, Text, TSpan, Image } from 'react-native-svg';

export const TextFieldCancleIcon: React.FC<Props> = ({ width, height }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width ?? 13} height={height ?? 13}
            viewBox="0 0 13 13"
        >
            <G
                strokeWidth="1"
                data-name="그룹 261"
                transform="translate(-292 -117.046)"
            >
                <G
                    fill="#b7b7bb"
                    stroke="#b7b7bb"
                    data-name="타원 68"
                    opacity="0.75"
                    transform="translate(292 117.046)"
                >
                    <Circle cx="6.5" cy="6.5" r="6.5" stroke="none"></Circle>
                    <Circle cx="6.5" cy="6.5" r="6" fill="none"></Circle>
                </G>
                <G
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    data-name="Return Button"
                    opacity="0.86"
                    transform="translate(296.091 121.013)"
                >
                    <Path d="M0 4.623L4.622.001" data-name="패스 267"></Path>
                    <Path d="M0 0l4.622 4.622" data-name="패스 343"></Path>
                </G>
            </G>
        </Svg>
    );
};

export default TextFieldCancleIcon;
