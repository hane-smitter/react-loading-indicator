import React from "react";
export interface FourSquareProps {
	color?: string | string[];
	size?: "small" | "medium" | "large";
	style?: React.CSSProperties;
	text?: string | boolean;
	textColor?: string;
}
