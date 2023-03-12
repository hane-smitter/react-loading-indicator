import React from "react";
import { ColorTranslator } from "colortranslator";

import { GlidingBlinkProps } from "./GlidingBlink.types";
import "./GlidingBlink.scss";
import useFontsizeMapper from "../../hooks/useFontsizeMapper";
import { defaultColor } from "../variables";

const DEFAULT_COLOR = new ColorTranslator(defaultColor);

const GlidingBlink = (props: GlidingBlinkProps) => {
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
	// If Color property is a string, that is the color of all anime
	// If color property is an array, that is color for each anime
	let glidingBlinkColor: string | string[] = props?.color ?? "";
	const glidingBlinkColorStyles: React.CSSProperties =
		glidingBlinkColor instanceof Array
			? { ...genStyleFromColorArr(glidingBlinkColor) }
			: { ...genStyleFromColorStr(glidingBlinkColor) };

	return (
		<span
			className="rli-d-i-b glidingblink-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span
				className="rli-d-i-b glidingblink-loader"
				style={{ ...glidingBlinkColorStyles, ...styles }}
			>
				<span
					className="rli-d-i-b rli-text-format gliding-blink-text"
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
		console.warn(
			`Possibly an invalid color( ${colorStr} ) passed to GlidingBlink loader!`
		);
		objStyle[
			"--color-base"
		] = `${DEFAULT_COLOR.R}, ${DEFAULT_COLOR.G}, ${DEFAULT_COLOR.B}`;
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
			console.warn(
				`Possibly an invalid color( ${colorArr[0]} ) passed to GlidingBlink loader!`
			);
			objStyles[
				`--color-base`
			] = `${DEFAULT_COLOR.R}, ${DEFAULT_COLOR.G}, ${DEFAULT_COLOR.B}`;
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
				console.warn(
					`Possibly an invalid color( ${colorArr[i]} ) in GlidingBlink loader!`
				);
				objStyles[
					`--${currentItem}-color-base`
				] = `${DEFAULT_COLOR.R}, ${DEFAULT_COLOR.G}, ${DEFAULT_COLOR.B}`;
			}
		}
	}
	return objStyles as React.CSSProperties;
}
