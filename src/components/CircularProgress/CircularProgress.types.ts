import { CommonProps } from "../common.types";

export interface CircularProgressProps extends CommonProps {
	/**
	 * variant of circular loader. Defaults to `disc`.
	 */
	variant?: "dotted" | "bubble-dotted" | "disc" | "split-disc";
}
