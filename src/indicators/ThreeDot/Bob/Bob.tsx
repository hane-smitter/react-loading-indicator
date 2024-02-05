"use strict";

import React, { useCallback, useRef } from "react";

import { BobProps } from "./Bob.types";
import "./Bob.scss";
import useAnimationPacer from "../../../hooks/useAnimationPacer";
import useStylesPipeline from "../../../hooks/useStylesPipeline";
import Text from "../../../utils/Text";
import useRegisterCssColors from "../../../hooks/useRegisterCssColors";
import arrayRepeat from "../../../utils/arrayRepeat";
import { defaultColor as DEFAULT_COLOR } from "../../variables";

const TDBobColorPhases: Array<string> = Array.from(
	{ length: 4 },
	(_, idx) => `--TD-bob-phase${idx + 1}-color`
);

const Bob = (props: BobProps) => {
	const elemRef = useRef<HTMLSpanElement | null>(null);

	// Styles and size
	const { styles, fontSize } = useStylesPipeline(props?.style, props?.size);

	// Animation speed and smoothing control
	const easingFn: string | undefined = props?.easing;
	const DEFAULT_ANIMATION_DURATION = "1.2s"; // Animation's default duration
	const { animationPeriod } = useAnimationPacer(
		props?.speedPlus,
		DEFAULT_ANIMATION_DURATION
	);

	/* Color SETTINGS - Set color of the loading indicator */
	useRegisterCssColors(TDBobColorPhases);
	const colorReset: () => void = useCallback(function () {
		if (elemRef.current) {
			// const cssVars: string[] = Array.from({ length: 3 }, (item, idx) => {
			// 	// bob-dot2-color
			// 	const bodDotId: string = `--bob-dot${idx + 1}-color`;

			// 	return bodDotId;
			// });

			// elemRef.current?.style.removeProperty("color");
			for (let i = 0; i < TDBobColorPhases.length; i++) {
				elemRef.current?.style.removeProperty(TDBobColorPhases[i]);
			}
		}
	}, []);
	const colorProp: string | string[] = props?.color ?? "";
	const bobColorStyles: React.CSSProperties = stylesObjectFromColorProp(
		colorProp,
		colorReset
	);

	return (
		<span
			className="rli-d-i-b bob-rli-bounding-box"
			ref={elemRef}
			style={
				{
					...(fontSize && { fontSize }),
					...(animationPeriod && {
						"--rli-animation-duration": animationPeriod
					}),
					...(easingFn && { "--rli-animation-function": easingFn }),
					...bobColorStyles
				} as React.CSSProperties
			}
		>
			<span className="bob-indicator" style={{ ...styles }}>
				<span className="bobbing"></span>
			</span>

			<Text staticText text={props?.text} textColor={props?.textColor} />
		</span>
	);
};

export { Bob };

/**
 * Creates a style object with props that color the loading indicator
 */
function stylesObjectFromColorProp(
	colorProp: string | string[],
	resetToDefaultColors: () => void
): React.CSSProperties {
	const stylesObject: any = {};
	const switchersLength: number = TDBobColorPhases.length;

	if (!colorProp) {
		resetToDefaultColors();
		return stylesObject;
	}

	if (colorProp instanceof Array) {
		const colorArr: string[] = arrayRepeat(colorProp, TDBobColorPhases.length);

		for (let idx = 0; idx < colorArr.length; idx++) {
			if (idx >= 4) break;

			stylesObject[TDBobColorPhases[idx]] = colorArr[idx];
		}

		return stylesObject;
	}

	try {
		if (typeof colorProp !== "string") throw new Error("Color String expected");

		for (let i = 0; i < TDBobColorPhases.length; i++) {
			stylesObject[TDBobColorPhases[i]] = colorProp;
		}
	} catch (error: unknown) {
		error instanceof Error
			? console.warn(
					`[${
						error.message
					}]: Received "${typeof colorProp}" instead with value, ${JSON.stringify(
						colorProp
					)}`
			  )
			: console.warn(
					`${JSON.stringify(
						colorProp
					)} received in <ThreeDot variant="bob" /> indicator cannot be processed. Using default instead!`
			  );

		for (let i = 0; i < TDBobColorPhases.length; i++) {
			stylesObject[TDBobColorPhases[i]] = DEFAULT_COLOR;
		}
	}

	return stylesObject;
}
