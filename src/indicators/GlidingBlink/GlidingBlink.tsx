import React, { useCallback, useRef } from "react";
import { ColorTranslator } from "colortranslator";

import { GlidingBlinkProps } from "./GlidingBlink.types";
import "./GlidingBlink.scss";
import { defaultColor } from "../variables";
import useStylesPipeline from "../../hooks/useStylesPipeline";
import useAnimationPacer from "../../hooks/useAnimationPacer";
import Text from "../../utils/Text";

const DEFAULT_COLOR = new ColorTranslator(defaultColor);

const GlidingBlink = (props: GlidingBlinkProps) => {
	const elemRef = useRef<HTMLSpanElement | null>(null);
	// Styles and size
	const { styles, fontSize } = useStylesPipeline(props?.style, props?.size);

	// Animation speed and smoothing control
	const easingFn: string | undefined = props?.easing;
	const DEFAULT_ANIMATION_DURATION = "2s"; // Animation's default duration
	const { animationPeriod } = useAnimationPacer(
		props?.speedPlus,
		DEFAULT_ANIMATION_DURATION
	);

	/* Color SETTINGS */
	// If Color property is a string, that is the color of all anime
	// If color property is an array, that is color for each anime
	const colorReset = useCallback(
		function () {
			if (elemRef.current) {
				// --color-base, --shape1-color-base, --shape2-color-base,
				// --shape3-color-base, --shape4-color-base,
				// --shape5-color-base, --shape6-color-base
				const cssColorVars: Array<string> = Array.from(
					{ length: 7 },
					(item, idx) => {
						const cssPropName: string = `--${
							idx ? "shape" + idx + "-" : ""
						}color-base`;
						return cssPropName;
					}
				);

				for (let i = 0; i < cssColorVars.length; i++) {
					elemRef.current?.style.removeProperty(cssColorVars[i]);
				}
			}
		},
		[elemRef.current]
	);
	let colorProp: string | string[] = props?.color ?? "";
	const glidingBlinkColorStyles: React.CSSProperties =
		stylesObjectFromColorProp(colorProp, colorReset);

	return (
		<span
			className="rli-d-i-b gliding-blink-rli-bounding-box"
			ref={elemRef}
			style={
				{
					...(fontSize && { fontSize }),
					...(animationPeriod && {
						"--rli-animation-duration": animationPeriod
					}),
					...(easingFn && { "--rli-animation-function": easingFn }),
					...glidingBlinkColorStyles
				} as React.CSSProperties
			}
		>
			<span
				className="rli-d-i-b glidingblink-throbber"
				style={{ ...styles }}
			></span>
			<Text
				// className="gliding-blink-text"
				staticText
				text={props?.text}
				textColor={props?.textColor}
			/>
		</span>
	);
};

export default React.memo(GlidingBlink);

/**
 * Creates a style object with props that color the throbber/spinner
 */
function stylesObjectFromColorProp(
	colorProp: string | string[],
	resetToDefaultColors: () => void
): React.CSSProperties {
	const stylesObject: any = {};

	if (!colorProp) {
		resetToDefaultColors();
		return stylesObject;
	}

	if (colorProp instanceof Array && colorProp.length > 0) {
		try {
			let firstColor = new ColorTranslator(colorProp[0]);

			// Set `color-base` from the first item in Array
			stylesObject[
				"--color-base"
			] = `${firstColor.R}, ${firstColor.G}, ${firstColor.B}`;
		} catch (error) {
			console.warn(
				`Possibly an invalid color( ${JSON.stringify(
					colorProp[0]
				)} ) passed to GlidingBlink loader!`
			);
			stylesObject[
				`--color-base`
			] = `${DEFAULT_COLOR.R}, ${DEFAULT_COLOR.G}, ${DEFAULT_COLOR.B}`;
		}

		let arrLength: number = colorProp.length;

		for (let i = 0; i < arrLength; i++) {
			if (i > 5) break; // Max no. of shapes is 6
			let shapeId: string = `shape${i + 1}`;
			try {
				const color: ColorTranslator = new ColorTranslator(colorProp[i]);
				stylesObject[
					`--${shapeId}-color-base`
				] = `${color.R}, ${color.G}, ${color.B}`;
			} catch (error) {
				console.warn(
					`Possibly an invalid color( ${colorProp[i]} ) in GlidingBlink loader!`
				);
				stylesObject[
					`--${shapeId}-color-base`
				] = `${DEFAULT_COLOR.R}, ${DEFAULT_COLOR.G}, ${DEFAULT_COLOR.B}`;
			}
		}

		return stylesObject;
	}

	try {
		if (typeof colorProp === "string") {
			const color: ColorTranslator = new ColorTranslator(colorProp);
			stylesObject["--color-base"] = `${color.R}, ${color.G}, ${color.B}`;
		} else {
			throw new Error("Color unprocessable");
		}
	} catch (error) {
		console.warn(
			`Possibly an invalid color( ${JSON.stringify(
				colorProp
			)} ) passed to GlidingBlink loader!`
		);
		stylesObject[
			"--color-base"
		] = `${DEFAULT_COLOR.R}, ${DEFAULT_COLOR.G}, ${DEFAULT_COLOR.B}`;
	}

	return stylesObject;
}
