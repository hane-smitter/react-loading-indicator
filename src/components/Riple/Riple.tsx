import React from "react";
import { RipleProps } from "./Riple.types";
import "./Riple.scss";

const Riple = (props: RipleProps) => {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
};

export { Riple };
