import React from "react";

import { CommetProps } from "./Commet.types";
import "./Commet.scss";
import Text from "../../utils/Text";
import useStylesPipeline from "../../hooks/useStylesPipeline";

const Commet = (props: CommetProps) => {
	// Styles
	let { styles, fontSize } = useStylesPipeline(props?.style, props?.size);

	// color SETTINGS
	// If Color property is a string, that is the color of all rings
	// If color property is an array, that is color for each rings
	let colorProp: string | string[] = props?.color ?? "";
	const ringColorStyles: React.CSSProperties =
		stylesObjectFromColorProp(colorProp);

	return (
		<span
			className="rli-d-i-b commet-rli-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span
				className="rli-d-i-b commet-throbber"
				style={{
					...ringColorStyles,
					...styles
				}}
			>
				<Text
					className="commet-text"
					text={props?.text}
					textColor={props?.textColor}
				/>

				<span className="rli-d-i-b ring-wrapper ring1">
					<span className="rli-d-i-b ring "></span>
					<span className="rli-d-i-b ringball-holder"></span>
				</span>
				<span className="rli-d-i-b ring-wrapper ring2">
					<span className="rli-d-i-b ring "></span>
					<span className="rli-d-i-b ringball-holder"></span>
				</span>
				{/* <span className="rli-d-i-b ring ring2">
					<span className="rli-d-i-b ringball"></span>
				</span> */}
			</span>
		</span>
	);
};

export { Commet };

function stylesObjectFromColorProp(
	colorProp: string | string[]
): React.CSSProperties {
	const stylesObject: any = {};

	if (colorProp instanceof Array) {
		const arrLength = colorProp.length;

		stylesObject["color"] = colorProp[0];

		for (let idx = 0; idx < arrLength; idx++) {
			if (idx >= 2) break;
			let currentItem = `ring${idx + 1}`;

			stylesObject[`--${currentItem}-color`] = colorProp[idx];
		}

		return stylesObject;
	}

	stylesObject["color"] = colorProp;

	return stylesObject;
}
