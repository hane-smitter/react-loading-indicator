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
  let fontSize: string = "";
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

  return (
    <div className="bounding" style={{ ...(fontSize && { fontSize }) }}>
      <div
        className="loader"
        style={{
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
    </div>
  );
};

export { Commet };
