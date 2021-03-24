import React from "react";
import Svg, { Path, Circle, G, Defs, Text, Ellipse } from 'react-native-svg';

type Props = {
	fill?: string;
};
export const SearchIcon: React.FC<Props> = ({ fill }) => {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width="23"
			height="23"
			data-name="그룹 157"
			viewBox="0 0 16.984 16.985"
		>
			<G fill="none" stroke={fill ? fill : "none"} strokeWidth="1.5" data-name="Search Icon">
				<G data-name="타원 6">
					<Ellipse
						cx="6.705"
						cy="6.705"
						stroke="none"
						rx="6.705"
						ry="6.705"
					></Ellipse>
					<Ellipse cx="6.705" cy="6.705" rx="5.955" ry="5.955"></Ellipse>
				</G>
				<Path
					d="M0 0L5.533 5.533"
					data-name="선 4"
					transform="translate(10.921 10.921)"
				></Path>
			</G>
		</Svg>
	);
}
