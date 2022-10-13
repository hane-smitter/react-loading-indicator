import React from "react";
import { DiscProps } from "./Disc.types";
import "./Disc.scss";

const Disc = (props: DiscProps) => {
  // Styles
  let styles: React.CSSProperties = props?.style || {};

  /* Color SETTING */
  let ringColor: { color?: string } = {};
  let ringColorArr: string[] = [];

  if (props?.color && typeof props?.color === "string") {
    ringColor = { color: props?.color };
  } else if (props?.color?.length && props?.color instanceof Array) {
    ringColorArr = props?.color;
  }
  if (ringColorArr.length > 0) {
    // NOT supporting Individual ring coloring
    const [allRings] = ringColorArr;
    ringColor = { color: allRings };
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
      className="rli-d-i-b disc-bounding-box"
      style={{ ...(fontSize && { fontSize }) }}
    >
      <span className="rli-d-i-b disc-loader" style={{ ...ringColor, ...styles }}>
        <span className="rli-d-i-b disc-ring"></span>
        <span
          className="rli-d-i-b disc-text"
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

export { Disc };
