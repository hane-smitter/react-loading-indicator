"use strict";

import React from "react";

import { TwistProps } from "./Twist.types";
import "./Twist.scss";
import useFontsizeMapper from "../../hooks/useFontsizeMapper";
import Text from "../../utils/Text";

const Twist = (props: TwistProps) => {
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
	const twistColor: string | string[] = props?.color ?? "";
	const twistColorStyles: React.CSSProperties =
		twistColor instanceof Array
			? { ...genStyleFromColorArr(twistColor) }
			: { ...genStyleFromColorStr(twistColor) };

	return (
		<span
			className="rli-d-i-b twist-bounding-box"
			style={{ ...(fontSize && { fontSize }), ...twistColorStyles }}
		>
			<span className="rli-d-i-b twist-loader" style={{ ...styles }}>
				<span className="blade"></span>
				<span className="blade"></span>
				<span className="blade"></span>
				<span className="blade"></span>
				<span className="blade"></span>
				<span className="blade"></span>
				<span className="blade"></span>
				<span className="blade"></span>
			</span>

			<Text
				className="twist-text"
				text={props?.text}
				textColor={props?.textColor}
			/>
		</span>
	);
};

export { Twist };

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

	// NOT supporting Individual blade coloring
	const [color] = colorArr;

	stylesObject["color"] = color;

	return stylesObject;
}
