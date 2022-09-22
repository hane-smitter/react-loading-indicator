import React from "react";
export interface CircularProgressProps {
	color?: string | string[];
	size?: "small" | "medium" | "large";
	style?: React.CSSProperties;
	text?: string | boolean;
	textColor?: string;
	variant?: "dotted" | "bubble-dotted" | "disc" | "split-disc";
}
