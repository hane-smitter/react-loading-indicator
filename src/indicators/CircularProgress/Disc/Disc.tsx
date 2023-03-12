import React from "react";

import { DiscProps } from "./Disc.types";
import "./Disc.scss";
import useFontsizeMapper from "../../../hooks/useFontsizeMapper";

const Disc = (props: DiscProps) => {
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

	/* Color SETTING */
	let discColor: string | string[] = props?.color ?? "";
	const discColorStyles: React.CSSProperties =
		discColor instanceof Array
			? { ...genStyleFromColorArr(discColor) }
			: { ...genStyleFromColorStr(discColor) };

	return (
		<span
			className="rli-d-i-b disc-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span
				className="rli-d-i-b disc-loader"
				style={{ ...discColorStyles, ...styles }}
			>
				<span className="rli-d-i-b disc-ring"></span>
				<span
					className="rli-d-i-b rli-text-format disc-text"
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

export { Disc };

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
	// NOT supporting Individual disc coloring
	const [color] = colorArr;

	stylesObject["color"] = color;

	return stylesObject;
}
