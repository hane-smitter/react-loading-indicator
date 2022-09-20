import React from "react";
import { SplitDiscProps } from "./SplitDisc.types";
import "./SplitDisc.scss";

const SplitDisc = (props: SplitDiscProps) => {
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
    ring1Color = {
      ...(ringColors[0] &&
        ({ "--ring1-color": ringColors[0] } as React.CSSProperties)),
    };
    ring2Color = {
      ...(ringColors[1] &&
        ({ "--ring2-color": ringColors[1] } as React.CSSProperties)),
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
  // Deleting font-size style propert since `bounding-box` class in JSX, is
  // the parent to set the fontsize which can be set with the `fontSize` variable.
  if (props?.style?.fontSize) {
    fontSize = props.style.fontSize;
    delete props?.style?.fontSize;
  }
  return (
    <div
      className="split-disc-bounding-box"
      style={{ ...(fontSize && { fontSize }) }}
    >
      <div
        className="split-disc-loader"
        style={{
          ...allRingsColor,
          ...ring1Color,
          ...ring2Color,
          ...props?.style,
        }}
      >
        <div className="split-disc-ring"></div>
        <div
          className="split-disc-text"
          style={{ ...(props?.textColor && { color: props?.textColor }) }}
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

export { SplitDisc };
