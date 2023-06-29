import { CommonProps } from "../common.types";

export interface OrbitProgressProps extends CommonProps {
	/**
	 * variant of an orbitting loading indicator. Defaults to `disc`.
	 */
	variant?: "dotted" | "bubble-dotted" | "disc" | "split-disc" | "track-disc";
}
