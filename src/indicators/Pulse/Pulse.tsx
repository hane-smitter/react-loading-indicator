"use strict";

import React, { useRef, useEffect } from "react";

import { PulseProps } from "./Pulse.types";
import "./Pulse.scss";
import useFontsizeMapper from "../../hooks/useFontsizeMapper";
import Text from "../../utils/Text";

const Pulse = (props: PulseProps) => {
	const svgPathRef = useRef<SVGPathElement>(null);

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
	const pulseColor: string | string[] = props?.color ?? "";
	const pulseColorStyles: React.CSSProperties =
		pulseColor instanceof Array
			? { ...genStyleFromColorArr(pulseColor) }
			: { ...genStyleFromColorStr(pulseColor) };

	useEffect(() => {
		if (svgPathRef.current) {
			const pathEl: SVGPathElement = svgPathRef.current;
			const parentSvgEl: HTMLElement | null = pathEl.parentElement;
			const pathLength: number = pathEl.getTotalLength();
			console.log("SVG PATH LENGTH: ", pathLength);

			const pathLengthRepeats = pathLength / 2;
			const dashArray = pathLengthRepeats * 0.94;
			const dashArrayGap = pathLengthRepeats * 0.06;

			pathEl.style.strokeDasharray = `${dashArray} ${dashArrayGap}`;
			pathEl.style.strokeDashoffset = `${pathLength}`;
			parentSvgEl && (parentSvgEl.style.visibility = "visible");

			// Trigger a layout so styles are calculated & the browser
			// picks up the starting position before animating
			pathEl.getBoundingClientRect();

			const pulseKeyframes = new KeyframeEffect(
				pathEl, // element to animate
				[{ strokeDashoffset: `${pathLength}` }, { strokeDashoffset: `0` }],
				{ duration: 2000, iterations: Infinity, easing: "linear" }
			);

			const pulseAnimation = new Animation(pulseKeyframes, document.timeline);

			// Play pulse animation
			pulseAnimation.play();
		}
	}, []);

	return (
		<span
			className="rli-d-i-b pulse-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span
				className="rli-d-i-b pulse-loader"
				style={{ ...pulseColorStyles, ...styles }}
			>
				{/* Original size SVG */}
				{/* <svg
					width="16em" // ratio -> 2.947368421
					height="5.428571429em"
					xmlns="http://www.w3.org/2000/svg"
					version="1.2"
					viewBox="0 0 550 190"
					preserveAspectRatio="xMinYMin meet"
				>
					<path
						ref={svgPathRef}
						stroke="currentColor"
						fill="none"
						strokeWidth="2"
						strokeLinejoin="round"
						d="M0 70h250q7-30 12-3t5 8 3-7 3 4 6 35 7-60 4 60 7-20s2-11 10-10 1 1 8-10l4 8c6 4 8-6 10-17s2 10 9 11h210"
					/>
				</svg> */}

				{/* Zoomed in SVG */}
				<svg
					width="14em" // ratio -> 2.051282051
					height="6.825000001em"
					xmlns="http://www.w3.org/2000/svg"
					version="1.2"
					viewBox="0 0 400 50"
					preserveAspectRatio="xMinYMin meet"
					className="rli-pulse-svg"
				>
					<path
						ref={svgPathRef}
						stroke="currentColor"
						fill="none"
						strokeWidth="2"
						strokeLinejoin="round"
						d="M-80 70h250q7-30 12-3t5 8 3-7 3 4 6 35 7-60 4 60 7-20s2-11 10-10 1 1 8-10l4 8c6 4 8-6 10-17s2 10 9 11h210"
					></path>
				</svg>

				<Text
					className="pulse-text"
					text={props?.text}
					textColor={props?.textColor}
				/>
			</span>
		</span>
	);
};

export { Pulse };

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

	// NOT supporting Individual coloring
	const [color] = colorArr;

	stylesObject["color"] = color;

	return stylesObject;
}
