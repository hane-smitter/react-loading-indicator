import React from "react";
import { AtomProps } from "./Seek.types";
import "./Seek.scss";

const Seek = (props: AtomProps) => {
	// Styles
	let styles: React.CSSProperties = props?.style || {};

	/* Color SETTINGS */
	// If Color property is a string, that is the color of all rings
	// If color property is an array, that is color for each rings
	let allSeekBouncesColor: { color?: string } = {};
	let allSeekBouncesColorArr: string[] = [];

	if (props?.color && typeof props?.color === "string") {
		allSeekBouncesColor = { color: props?.color };
	} else if (props?.color?.length && props?.color instanceof Array) {
		allSeekBouncesColorArr = props?.color;
	}
	if (allSeekBouncesColorArr.length > 0) {
		// NOT supporting Individual riples coloring
		const [allSeekBounces] = allSeekBouncesColorArr;
		allSeekBouncesColor = { color: allSeekBounces };
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
			className="d-i-b seek-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span
				className="d-i-b seek-loader"
				style={{ ...allSeekBouncesColor, ...styles }}
			>
				<span className="d-i-b seek-bounce seek-bounce1"></span>
				<span className="d-i-b seek-bounce seek-bounce2"></span>
				<span className="d-i-b seek-bounce seek-bounce3"></span>

				<span
					className="d-i-b seek-text"
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

export { Seek };
