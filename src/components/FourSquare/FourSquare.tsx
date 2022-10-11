import React from "react";
import { FourSquareProps } from "./FourSquare.types";
import "./FourSquare.scss";

export const FourSquare = (props: FourSquareProps) => {
	// Styles
	let styles: React.CSSProperties = props?.style || {};

	/* Color SETTINGS */
	// If Color property is a string, that is the color of all rings
	// If color property is an array, that is color for each rings
	let allBoxesColor: { color?: string } = {};
	let fourSquareBoxesArr: string[] = [];
	let fourSquareBox1Color: { color?: string } = {};
	let fourSquareBox2Color: { color?: string } = {};
	let fourSquareBox3Color: { color?: string } = {};
	let fourSquareBox4Color: { color?: string } = {};

	if (props?.color && typeof props?.color === "string") {
		allBoxesColor = { color: props?.color };
	} else if (props?.color?.length && props?.color instanceof Array) {
		fourSquareBoxesArr = props?.color;
	}
	if (fourSquareBoxesArr.length > 0) {
		const [box1, box2, box3, box4] = fourSquareBoxesArr;
		fourSquareBox1Color = {
			...(box1 && { color: box1 })
		};
		fourSquareBox2Color = {
			...(box2 && { color: box2 })
		};
		fourSquareBox3Color = {
			...(box3 && { color: box3 })
		};
		fourSquareBox4Color = {
			...(box4 && { color: box4 })
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
			className="d-i-b foursquare-bounding-box"
			style={{ ...(fontSize && { fontSize }) }}
		>
			<span className={`d-i-b foursquare-loader`} style={{ ...allBoxesColor }}>
				<span className="d-i-b squares-container">
					<span
						className={`square square1`}
						style={{ ...fourSquareBox1Color }}
					></span>
					<span
						className={`square square2`}
						style={{ ...fourSquareBox2Color }}
					></span>
					<span
						className={`square square3`}
						style={{ ...fourSquareBox3Color }}
					></span>
					<span
						className={`square square4`}
						style={{ ...fourSquareBox4Color }}
					></span>
				</span>

				<span
					className="d-i-b foursquare-text"
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
