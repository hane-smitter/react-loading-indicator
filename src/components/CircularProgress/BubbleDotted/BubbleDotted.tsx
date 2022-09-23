import React from "react";
import { BubbleDottedProps } from "./BubbleDotted.types";
import "./BubbleDotted.scss";

let BubbleDotted = (props: BubbleDottedProps) => {
  // Styles
  let styles: React.CSSProperties = props?.style || {};

  /* Color SETTINGS */
  // If Color property is a string, that is the color of all rings
  // If color property is an array, that is color for each rings
  let allDotsColor: { color?: string } = {};
  let DotsColorArr: string[] = [];

  if (props?.color && typeof props?.color === "string") {
    allDotsColor = { color: props?.color };
  } else if (props?.color?.length && props?.color instanceof Array) {
    DotsColorArr = props?.color;
  }
  if (DotsColorArr.length > 0) {
    // NOT supporting Individual dot coloring
    const [allDots] = DotsColorArr;
    allDotsColor = { color: allDots };
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
      className="d-i-b bubbledot-bounding-box"
      style={{ ...(fontSize && { fontSize }) }}
    >
      <span
        className="d-i-b bubbledot-loader"
        style={{ ...allDotsColor, ...styles }}
      >
        <span className="d-i-b bubbledot1 dot-child"></span>
        <span className="d-i-b bubbledot2 dot-child"></span>
        <span className="d-i-b bubbledot3 dot-child"></span>
        <span className="d-i-b bubbledot4 dot-child"></span>
        <span className="d-i-b bubbledot5 dot-child"></span>
        <span className="d-i-b bubbledot6 dot-child"></span>
        <span className="d-i-b bubbledot7 dot-child"></span>
        <span className="d-i-b bubbledot8 dot-child"></span>
        <span className="d-i-b bubbledot9 dot-child"></span>
        <span className="d-i-b bubbledot10 dot-child"></span>
        <span className="d-i-b bubbledot11 dot-child"></span>
        <span className="d-i-b bubbledot12 dot-child"></span>

        <span
          className="d-i-b bubbledot-text"
          style={{
            ...(props?.textColor && {
              color: props?.textColor,
              mixBlendMode: "unset",
            }),
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

export { BubbleDotted };
