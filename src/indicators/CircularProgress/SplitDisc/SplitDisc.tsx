import React from "react";
import { SplitDiscProps } from "./SplitDisc.types";
import "./SplitDisc.scss";

const SplitDisc = (props: SplitDiscProps) => {
	// Styles
	let styles: React.CSSProperties = props?.style || {};

	/* Color SETTINGS */
	// If Color property is a string, that is the color of all rings
	// If color property is an array, that is color for each rings
	let allRingsColor: { color?: string } = {};
	let ringColors: string[] = [];
	let ring1Color: { color?: string } = {};
	let ring2Color: { color?: string } = {};

	if (props?.color && typeof props?.color === "string") {
		allRingsColor = { color: props?.color };
	} else if (props?.color?.length && props?.color instanceof Array) {
		ringColors = props?.color;
	}
	if (ringColors.length > 0) {
		const [ring1, ring2] = ringColors;
		ring1Color = {
			...(ring1 && ({ "--ring1-color": ring1 } as React.CSSProperties))
		};
		ring2Color = {
			...(ring2 && ({ "--ring2-color": ring2 } as React.CSSProperties))
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
			className="rli-d-i-b split-disc-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span
				className="rli-d-i-b split-disc-loader"
				style={{
					...allRingsColor,
					...ring1Color,
					...ring2Color,
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
