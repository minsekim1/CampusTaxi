import React from "react";
import Svg, { Path, Circle, G, Defs, Text, Ellipse } from 'react-native-svg';

export function BackIconWhite({ color }: {color?:string}) {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width="19.352"
			height="15.471"
			viewBox="0 0 19.352 15.471"
		>
			<G
				fill="none"
				stroke={color? color:"#00567C"}
				strokeWidth="2"
				data-name="Return Button"
				transform="translate(1.414 .707)"
			>
				<Path d="M7.029 0L0 7.029l7.029 7.029" data-name="패스 266"></Path>
				<Path d="M0 7.028h17.938" data-name="패스 267"></Path>
			</G>
		</Svg>
	);
}

export default BackIconWhite;