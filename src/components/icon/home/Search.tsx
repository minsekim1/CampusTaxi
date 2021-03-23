import React, { SVGProps } from 'react';
import Svg, { G, Path, Rect, Ellipse } from 'react-native-svg';
type Props = SVGProps<SVGElement>;
export const Search: React.FC<Props> = ({ width, height }) => {
	return (
		<Svg
			width="16.455"
			height="16.455"
			viewBox="0 0 16.455 16.455"
		>
			<G
				fill="none"
				stroke="#000"
				strokeLinecap="round"
				strokeWidth="2"
				data-name="Search Icon"
				opacity="0.41"
			>
				<G data-name="타원 6">
					<Ellipse
						cx="6.129"
						cy="6.129"
						stroke="none"
						rx="6.129"
						ry="6.129"
					></Ellipse>
					<Ellipse cx="6.129" cy="6.129" rx="5.129" ry="5.129"></Ellipse>
				</G>
				<Path
					d="M0 0L5.058 5.058"
					data-name="선 4"
					transform="translate(9.983 9.984)"
				></Path>
			</G>
		</Svg>
  );
};