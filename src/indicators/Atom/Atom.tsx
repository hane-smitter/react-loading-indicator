import React from "react";
import { ColorTranslator } from "colortranslator";

import "./Atom.scss";
import { AtomProps } from "./Atom.types";
import useFontsizeMapper from "../../hooks/useFontsizeMapper";

const DEFAULT_COLOR = new ColorTranslator("rgb(50, 205, 50)"); // limegreen

const Atom = (props: AtomProps) => {
	// Styles
	let styles: React.CSSProperties = Object(props?.style);
	/* Size SETTINGS */
	let fontSize: string | number = useFontsizeMapper(props?.size);

	// Setting size by specifying font-size in style attr
	// and modifying styles to exclude fontSize
	// Setting fontsize in style prop will overirde the `size` prop
	if (props?.style?.fontSize) {
		const { fontSize: cssFontSize, ...css } = props?.style;

		styles = css;
		fontSize = cssFontSize;
	}

	/* Color SETTINGS */
	// If Color property is a string, that is the color of all rings
	// If color property is an array, that is color for each rings
	let atomColor: string | string[] = props?.color ?? "";
	const atomColorStyles: React.CSSProperties =
		atomColor instanceof Array
			? { ...genStyleFromColorArr(atomColor) }
			: { ...genStyleFromColorStr(atomColor) };

	return (
		<span
			className="rli-d-i-b atom-bounding-box"
			style={{ ...(fontSize && { fontSize }), ...atomColorStyles }}
		>
			<span className="rli-d-i-b atom-loader" style={{ ...styles }}>
				<span className="rli-d-i-b inner">
					<span className="disc nucleus-holder">
						<span className="nucleus"></span>
					</span>
					<span className="disc"></span>
					<span className="disc"></span>
				</span>
			</span>
			<span
				className="rli-text-format rli-d-i-b atom-text"
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
	);
};

export { Atom };

function genStyleFromColorStr(
	colorStr: string | undefined
): React.CSSProperties {
	colorStr = colorStr ?? "";
	let objStyle: any = {};

	if (!colorStr) return objStyle;

	try {
		const color: ColorTranslator = new ColorTranslator(colorStr);
		objStyle["--color-r"] = color.R;
		objStyle["--color-g"] = color.G;
		objStyle["--color-b"] = color.B;
	} catch (error) {
		console.warn(
			`Possibly an invalid color( ${colorStr} ) passed to Atom loader!`
		);
		objStyle["--color-r"] = DEFAULT_COLOR.R;
		objStyle["--color-g"] = DEFAULT_COLOR.G;
		objStyle["--color-b"] = DEFAULT_COLOR.B;
	}

	return objStyle;
}

function genStyleFromColorArr(colorArr: string[]): React.CSSProperties {
	let objStyles: any = {};
	let arrLength: number = colorArr.length;

	if (arrLength <= 0) return objStyles;

	try {
		const firstColor: ColorTranslator = new ColorTranslator(colorArr[0]);
		objStyles["--color-r"] = firstColor.R;
		objStyles["--color-g"] = firstColor.G;
		objStyles["--color-b"] = firstColor.B;
	} catch (error) {
		console.warn(
			`Possibly an invalid color( ${colorArr[0]} ) passed to Atom loader!`
		);
		objStyles["--color-r"] = DEFAULT_COLOR.R;
		objStyles["--color-g"] = DEFAULT_COLOR.G;
		objStyles["--color-b"] = DEFAULT_COLOR.B;

	}

	for (let i = 0; i < arrLength; i++) {
		if (i >= 3) break; // Max no. of discs can only be 3
		let currentItem: string = `disc${i + 1}`;
		let currentColor = colorArr[i];

		objStyles[`--${currentItem}-color`] = currentColor;
	}

	return objStyles;
}
