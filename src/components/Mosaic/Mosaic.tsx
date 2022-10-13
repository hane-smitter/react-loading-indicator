import React from "react";
import { MosaicProps } from "./Mosaic.types";
import "./Mosaic.scss";

const Mosaic = (props: MosaicProps) => {
  // Styles
  let styles: React.CSSProperties = props?.style || {};

  /* Color SETTINGS */
  // If Color property is a string, that is the color of all rings
  // If color property is an array, that is color for each rings
  let allTesseraeColor: { color?: string } = {};
  let allTesseraeColorArr: string[] = [];

  if (props?.color && typeof props?.color === "string") {
    allTesseraeColor = { color: props?.color };
  } else if (props?.color?.length && props?.color instanceof Array) {
    allTesseraeColorArr = props?.color;
  }
  if (allTesseraeColorArr.length > 0) {
    // NOT supporting Individual tesse coloring
    const [allTesserae] = allTesseraeColorArr;
    allTesseraeColor = { color: allTesserae };
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
  // Setting size by specifying font-size in style attr
  // and modifying styles to exclude fontSize
	if (props?.style?.fontSize) {
		const { fontSize: extractedFontSize, ...extractedStyles } = props?.style;

    styles = extractedStyles;
		fontSize = extractedFontSize;
	}

  return (
    <span
      className="rli-d-i-b react-loading-indicator-normalize mosaic-bounding-box"
      style={{ ...(fontSize && { fontSize }) }}
    >
      <span
        className="rli-d-i-b mosaic-loader"
        style={{ ...allTesseraeColor, ...styles }}
      >
        <span className="rli-d-i-b mosaic-cube mosaic-cube1"></span>
        <span className="rli-d-i-b mosaic-cube mosaic-cube2"></span>
        <span className="rli-d-i-b mosaic-cube mosaic-cube3"></span>
        <span className="rli-d-i-b mosaic-cube mosaic-cube4"></span>
        <span className="rli-d-i-b mosaic-cube mosaic-cube5"></span>
        <span className="rli-d-i-b mosaic-cube mosaic-cube6"></span>
        <span className="rli-d-i-b mosaic-cube mosaic-cube7"></span>
        <span className="rli-d-i-b mosaic-cube mosaic-cube8"></span>
        <span className="rli-d-i-b mosaic-cube mosaic-cube9"></span>

        <span
          className="rli-d-i-b mosaic-cube-text"
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

export { Mosaic };
