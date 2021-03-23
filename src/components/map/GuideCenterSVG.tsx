import React from "react";
import styled from '@emotion/native';
import { View, Dimensions } from "react-native"
import Svg, { Path, Circle, G, Defs, Text, Ellipse } from 'react-native-svg';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export function GuideCenterSVG() {
	return (
		<Center hitSlop={{ top: -320, bottom: -320, left: -320, right: -320 }}>
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width="127"
			height="130"
			viewBox="0 0 127 130"
		>
			<G
				fill="none"
				stroke="#707070"
				strokeDasharray="2"
				strokeWidth="1"
				data-name="그룹 302"
				transform="translate(-126.5 -300.5)"
			>
				<Path
					d="M0 0L0 130"
					data-name="선 224"
					transform="translate(186.5 300.5)"
				></Path>
				<Path
					d="M0 0L127 0"
					data-name="선 225"
					transform="translate(126.5 365.5)"
				></Path>
			</G>
			</Svg>
		</Center>
	);
}
const Center = styled.View`
	position: absolute;
	top: ${(windowHeight / 2 - 100).toString()}px;
	left: ${(windowWidth / 2 - 60).toString()}px;
	height: 0px;
	width: 0px;
`;