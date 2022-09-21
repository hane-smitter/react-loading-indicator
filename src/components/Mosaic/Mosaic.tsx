import React from "react";
import { MosaicProps } from "./Mosaic.types";
import "./Mosaic.scss";

const Mosaic = (props: MosaicProps) => {
  /* Color SETTINGS */
  // If Color property is a string, that is the color of all rings
  // If color property is an array, that is color for each rings
  let allTesseraeColor: { color?: string } = {};

  if (props?.color && typeof props?.color === "string") {
    allTesseraeColor = { color: props?.color };
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
      className="react-loading-indicator-normalize mosaic-bounding-box"
      style={{ ...(fontSize && { fontSize }) }}
    >
      <div
        className="mosaic-loader"
        style={{ ...allTesseraeColor, ...props?.style }}
      >
        <div className="mosaic-cube mosaic-cube1"></div>
        <div className="mosaic-cube mosaic-cube2"></div>
        <div className="mosaic-cube mosaic-cube3"></div>
        <div className="mosaic-cube mosaic-cube4"></div>
        <div className="mosaic-cube mosaic-cube5"></div>
        <div className="mosaic-cube mosaic-cube6"></div>
        <div className="mosaic-cube mosaic-cube7"></div>
        <div className="mosaic-cube mosaic-cube8"></div>
        <div className="mosaic-cube mosaic-cube9"></div>

        <div
          className="mosaic-cube-text"
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

export { Mosaic };
