import React from "react";

import { FourSquareProps } from "./FourSquare.types";
import "./FourSquare.scss";
import useFontsizeMapper from "../../hooks/useFontsizeMapper";

export const FourSquare = (props: FourSquareProps) => {
	// Styles
	let styles: React.CSSProperties = Object(props?.style);

	/* Size SETTINGS */
	let fontSize: string | number = useFontsizeMapper(props?.size);

	// Setting size by specifying font-size in style attr
	// and modifying styles to exclude fontSize
	if (props?.style?.fontSize) {
		const { fontSize: cssFontSize, ...css } = props?.style;

		styles = css;
		fontSize = cssFontSize;
	}

	/* Color SETTINGS */
	// If Color property is a string, that is the color of all rings
	// If color property is an array, that is color for each rings

	const fourSquareColor: string | string[] = props?.color ?? "";
	const fourSquareColorStyles: React.CSSProperties =
		fourSquareColor instanceof Array
			? { ...genStyleFromColorArr(fourSquareColor) }
			: { ...genStyleFromColorStr(fourSquareColor) };

	return (
		<span
			className="rli-d-i-b foursquare-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span
				className={`rli-d-i-b foursquare-loader`}
				style={{ ...fourSquareColorStyles, ...styles }}
			>
				<span className="rli-d-i-b squares-container">
					<span className={`square square1`}></span>
					<span className={`square square2`}></span>
					<span className={`square square3`}></span>
					<span className={`square square4`}></span>
				</span>

				<span
					className="rli-d-i-b rli-text-format foursquare-text"
					style={{
						...(props?.textColor && {
							color: props?.textColor,
							mixBlendMode: "unset"
						})
					}}
				>
					{props?.text
						? typeof props?.text === "string" && props?.text.length
							? props?.text
							: "loading"
						: null}
				</span>
			</span>
		</span>
	);
};

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
		if (idx >= 4) break;
		let currentItem = `square${idx + 1}`;

		stylesObject[`--${currentItem}-color`] = colorArr[idx];
	}

	return stylesObject;
}
