import React, { FC } from "react";
import { CommetProps } from "./Commet.types";
import "./Commet.scss";

const Commet: FC<CommetProps> = () => {
  return (
    <div className="loader">
      <div className="face" /* style={{ color: "blue" }} */>
        <div className="circle"></div>
      </div>
      <div className="face">
        <div className="circle"></div>
      </div>
    </div>
  );
};

export {Commet};
