"use strict";

import React from "react";

import { SlabProps } from "./Slab.types";
import "./Slab.scss";
import useFontsizeMapper from "../../hooks/useFontsizeMapper";

const Slab = (props: SlabProps) => {
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
	const slabColor: string | string[] = props?.color ?? "";
	const slabColorStyles: React.CSSProperties =
		slabColor instanceof Array
			? { ...genStyleFromColorArr(slabColor) }
			: { ...genStyleFromColorStr(slabColor) };

	return (
		<span
			className="rli-d-i-b slab-bounding-box"
			style={{ ...(fontSize && { fontSize }), ...slabColorStyles, ...styles }}
		>
			<span className="rli-d-i-b slab-loader slabs">
				<span className="slab"></span>
				<span className="slab"></span>
				<span className="slab"></span>
				<span className="slab"></span>
			</span>
			<span
				className="rli-d-i-b rli-text-format slab-text"
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
	);
};

export default React.memo(Slab);

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
