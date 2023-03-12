"use strict";

import React from "react";

import { MosaicProps } from "./Mosaic.types";
import "./Mosaic.scss";
import useFontsizeMapper from "../../hooks/useFontsizeMapper";

const Mosaic = (props: MosaicProps) => {
	// Styles
	let styles: React.CSSProperties = Object(props?.style);

	/* Size SETTINGS */
	let fontSize: string | number = useFontsizeMapper(props?.size);

	// Setting size by specifying font-size in style attr
	// Deleting font-size style propert since `dot-bounding-box` class in JSX, is
	// the parent to set the fontsize which can be set with the `fontSize` variable.
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
	const tesseraeColor: string | string[] = props?.color ?? "";
	const tesseraeColorStyles: React.CSSProperties =
		tesseraeColor instanceof Array
			? { ...genStyleFromColorArr(tesseraeColor) }
			: { ...genStyleFromColorStr(tesseraeColor) };

	return (
		<span
			className="rli-d-i-b react-loading-indicator-normalize mosaic-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span
				className="rli-d-i-b mosaic-loader"
				style={{ ...tesseraeColorStyles, ...styles }}
			>
				<span className="rli-d-i-b mosaic-cube mosaic-cube1"></span>
				<span className="rli-d-i-b mosaic-cube mosaic-cube2"></span>
				<span className="rli-d-i-b mosaic-cube mosaic-cube3"></span>
				<span className="rli-d-i-b mosaic-cube mosaic-cube4"></span>
				<span className="rli-d-i-b mosaic-cube mosaic-cube5"></span>
				<span className="rli-d-i-b mosaic-cube mosaic-cube6"></span>
				<span className="rli-d-i-b mosaic-cube mosaic-cube7"></span>
				<span className="rli-d-i-b mosaic-cube mosaic-cube8"></span>
				<span className="rli-d-i-b mosaic-cube mosaic-cube9"></span>

				<span
					className="rli-d-i-b rli-text-format mosaic-cube-text"
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

export { Mosaic };

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
	// NOT supporting Individual tesseract coloring
	const [color] = colorArr;

	stylesObject["color"] = color;

	return stylesObject;
}
