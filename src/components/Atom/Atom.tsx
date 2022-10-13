import React from "react";
import { AtomProps } from "./Atom.types";
import "./Atom.scss";

const Atom = (props: AtomProps) => {
	// Styles
	let styles: React.CSSProperties = props?.style || {};

	/* Color SETTINGS */
	// If Color property is a string, that is the color of all rings
	// If color property is an array, that is color for each rings
	let allRingsColor: { color?: string } = {};
	let orbitColorsArr: string[] = [];
	let orbit1Color: { color?: string } = {};
	let orbit2Color: { color?: string } = {};
	let orbit3Color: { color?: string } = {};

	if (props?.color && typeof props?.color === "string") {
		allRingsColor = { color: props?.color };
	} else if (props?.color?.length && props?.color instanceof Array) {
		orbitColorsArr = props?.color;
	}
	if (orbitColorsArr.length > 0) {
		const [orbit1, orbit2, orbit3] = orbitColorsArr;
		orbit1Color = {
			...(orbit1 && { color: orbit1 })
		};
		orbit2Color = {
			...(orbit2 && { color: orbit2 })
		};
		orbit3Color = {
			...(orbit3 && { color: orbit3 })
		};
	}

	/* Size SETTINGS */
	const size: string = props?.size || "";
	let fontSize: string | number = "";
	switch (size) {
		case "small":
			fontSize = "12px";
			break;
		case "medium":
			fontSize = "16px";
			break;
		case "large":
			fontSize = "20px";
			break;
	}
	// Setting size by specifying font-size in style attr
  // and modifying styles to exclude fontSize
	if (props?.style?.fontSize) {
		const { fontSize: extractedFontSize, ...extractedStyles } = props?.style;

    styles = extractedStyles;
		fontSize = extractedFontSize;
	}

	return (
		<span
			className="rli-d-i-b atom-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span
				className="rli-d-i-b atom-loader"
				style={{
					...allRingsColor,
					...styles
				}}
			>
				<span
					className="rli-d-i-b orbit-holder orbit-holder-1"
					style={{ ...orbit1Color }}
				>
					<span className="rli-d-i-b orbit orbit1"></span>
				</span>
				<span
					className="rli-d-i-b orbit-holder orbit-holder-2"
					style={{ ...orbit2Color }}
				>
					<span className="rli-d-i-b orbit orbit2">
						<span className="rli-d-i-b electron"></span>
					</span>
				</span>
				<span
					className="rli-d-i-b orbit-holder orbit-holder-3"
					style={{ ...orbit3Color }}
				>
					<span className="rli-d-i-b orbit orbit3"></span>
				</span>

				<span
					className="rli-d-i-b atom-text"
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

export { Atom };
