import React from "react";
export interface AtomProps {
  color?: string|string[];
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;
  text?: string | boolean;
  textColor?: string;
}
