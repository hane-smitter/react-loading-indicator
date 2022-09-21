import React, { FC } from "react";
import { CommetProps } from "./Commet.types";
import "./Commet.scss";

const Commet = (props: CommetProps) => {
  // color SETTINGS
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
      ...(ringColors[0] && { color: ringColors[0] }),
    };
    ring2Color = {
      ...(ringColors[1] && { color: ringColors[1] }),
    };
  }

  // Sizes
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
  if (props?.style?.fontSize) {
    fontSize = props.style.fontSize;
    delete props?.style?.fontSize;
  }

  return (
    <div
      className="commet-bounding-box"
      style={{ ...(fontSize && { fontSize }) }}
    >
      <div
        className="commet-loader"
        style={{
          ...allRingsColor,
          ...props?.style,
        }}
      >
        <span
          className="commet-text"
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

        <div className="ring ring1" style={{ ...ring1Color }}>
          <div className="ringball"></div>
        </div>
        <div className="ring ring2" style={{ ...ring2Color }}>
          <div className="ringball"></div>
        </div>
      </div>
    </div>
  );
};

export { Commet };
