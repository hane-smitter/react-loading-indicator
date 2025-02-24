/**
 * Repeat array items to `length`, otherwise truncate to `length`.
 * @example
 * arrayRepeat(["cyan", "red"], 4);
 * // returns ["cyan", "red", "cyan", "red"]
 */
function arrayRepeat(array: string[], length: number = 0): Array<string> {
	if (array.length === 0) {
		throw new Error("Input array cannot be empty!");
	}

	const colorArray: Array<string> = [];

	function repeatToLength(array: string[], length: number = 0): Array<string> {
		colorArray.push(...array);

		if (colorArray.length < length) {
			repeatToLength(colorArray, length);
		}

		const sizedArr = colorArray.slice(0, length);

		return sizedArr;
	}

	return repeatToLength(array, length);
}

export default arrayRepeat;
