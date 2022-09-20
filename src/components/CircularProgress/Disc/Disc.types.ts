import React from "react";
export interface DiscProps {
  color?: string;
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;
  text?: string | boolean;
  textColor?: string;
}
