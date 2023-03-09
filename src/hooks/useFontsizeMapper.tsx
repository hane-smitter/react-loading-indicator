type sizeType = "small" | "medium" | "large" | undefined;

const useFontsizeMapper = (size: sizeType): string | number => {
	size = size;

	let fontSize: string | number = "";
	switch (size) {
		case "small":
			fontSize = "12px";
			break;
		case "medium":
			fontSize = "16px";
			break;
		case "large":
			fontSize = "20px";
			break;
	}

	return fontSize;
};

export default useFontsizeMapper;
