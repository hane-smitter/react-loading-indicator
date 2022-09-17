import React from "react";
export interface CommetProps {
  color?: [string, string];
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;
  // disabled?: boolean,
  // onClick?: MouseEventHandler<HTMLButtonElement>
}
