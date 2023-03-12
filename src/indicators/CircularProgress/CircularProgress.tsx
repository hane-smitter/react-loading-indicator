import React from "react";
import { BubbleDotted } from "./BubbleDotted";
import { CircularProgressProps } from "./CircularProgress.types";
import { Disc } from "./Disc";
import { Dotted } from "./Dotted";
import { SplitDisc } from "./SplitDisc";

const CircularProgress = (props: CircularProgressProps) => {
	let componentVariant: string = props?.variant || "disc";

	return componentVariant === "dotted" ? (
		<Dotted {...props} />
	) : componentVariant === "bubble-dotted" ? (
		<BubbleDotted {...props} />
	) : componentVariant === "disc" ? (
		<Disc {...props} />
	) : componentVariant === "split-disc" ? (
		<SplitDisc {...props} />
	) : null;
};

export { CircularProgress };
