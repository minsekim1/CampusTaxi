import React, { SVGProps } from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';

type Props = SVGProps<SVGElement>;
export const CreateRoomSelectCancel: React.FC<Props> = ({ width, height }) => {
	return (
			<Svg
				xmlns="http://www.w3.org/2000/svg"
				width={width ?? 14} height={height ?? 14}
				viewBox="0 0 14 14"
			>
				<G transform="translate(-344 -170)">
					<Circle
						cx="7"
						cy="7"
						r="7"
						fill="#555252"
						transform="translate(344 170)"
					></Circle>
					<Path
						fill="none"
						stroke="#fff"
						strokeWidth="1.3"
						d="M7 0L0 7"
						transform="translate(347.5 173.5)"
					></Path>
					<Path
						fill="none"
						stroke="#fff"
						strokeWidth="1.3"
						d="M7 0L0 7"
						transform="rotate(90 90.5 264)"
					></Path>
				</G>
			</Svg>
	);
};
