import React from "react";
export interface CommonProps {
	color?: string | string[];
	size?: "small" | "medium" | "large";
	style?: React.CSSProperties;
	text?: string | boolean;
	textColor?: string;
}
