import React from "react";
import { AtomProps } from "./Atom.types";
import "./Atom.scss";
import useFontsizeMapper from "../../hooks/useFontsizeMapper";

const Atom = (props: AtomProps) => {
	// Styles
	let styles: React.CSSProperties = Object(props?.style);
	/* Size SETTINGS */
	let fontSize: string | number = useFontsizeMapper(props?.size);
	// Setting size by specifying font-size in style attr
	// and modifying styles to exclude fontSize
	// Setting fontsize in style prop will overirde the `size` prop
	if (props?.style?.fontSize) {
		const { fontSize: cssFontSize, ...css } = props?.style;

		styles = css;
		fontSize = cssFontSize;
	}

	/* Color SETTINGS */
	// If Color property is a string, that is the color of all rings
	// If color property is an array, that is color for each rings
	let allRingsColor: { color?: string } = {};
	let orbitColorsArr: string[] = [];
	let orbit1Color: { color?: string } = {};
	let orbit2Color: { color?: string } = {};
	let orbit3Color: { color?: string } = {};

	if (props?.color && typeof props?.color === "string") {
		allRingsColor = { color: props?.color };
	} else if (props?.color?.length && props?.color instanceof Array) {
		orbitColorsArr = props?.color;
	}
	if (orbitColorsArr.length > 0) {
		const [orbit1, orbit2, orbit3] = orbitColorsArr;
		orbit1Color = {
			...(orbit1 && { color: orbit1 })
		};
		orbit2Color = {
			...(orbit2 && { color: orbit2 })
		};
		orbit3Color = {
			...(orbit3 && { color: orbit3 })
		};
	}

	return (
		<span className="rli-d-i-b atom-bounding-box">
			<span className="rli-d-i-b spinner atom-loader">
				<span className="rli-d-i-b inner">
					<span className="disc nucleus-holder">
						<span className="nucleus"></span>
					</span>
					<span className="disc"></span>
					<span className="disc"></span>
					<span className="disc"></span>
				</span>
			</span>
		</span>
	);
};

export { Atom };
