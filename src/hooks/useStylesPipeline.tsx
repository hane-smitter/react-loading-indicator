import { CSSProperties } from "react";

type sizeType = "small" | "medium" | "large" | undefined;
interface Output {
	styles: CSSProperties;
	fontSize?: string | number;
}

const useStylesPipeline = (
	styles: CSSProperties | undefined,
	fontSize: sizeType
): Output => {
	// Ensure styles is still an object, incase of `null` or `undefined`
	const stylesParam = styles || {};

	// Mapping `keyword` fontSize to a known `CSS value`
	let mappedFontSize: string | number | undefined = "";
	switch (fontSize) {
		case "small":
			mappedFontSize = "12px";
			break;
		case "medium":
			mappedFontSize = "16px";
			break;
		case "large":
			mappedFontSize = "20px";
			break;
		default:
			mappedFontSize = undefined;
	}

	let normalizedStyles: any = {};

	// If styles has fontSize attribute, we detach into separate vars
	if (stylesParam.fontSize) {
		const { fontSize: customFontSize, ...customCss } = stylesParam;

		normalizedStyles = customCss;
		mappedFontSize = customFontSize;
	}

	return { fontSize: mappedFontSize, styles: normalizedStyles };
};

export default useStylesPipeline;
