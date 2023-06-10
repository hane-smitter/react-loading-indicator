import React from "react";

import { TrackDiscProps } from "./TrackDisc.types";
import "./TrackDisc.scss";
import Text from "../../../utils/Text";
import useStylesPipeline from "../../../hooks/useStylesPipeline";

const TrackDisc = (props: TrackDiscProps) => {
	// Styles
	const { styles, fontSize } = useStylesPipeline(props?.style, props?.size);

	/* Color SETTING */
	let colorProp: string | string[] = props?.color ?? "";
	const trackDiscColorStyles: React.CSSProperties =
		stylesObjectFromColorProp(colorProp);

	return (
		<span
			className="rli-d-i-b track-disc-rli-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span
				className="rli-d-i-b track-disc-throbber"
				style={{ ...trackDiscColorStyles, ...styles }}
			>
				<span className="rli-d-i-b track-disc-ring"></span>

				<Text
					className="track-disc-text"
					text={props?.text}
					textColor={props?.textColor}
				/>
			</span>
		</span>
	);
};

export { TrackDisc };

function stylesObjectFromColorProp(
	colorProp: string | string[]
): React.CSSProperties {
	const stylesObject: any = {};

	if (colorProp instanceof Array) {
		// Array with first item - disc color, second item - track color
		const [color, trackColor] = colorProp;

		if (color) stylesObject["color"] = color;
		if (trackColor) stylesObject["--track-path-color"] = trackColor;

		return stylesObject;
	}

	stylesObject["color"] = colorProp;

	return stylesObject;
}
