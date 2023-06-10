import React from "react";
import { ColorTranslator } from "colortranslator";

import "./Atom.scss";
import { AtomProps } from "./Atom.types";
import { defaultColor } from "../variables";
import useStylesPipeline from "../../hooks/useStylesPipeline";
import Text from "../../utils/Text";

const DEFAULT_COLOR = new ColorTranslator(defaultColor);

const Atom = (props: AtomProps) => {
	// Styles
	let { styles, fontSize } = useStylesPipeline(props?.style, props?.size);

	/* Color SETTINGS */
	// If Color property is a string, that is the color of all rings
	// If color property is an array, that is color for each rings
	let colorProp: string | string[] = props?.color ?? "";
	const atomColorStyles: React.CSSProperties =
		stylesObjectFromColorProp(colorProp);

	return (
		<span
			className="rli-d-i-b atom-rli-bounding-box"
			style={{ ...(fontSize && { fontSize }), ...atomColorStyles }}
		>
			<span className="rli-d-i-b atom-throbber" style={{ ...styles }}>
				<span className="rli-d-i-b inner">
					<span className="disc nucleus-holder">
						<span className="nucleus"></span>
					</span>
					<span className="disc"></span>
					<span className="disc"></span>
				</span>
			</span>
			<Text
				className="atom-text"
				staticText
				text={props?.text}
				textColor={props?.textColor}
			/>
		</span>
	);
};

export { Atom };

function stylesObjectFromColorProp(
	colorProp: string | string[]
): React.CSSProperties {
	const stylesObject: any = {};

	if (colorProp instanceof Array) {
		let arrLength: number = colorProp.length;

		if (arrLength <= 0) return stylesObject;

		try {
			const firstColor: ColorTranslator = new ColorTranslator(colorProp[0]);
			stylesObject["--color-r"] = firstColor.R;
			stylesObject["--color-g"] = firstColor.G;
			stylesObject["--color-b"] = firstColor.B;
		} catch (error) {
			console.warn(
				`Possibly an invalid color( ${colorProp[0]} ) passed to Atom loader!`
			);
			stylesObject["--color-r"] = DEFAULT_COLOR.R;
			stylesObject["--color-g"] = DEFAULT_COLOR.G;
			stylesObject["--color-b"] = DEFAULT_COLOR.B;
		}

		for (let i = 0; i < arrLength; i++) {
			if (i >= 3) break; // Max no. of discs can only be 3
			let currentItem: string = `disc${i + 1}`;
			let currentColor = colorProp[i];

			stylesObject[`--${currentItem}-color`] = currentColor;
		}
		return stylesObject;
	}

	if (!colorProp) return stylesObject;

	try {
		const color: ColorTranslator = new ColorTranslator(colorProp);
		stylesObject["--color-r"] = color.R;
		stylesObject["--color-g"] = color.G;
		stylesObject["--color-b"] = color.B;
	} catch (error) {
		console.warn(
			`Invalid color( ${JSON.stringify(colorProp)} ) passed to Atom loader!`
		);
		stylesObject["--color-r"] = DEFAULT_COLOR.R;
		stylesObject["--color-g"] = DEFAULT_COLOR.G;
		stylesObject["--color-b"] = DEFAULT_COLOR.B;
	}

	return stylesObject;
}
