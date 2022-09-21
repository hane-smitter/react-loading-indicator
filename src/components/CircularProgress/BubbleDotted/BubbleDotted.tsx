import React from "react";
import { BubbleDottedProps } from "./BubbleDotted.types";
import "./BubbleDotted.scss";

const BubbleDotted = (props: BubbleDottedProps) => {
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
  // Deleting font-size style propert since `bounding-box` class in JSX, is
  // the parent to set the fontsize which can be set with the `fontSize` variable.
  if (props?.style?.fontSize) {
    fontSize = props.style.fontSize;
    delete props?.style?.fontSize;
  }
  return (
    <div
      className="bubbledot-bounding-box"
      style={{ ...(fontSize && { fontSize }) }}
    >
      <div
        className="bubbledot-loader"
        style={{ ...allDotsColor, ...props?.style }}
      >
        <div className="bubbledot1 dot-child"></div>
        <div className="bubbledot2 dot-child"></div>
        <div className="bubbledot3 dot-child"></div>
        <div className="bubbledot4 dot-child"></div>
        <div className="bubbledot5 dot-child"></div>
        <div className="bubbledot6 dot-child"></div>
        <div className="bubbledot7 dot-child"></div>
        <div className="bubbledot8 dot-child"></div>
        <div className="bubbledot9 dot-child"></div>
        <div className="bubbledot10 dot-child"></div>
        <div className="bubbledot11 dot-child"></div>
        <div className="bubbledot12 dot-child"></div>

        <div
          className="bubbledot-text"
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

export { BubbleDotted };
