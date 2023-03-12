"use strict";

import React from "react";

import { BubbleDottedProps } from "./BubbleDotted.types";
import "./BubbleDotted.scss";
import useFontsizeMapper from "../../../hooks/useFontsizeMapper";

let BubbleDotted = (props: BubbleDottedProps) => {
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
	const dotsColor: string | string[] = props?.color ?? "";
	const dotsColorStyles: React.CSSProperties =
		dotsColor instanceof Array
			? { ...genStyleFromColorArr(dotsColor) }
			: { ...genStyleFromColorStr(dotsColor) };

	return (
		<span
			className="rli-d-i-b bubbledot-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span
				className="rli-d-i-b bubbledot-loader"
				style={{ ...dotsColorStyles, ...styles }}
			>
				<span className="rli-d-i-b bubbledot1 dot-child"></span>
				<span className="rli-d-i-b bubbledot2 dot-child"></span>
				<span className="rli-d-i-b bubbledot3 dot-child"></span>
				<span className="rli-d-i-b bubbledot4 dot-child"></span>
				<span className="rli-d-i-b bubbledot5 dot-child"></span>
				<span className="rli-d-i-b bubbledot6 dot-child"></span>
				<span className="rli-d-i-b bubbledot7 dot-child"></span>
				<span className="rli-d-i-b bubbledot8 dot-child"></span>
				<span className="rli-d-i-b bubbledot9 dot-child"></span>
				<span className="rli-d-i-b bubbledot10 dot-child"></span>
				<span className="rli-d-i-b bubbledot11 dot-child"></span>
				<span className="rli-d-i-b bubbledot12 dot-child"></span>

				<span
					className="rli-d-i-b rli-text-format bubbledot-text"
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

export { BubbleDotted };

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

	// NOT supporting Individual bubble coloring
	const [color] = colorArr;

	stylesObject["color"] = color;

	return stylesObject;
}
