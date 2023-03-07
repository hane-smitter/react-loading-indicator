import React from "react";
import { ColorTranslator } from "colortranslator";

import { GlidingBlinkProps } from "./GlidingBlink.types";
import "./GlidingBlink.scss";

const DEFAULT_COLOR = "50, 205, 50"; // limegreen

const GlidingBlink = (props: GlidingBlinkProps) => {
	// Styles
	let styles: React.CSSProperties = props?.style || {};

	/* Color SETTINGS */
	// If Color property is a string, that is the color of all anime
	// If color property is an array, that is color for each anime
	let glidingBlinkColor: string | string[] = props?.color ?? "";

	/* Size SETTINGS */
	const size: string = props?.size || "";
	let fontSize: string | number = "";
	switch (size) {
		case "small":
			fontSize = "12px";
			break;
		case "medium":
			fontSize = "16px";
			break;
		case "large":
			fontSize = "20px";
			break;
	}
	// Setting size by specifying font-size in style attr
	// and modifying styles to exclude fontSize
	if (props?.style?.fontSize) {
		const { fontSize: extractedFontSize, ...extractedStyles } = props?.style;

		styles = extractedStyles;
		fontSize = extractedFontSize;
	}

	return (
		<span
			className="rli-d-i-b glidingblink-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span
				className="rli-d-i-b glidingblink-loader"
				style={
					glidingBlinkColor instanceof Array
						? { ...genStyleFromColorArr(glidingBlinkColor) }
						: { ...genStyleFromColorStr(glidingBlinkColor) }
				}
			>
				<span
					className="rli-d-i-b gliding-blink-text"
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

export { GlidingBlink };

function genStyleFromColorStr(
	colorStr: string | undefined
): React.CSSProperties {
	colorStr = colorStr ?? "";
	let objStyle: any = {};
	try {
		const color: ColorTranslator = new ColorTranslator(colorStr);
		objStyle["--color-base"] = `${color.R}, ${color.G}, ${color.B}`;
	} catch (error) {
		objStyle["--color-base"] = DEFAULT_COLOR;
	}

	return objStyle;
}

function genStyleFromColorArr(colorArr: string[]): React.CSSProperties {
	let objStyles: any = {};

	if (colorArr.length > 0) {
		try {
			let firstColor = new ColorTranslator(colorArr[0]);

			// Set `color-base` to be first item in Array
			objStyles[
				"--color-base"
			] = `${firstColor.R}, ${firstColor.G}, ${firstColor.B}`;
		} catch (error) {
			objStyles[`--color-base`] = DEFAULT_COLOR;
		}

		let arrLength: number = colorArr.length;

		for (let i = 0; i < arrLength; i++) {
			if (i > 5) break; // Max no. of shapes is 6
			let currentItem: string = `shape${i + 1}`;
			try {
				const color: ColorTranslator = new ColorTranslator(colorArr[i]);
				objStyles[
					`--${currentItem}-color-base`
				] = `${color.R}, ${color.G}, ${color.B}`;
			} catch (error) {
				objStyles[`--${currentItem}-color-base`] = DEFAULT_COLOR;
			}
		}
	}
	return objStyles as React.CSSProperties;
}
