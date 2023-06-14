import { CommonProps } from "../common.types";

export interface CircularProgressProps extends CommonProps {
	/**
	 * variant of a circular loading indicator. Defaults to `disc`.
	 */
	variant?: "dotted" | "bubble-dotted" | "disc" | "split-disc" | "track-disc";
}
