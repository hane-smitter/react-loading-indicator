import React, { FC } from "react";
import { CommetProps } from "./Commet.types";
import "./Commet.scss";

const Commet = (props: CommetProps) => {
  // Ring colors
  const ringColors: [string, string] = props?.color || ["", ""];
  const ring1Color = {
    ...(ringColors[0] && { color: ringColors[0] }),
  };
  const ring2Color = {
    ...(ringColors[1] && { color: ringColors[1] }),
  };

  // Sizes
  const size: string = props?.size || "";
  let correlation: number = 1;
  switch (size) {
    case "small":
      correlation = 0.9;
      break;
    case "medium":
      correlation = 1.2;
      break;
    case "large":
      correlation = 1.5;
      break;
  }

  // if (props?.style?.height) {
  //   props?.style?.height = `calc(${correlation} * ${props?.style?.height})`;
  // }
  // if (props?.style?.width) {
  //   props?.style?.width = `calc(${correlation} * ${props?.style?.width})`;
  // }

  return (
    <div
      className="loader"
      style={{
        ...(correlation &&
          ({ "--correlation": correlation } as React.CSSProperties)),
        ...props?.style,
      }}
    >
      <div className="ring ring1" style={{ ...ring1Color }}>
        <div className="ringball"></div>
      </div>
      <div className="ring ring2" style={{ ...ring2Color }}>
        <div className="ringball"></div>
      </div>
    </div>
  );
};

export { Commet };
