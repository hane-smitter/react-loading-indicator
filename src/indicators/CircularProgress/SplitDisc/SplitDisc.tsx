import React from "react";

import { SplitDiscProps } from "./SplitDisc.types";
import "./SplitDisc.scss";
import useFontsizeMapper from "../../../hooks/useFontsizeMapper";

const SplitDisc = (props: SplitDiscProps) => {
	// Styles
	let styles: React.CSSProperties = props?.style || {};

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
	let discsColor: string | string[] = props?.color ?? "";
	const discsColorStyles: React.CSSProperties =
		discsColor instanceof Array
			? { ...genStyleFromColorArr(discsColor) }
			: { ...genStyleFromColorStr(discsColor) };

	return (
		<span
			className="rli-d-i-b split-disc-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span
				className="rli-d-i-b split-disc-loader"
				style={{
					...discsColorStyles,
					...styles
				}}
			>
				<span className="rli-d-i-b split-disc-ring"></span>
				<span
					className="rli-d-i-b rli-text-format split-disc-text"
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

export { SplitDisc };

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
	const arrLength = colorArr.length;

	stylesObject["--splits-color"] = colorArr[0];
	stylesObject["color"] = colorArr[0];

	for (let idx = 0; idx < arrLength; idx++) {
		if (idx >= 2) break;
		let currentItem = `split${idx + 1}`;

		stylesObject[`--${currentItem}-color`] = colorArr[idx];
	}

	return stylesObject;
}
