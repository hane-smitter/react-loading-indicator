import React from "react";

interface TextProps {
	className?: string;
	text?: string | boolean;
	textColor?: string;
}

const Text = (props: TextProps): JSX.Element => {
	const { className, text, textColor } = props;
	return (
		<span
			className={`rli-d-i-b rli-text-format ${className}`}
			style={{
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
