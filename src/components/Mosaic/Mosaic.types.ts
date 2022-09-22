import React from "react";
export interface MosaicProps {
	color?: string | string[];
	size?: "small" | "medium" | "large";
	style?: React.CSSProperties;
	text?: string | boolean;
	textColor?: string;
}
