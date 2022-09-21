import React from "react";
import { DottedProps } from "./Dotted.types";
import "./Dotted.scss";

const Dotted = (props: DottedProps) => {
  /* Color SETTINGS */
  // If Color property is a string, that is the color of all rings
  // If color property is an array, that is color for each rings
  let allDotsColor: { color?: string } = {};

  if (props?.color && typeof props?.color === "string") {
    allDotsColor = { color: props?.color };
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
  // Deleting font-size style propert since `dot-bounding-box` class in JSX, is
  // the parent to set the fontsize which can be set with the `fontSize` variable.
  if (props?.style?.fontSize) {
    fontSize = props.style.fontSize;
    delete props?.style?.fontSize;
  }

  return (
    <div
      className="react-loading-indicator-normalize dot-bounding-box"
      style={{ ...(fontSize && { fontSize }) }}
    >
      <div
        className="fading-dot-loader"
        style={{ ...allDotsColor, ...props?.style }}
      >
        <div className="fading-dot1 fading-dot"></div>
        <div className="fading-dot2 fading-dot"></div>
        <div className="fading-dot3 fading-dot"></div>
        <div className="fading-dot4 fading-dot"></div>
        <div className="fading-dot5 fading-dot"></div>
        <div className="fading-dot6 fading-dot"></div>
        <div className="fading-dot7 fading-dot"></div>
        <div className="fading-dot8 fading-dot"></div>
        <div className="fading-dot9 fading-dot"></div>
        <div className="fading-dot10 fading-dot"></div>
        <div className="fading-dot11 fading-dot"></div>
        <div className="fading-dot12 fading-dot"></div>

        <div
          className="fading-dot-text"
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
        </div>
      </div>
    </div>
  );
};

export { Dotted };
