import React from "react";
import { ThreeDotProps } from "./ThreeDot.types";
import { Pulsate } from "./Pulsate";
import { BrickStack } from "./BrickStack";

const ThreeDot = (props: ThreeDotProps) => {
	let { variant: componentVariant = "pulsate" }: ThreeDotProps = Object(props);

	return componentVariant === "pulsate" ? (
		<Pulsate {...props} />
	) : componentVariant === "brick-stack" ? (
		<BrickStack {...props} />
	) : null;
};

export default React.memo(ThreeDot);
