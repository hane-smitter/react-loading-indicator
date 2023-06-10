"use strict";

import React from "react";

import { BubbleDottedProps } from "./BubbleDotted.types";
import "./BubbleDotted.scss";
import Text from "../../../utils/Text";
import useStylesPipeline from "../../../hooks/useStylesPipeline";

let BubbleDotted = (props: BubbleDottedProps) => {
	// Styles
	const { styles, fontSize } = useStylesPipeline(props?.style, props?.size);

	/* Color SETTINGS */
	// Accept Array or String color prop and set all dots color
	const colorProp: string | string[] = props?.color ?? "";
	const dotsColorStyles: React.CSSProperties =
		stylesObjectFromColorProp(colorProp);

	return (
		<span
			className="rli-d-i-b bubble-dotted-rli-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span
				className="rli-d-i-b bubble-dotted-throbber"
				style={{ ...dotsColorStyles, ...styles }}
			>
				{Array.from({ length: 12 }).map((item, i) => (
					<span
						className="rli-d-i-b bubble-dot-matter"
						style={{ "--elem-pos": `${i + 1}` } as React.CSSProperties}
					></span>
				))}

				<Text
					className="bubble-dotted-text"
					text={props?.text}
					textColor={props?.textColor}
				/>
			</span>
		</span>
	);
};

export { BubbleDotted };

function stylesObjectFromColorProp(
	colorProp: string | string[]
): React.CSSProperties {
	const stylesObject: any = {};

	if (colorProp instanceof Array) {
		// Pick first item as the color
		const [color] = colorProp;

		stylesObject["color"] = color;

		return stylesObject;
	}

	stylesObject["color"] = colorProp;

	return stylesObject;
}
