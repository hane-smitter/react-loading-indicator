import React from "react";
import { DottedProps } from "./Dotted.types";
import "./Dotted.scss";

const Dotted = (props: DottedProps) => {
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
      className="d-i-b react-loading-indicator-normalize dot-bounding-box"
      style={{ ...(fontSize && { fontSize }) }}
    >
      <span
        className="d-i-b fading-dot-loader"
        style={{ ...allDotsColor, ...styles }}
      >
        <span className="d-i-b fading-dot1 fading-dot"></span>
        <span className="d-i-b fading-dot2 fading-dot"></span>
        <span className="d-i-b fading-dot3 fading-dot"></span>
        <span className="d-i-b fading-dot4 fading-dot"></span>
        <span className="d-i-b fading-dot5 fading-dot"></span>
        <span className="d-i-b fading-dot6 fading-dot"></span>
        <span className="d-i-b fading-dot7 fading-dot"></span>
        <span className="d-i-b fading-dot8 fading-dot"></span>
        <span className="d-i-b fading-dot9 fading-dot"></span>
        <span className="d-i-b fading-dot10 fading-dot"></span>
        <span className="d-i-b fading-dot11 fading-dot"></span>
        <span className="d-i-b fading-dot12 fading-dot"></span>

        <span
          className="d-i-b fading-dot-text"
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

export { Dotted };
