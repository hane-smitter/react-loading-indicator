"use strict";

import React from "react";

import { SeekProps } from "./Seek.types";
import "./Seek.scss";
import useFontsizeMapper from "../../hooks/useFontsizeMapper";

const Seek = (props: SeekProps) => {
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
	const seekBounceColor: string | string[] = props?.color ?? "";
	const seekBounceColorStyles: React.CSSProperties =
		seekBounceColor instanceof Array
			? { ...genStyleFromColorArr(seekBounceColor) }
			: { ...genStyleFromColorStr(seekBounceColor) };

	return (
		<span
			className="rli-d-i-b seek-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span
				className="rli-d-i-b seek-loader"
				style={{ ...seekBounceColorStyles, ...styles }}
			>
				<span className="rli-d-i-b seek-bounce seek-bounce1"></span>
				<span className="rli-d-i-b seek-bounce seek-bounce2"></span>
				<span className="rli-d-i-b seek-bounce seek-bounce3"></span>

				<span
					className="rli-d-i-b rli-text-format seek-text"
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

export { Seek };

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
