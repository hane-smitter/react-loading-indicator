import React from "react";
import { DiscProps } from "./Disc.types";
import "./Disc.scss";

const Disc = (props: DiscProps) => {
  /* Color SETTING */
  let ringColor: { color?: string } = {};
  if (props?.color && typeof props?.color === "string") {
    ringColor = { color: props?.color };
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
      className="disc-bounding-box"
      style={{ ...(fontSize && { fontSize }) }}
    >
      <div className="disc-loader" style={{ ...ringColor }}>
        <div className="disc-ring"></div>
        <div className="disc-text">
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

export { Disc };
