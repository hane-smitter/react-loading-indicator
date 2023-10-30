interface Pace {
	/** CSS time in seconds */
	animationPeriod: string;
}

const useAnimationPacer = (
	speedPlus: number | string | undefined,
	defaultDuration: string
): Pace => {
	// NOTE: Slowing down animation means increasing the duration
	const MAX_SPEED_UNIT = 5;
	const unitlessSpeedFactor: number =
		(typeof speedPlus === "string" ? parseInt(speedPlus) : speedPlus) || 0;

	// Should be in range, for example -5 to 5
	if (
		unitlessSpeedFactor >= -1 * MAX_SPEED_UNIT &&
		unitlessSpeedFactor <= MAX_SPEED_UNIT
	) {
		const speedUnit: number = unitlessSpeedFactor;
		const duration: number = parseFloat(defaultDuration);
		const step: number = duration / MAX_SPEED_UNIT;
		let newDuration: number = duration + speedUnit * step * -1;

		// If resultant duration is zero or too small, then set to 0.1
		(newDuration == 0 || newDuration <= Number.EPSILON) && (newDuration = 0.1);

		const newDurationInSeconds: string = newDuration + "s"; // ADD CSS seconds unit

		return { animationPeriod: newDurationInSeconds };
	}

	return { animationPeriod: defaultDuration };
};

export default useAnimationPacer;
