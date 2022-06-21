import { Piano } from "@tonejs/piano";
import { useStore } from "../../store";
import { usePrevious } from "../../hooks/UsePrevious";

export interface ToneKey {
	note: string;
	velocity: number;
}

const tone = new Piano({
	velocities: 3,
	// Increase for more precision when using a MIDI device with weighted keys.
	// Keyboard and mouse controls will only use one velocity
});

tone.toDestination();

tone.load();

export function Tone() {
	const [pressedKeys, isPedalDown] = useStore((state) => [
		state.pressedKeys,
		state.isPedalDown,
	]);
	const previousKeys = usePrevious(pressedKeys) || [{ note: "", velocity: 0 }];

	// Play all the new notes that weren't pressed in the previous state
	pressedKeys
		.filter((key) => !previousKeys.includes(key))
		.forEach((k) => tone.keyDown(k));

	// Stop all the notes that were pressed in the previous state and aren't in this one
	previousKeys
		.filter((key) => !pressedKeys.includes(key))
		.forEach((k) => tone.keyUp(k));

	// This will be called every time the the [isPedalDown] state changes
	isPedalDown ? tone.pedalDown() : tone.pedalUp();

	return null;
}
