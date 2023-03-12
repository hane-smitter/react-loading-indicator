"use strict";

import React from "react";

import { RipleProps } from "./Riple.types";
import "./Riple.scss";
import useFontsizeMapper from "../../hooks/useFontsizeMapper";

const Riple = (props: RipleProps) => {
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
	const ripleColor: string | string[] = props?.color ?? "";
	const ripleColorStyles: React.CSSProperties =
		ripleColor instanceof Array
			? { ...genStyleFromColorArr(ripleColor) }
			: { ...genStyleFromColorStr(ripleColor) };

	return (
		<span
			className="rli-d-i-b react-loading-indicator-normalize ripple-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span
				className="rli-d-i-b ripple-loader"
				style={{ ...ripleColorStyles, ...styles }}
			>
				<span className="rli-d-i-b ripple"></span>
				<span className="rli-d-i-b ripple"></span>

				<span
					className="rli-d-i-b rli-text-format ripple-text"
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

export { Riple };

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

	// NOT supporting Individual riple coloring
	const [color] = colorArr;

	stylesObject["color"] = color;

	return stylesObject;
}
