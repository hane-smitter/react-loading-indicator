import React from "react";
import { RipleProps } from "./Riple.types";
import "./Riple.scss";

const Riple = (props: RipleProps) => {
  /* Color SETTINGS */
  // If Color property is a string, that is the color of all rings
  // If color property is an array, that is color for each rings
  let allRiplesColor: { color?: string } = {};
  let allRiplesColorArr: string[] = [];

  if (props?.color && typeof props?.color === "string") {
    allRiplesColor = { color: props?.color };
  } else if (props?.color?.length && props?.color instanceof Array) {
    allRiplesColorArr = props?.color;
  }
  if (allRiplesColorArr.length > 0) {
    // NOT supporting Individual riples coloring
    const [allRiples] = allRiplesColorArr;
    allRiplesColor = { color: allRiples };
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
      className="react-loading-indicator-normalize ripple-bounding-box"
      style={{ ...(fontSize && { fontSize }) }}
    >
      <div
        className="ripple-loader"
        style={{ ...allRiplesColor, ...props?.style }}
      >
        <div className="ripple"></div>
        <div className="ripple"></div>

        <div
          className="ripple-text"
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

export { Riple };
