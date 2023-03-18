import React from "react";

import { CommetProps } from "./Commet.types";
import "./Commet.scss";
import useFontsizeMapper from "../../hooks/useFontsizeMapper";
import Text from "../../utils/Text";

const Commet = (props: CommetProps) => {
	// Styles
	let styles: React.CSSProperties = Object(props?.style);

	// Sizes
	let fontSize: string | number = useFontsizeMapper(props?.size);
	// Setting size by specifying font-size in style attr
	// and modifying styles to exclude fontSize
	if (props?.style?.fontSize) {
		const { fontSize: cssFontSize, ...css } = props?.style;

		styles = css;
		fontSize = cssFontSize;
	}

	// color SETTINGS
	// If Color property is a string, that is the color of all rings
	// If color property is an array, that is color for each rings
	let ringColors: string | string[] = props?.color ?? "";
	const ringColorStyles: React.CSSProperties =
		ringColors instanceof Array
			? { ...genStyleFromColorArr(ringColors) }
			: { ...genStyleFromColorStr(ringColors) };

	return (
		<span
			className="rli-d-i-b commet-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span
				className="rli-d-i-b commet-loader"
				style={{
					...ringColorStyles,
					...styles
				}}
			>
				<Text
					className="commet-text"
					text={props?.text}
					textColor={props?.textColor}
				/>

				<span className="rli-d-i-b ring-wrapper ring1">
					<span className="rli-d-i-b ring "></span>
					<span className="rli-d-i-b ringball-holder"></span>
				</span>
				<span className="rli-d-i-b ring-wrapper ring2">
					<span className="rli-d-i-b ring "></span>
					<span className="rli-d-i-b ringball-holder"></span>
				</span>
				{/* <span className="rli-d-i-b ring ring2">
					<span className="rli-d-i-b ringball"></span>
				</span> */}
			</span>
		</span>
	);
};

export { Commet };

function genStyleFromColorStr(
	colorStr: string | undefined
): React.CSSProperties {
	colorStr = colorStr ?? "";

	const stylesObject: any = {};

	stylesObject["color"] = colorStr;

	return stylesObject;
}

function genStyleFromColorArr(colorArr: string[]): React.CSSProperties {
	const stylesObject: any = {};
	const arrLength = colorArr.length;

	stylesObject["color"] = colorArr[0];

	for (let idx = 0; idx < arrLength; idx++) {
		if (idx >= 2) break;
		let currentItem = `ring${idx + 1}`;

		stylesObject[`--${currentItem}-color`] = colorArr[idx];
	}

	return stylesObject;
}
