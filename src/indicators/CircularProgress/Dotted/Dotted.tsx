import React from "react";

import { DottedProps } from "./Dotted.types";
import "./Dotted.scss";
import useFontsizeMapper from "../../../hooks/useFontsizeMapper";

const Dotted = (props: DottedProps) => {
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
	let dotsColor: string | string[] = props?.color ?? "";
	const dotsColorStyles: React.CSSProperties =
		dotsColor instanceof Array
			? { ...genStyleFromColorArr(dotsColor) }
			: { ...genStyleFromColorStr(dotsColor) };

	return (
		<span
			className="rli-d-i-b react-loading-indicator-normalize dot-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span
				className="rli-d-i-b fading-dot-loader"
				style={{ ...dotsColorStyles, ...styles }}
			>
				<span className="rli-d-i-b fading-dot1 fading-dot"></span>
				<span className="rli-d-i-b fading-dot2 fading-dot"></span>
				<span className="rli-d-i-b fading-dot3 fading-dot"></span>
				<span className="rli-d-i-b fading-dot4 fading-dot"></span>
				<span className="rli-d-i-b fading-dot5 fading-dot"></span>
				<span className="rli-d-i-b fading-dot6 fading-dot"></span>
				<span className="rli-d-i-b fading-dot7 fading-dot"></span>
				<span className="rli-d-i-b fading-dot8 fading-dot"></span>
				<span className="rli-d-i-b fading-dot9 fading-dot"></span>
				<span className="rli-d-i-b fading-dot10 fading-dot"></span>
				<span className="rli-d-i-b fading-dot11 fading-dot"></span>
				<span className="rli-d-i-b fading-dot12 fading-dot"></span>

				<span
					className="rli-d-i-b rli-text-format fading-dot-text"
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

export { Dotted };

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
	// NOT supporting Individual disc coloring
	const [color] = colorArr;

	stylesObject["color"] = color;

	return stylesObject;
}
