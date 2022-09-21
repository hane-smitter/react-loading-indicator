import React from "react";
import { AtomProps } from "./Seek.types";
import "./Seek.scss";

const Seek = (props: AtomProps) => {
  /* Color SETTINGS */
  // If Color property is a string, that is the color of all rings
  // If color property is an array, that is color for each rings
  let allSeekBouncesColor: { color?: string } = {};

  if (props?.color && typeof props?.color === "string") {
    allSeekBouncesColor = { color: props?.color };
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
      className="seek-bounding-box"
      style={{ ...(fontSize && { fontSize }) }}
    >
      <div className="seek-loader" style={{ ...allSeekBouncesColor, ...props?.style }}>
        <div className="seek-bounce seek-bounce1"></div>
        <div className="seek-bounce seek-bounce2"></div>
        <div className="seek-bounce seek-bounce3"></div>

        <div
          className="seek-text"
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

export { Seek };
