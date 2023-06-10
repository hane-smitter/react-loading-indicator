import React from "react";

interface TextProps {
	className?: string;
	text?: string | boolean;
	textColor?: string;
	staticText?: boolean;
}

const staticTextStyles: React.CSSProperties = {
	color: "currentColor",
	mixBlendMode: "difference",
	width: "unset",
	display: "block"
};

const Text = (props: TextProps): JSX.Element => {
	const { className, text, textColor, staticText } = props;
	return (
		<span
			className={`rli-d-i-b rli-text-format ${className}`}
			style={{
				...(staticText && staticTextStyles),
				...(textColor && {
					color: textColor,
					mixBlendMode: "unset"
				})
			}}
		>
			{text
				? typeof text === "string" && text.length
					? text
					: "loading"
				: null}
		</span>
	);
};

export default Text;
