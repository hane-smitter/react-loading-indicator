import React, { useCallback, useRef, useEffect } from "react";

import "./Dotted.scss";
import { DottedProps } from "./Dotted.types";
import Text from "../../../utils/Text";
import useStylesPipeline from "../../../hooks/useStylesPipeline";
import useAnimationPacer from "../../../hooks/useAnimationPacer";
import { defaultColor as DEFAULT_COLOR } from "../../variables";
import arrayRepeat from "../../../utils/arrayRepeat";
import makeId from "../../../utils/makeId";

// CSS properties for switching colors
const dottedColorSwitchVars: Array<string> = Array.from(
	{ length: 4 },
	(_, idx) => `--dotted-phase${idx + 1}-color`
);

const Dotted = (props: DottedProps) => {
	const elemRef = useRef<HTMLSpanElement | null>(null);
	// Styles
	const { styles, fontSize } = useStylesPipeline(props?.style, props?.size);

	// Animation speed and smoothing control
	const easingFn: string | undefined = props?.easing;
	const DEFAULT_ANIMATION_DURATION = "1.2s"; // Animation's default duration
	const { animationPeriod } = useAnimationPacer(
		props?.speedPlus,
		DEFAULT_ANIMATION_DURATION
	);

	/* Color SETTINGS */
	// Accept Array or String color prop and set all dots color
	const colorReset = useCallback(
		function () {
			if (elemRef.current) {
				// elemRef.current?.style.removeProperty("color");
				for (let i = 0; i < dottedColorSwitchVars.length; i++) {
					elemRef.current?.style.removeProperty(dottedColorSwitchVars[i]);
				}
			}
		},
		[elemRef.current]
	);
	let colorProp: string | string[] = props?.color ?? "";
	const dotsColorStyles: React.CSSProperties = stylesObjectFromColorProp(
		colorProp,
		colorReset
	);

	// Registering/giving types to css variables controlling color of spinner
	useEffect(() => {
		for (let i = 0; i < dottedColorSwitchVars.length; i++) {
			try {
				window.CSS.registerProperty({
					name: dottedColorSwitchVars[i],
					syntax: "<color>",
					inherits: true,
					initialValue: DEFAULT_COLOR
				});
			} catch (error) {
				continue;
			}
		}
	}, []);

	return (
		<span
			className="rli-d-i-b dot-rli-bounding-box"
			style={
				{
					...(fontSize && { fontSize }),
					...(animationPeriod && {
						"--rli-animation-duration": animationPeriod
					}),
					...(easingFn && { "--rli-animation-function": easingFn })
				} as React.CSSProperties
			}
		>
			<span
				className="rli-d-i-b fading-dot-throbber"
				ref={elemRef}
				style={{ ...dotsColorStyles, ...styles }}
			>
				{Array.from({ length: 12 }).map((_, i) => (
					<span
						key={makeId()}
						className={`rli-d-i-b dot-shape-holder`}
						style={{ "--elem-pos": `${i + 1}` } as React.CSSProperties}
					></span>
				))}

				<Text
					className="fading-dot-text"
					text={props?.text}
					textColor={props?.textColor}
				/>
			</span>
		</span>
	);
};

export { Dotted };

/**
 * Creates a style object with props that colors the indicator
 */
function stylesObjectFromColorProp(
	colorProp: string | string[],
	resetToDefaultColors: () => void
): React.CSSProperties {
	const stylesObject: any = {};
	const switchersLength = dottedColorSwitchVars.length;

	if (!colorProp) {
		resetToDefaultColors();
		return stylesObject;
	}

	if (colorProp instanceof Array) {
		const colorArr: string[] = arrayRepeat(colorProp, switchersLength);

		for (let idx = 0; idx < colorArr.length; idx++) {
			if (idx >= 4) break;

			stylesObject[dottedColorSwitchVars[idx]] = colorArr[idx];
		}

		return stylesObject;
	}

	try {
		if (typeof colorProp !== "string") throw new Error("Color String expected");

		for (let i = 0; i < switchersLength; i++) {
			stylesObject[dottedColorSwitchVars[i]] = colorProp;
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
					)} received in <OrbitProgress variant="dotted" /> indicator cannot be processed. Using default instead!`
			  );

		for (let i = 0; i < switchersLength; i++) {
			stylesObject[dottedColorSwitchVars[i]] = DEFAULT_COLOR;
		}
	}

	return stylesObject;
}
