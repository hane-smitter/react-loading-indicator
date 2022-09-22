import React from "react";
import { AtomProps } from "./Atom.types";
import "./Atom.scss";

const Atom = (props: AtomProps) => {
  /* Color SETTINGS */
  // If Color property is a string, that is the color of all rings
  // If color property is an array, that is color for each rings
  let allRingsColor: { color?: string } = {};
  let orbitColorsArr: string[] = [];
  let orbit1Color: { color?: string } = {};
  let orbit2Color: { color?: string } = {};
  let orbit3Color: { color?: string } = {};

  if (props?.color && typeof props?.color === "string") {
    allRingsColor = { color: props?.color };
  } else if (props?.color?.length && props?.color instanceof Array) {
    orbitColorsArr = props?.color;
  }
  if (orbitColorsArr.length > 0) {
    const [orbit1, orbit2, orbit3] = orbitColorsArr;
    orbit1Color = {
      ...(orbit1 && { color: orbit1 }),
    };
    orbit2Color = {
      ...(orbit2 && { color: orbit2 }),
    };
    orbit3Color = {
      ...(orbit3 && { color: orbit3 }),
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
      className="atom-bounding-box"
      style={{ ...(fontSize && { fontSize }) }}
    >
      <div
        className="atom-loader"
        style={{
          ...allRingsColor,
          ...props?.style,
        }}
      >
        <div className="orbit-holder orbit-holder-1" style={{ ...orbit1Color }}>
          <div className="orbit orbit1"></div>
        </div>
        <div className="orbit-holder orbit-holder-2" style={{ ...orbit2Color }}>
          <div className="orbit orbit2">
            <div className="electron"></div>
          </div>
        </div>
        <div className="orbit-holder orbit-holder-3" style={{ ...orbit3Color }}>
          <div className="orbit orbit3"></div>
        </div>

        <span
          className="atom-text"
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
      </div>
    </div>
  );
};

export { Atom };
