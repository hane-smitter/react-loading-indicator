import React from "react";

import { SplitDiscProps } from "./SplitDisc.types";
import "./SplitDisc.scss";
import useStylesPipeline from "../../../hooks/useStylesPipeline";
import Text from "../../../utils/Text";

const SplitDisc = (props: SplitDiscProps) => {
	// Styles
	let { styles, fontSize } = useStylesPipeline(props?.style, props?.size);

	/* Color SETTINGS */
	// If Color property is a string, that is the color of all rings
	// If color property is an array, that is color for each rings
	let colorProp: string | string[] = props?.color ?? "";
	const discsColorStyles: React.CSSProperties =
		stylesObjectFromColorProp(colorProp);

	return (
		<span
			className="rli-d-i-b split-disc-rli-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span
				className="rli-d-i-b split-disc-throbber"
				style={{
					...discsColorStyles,
					...styles
				}}
			>
				<span className="rli-d-i-b split-disc-ring"></span>
				<Text
					className="split-disc-text"
					text={props?.text}
					textColor={props?.textColor}
				/>
			</span>
		</span>
	);
};

export { SplitDisc };

function stylesObjectFromColorProp(
	colorProp: string | string[]
): React.CSSProperties {
	const stylesObject: any = {};

	if (colorProp instanceof Array) {
		const arrLength = colorProp.length;
		stylesObject["--splits-color"] = colorProp[0];
		stylesObject["color"] = colorProp[0];

		for (let idx = 0; idx < arrLength; idx++) {
			if (idx >= 2) break;
			let currentItem = `split${idx + 1}`;

			stylesObject[`--${currentItem}-color`] = colorProp[idx];
		}
		return stylesObject;
	}

	stylesObject["color"] = colorProp;

	return stylesObject;
}
