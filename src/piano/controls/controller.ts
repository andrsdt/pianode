import { PianoKey } from "../model/piano-key";
import { piano } from "../piano";

export const pressedKeys = new Set<PianoKey>();

export const pressKey = (key: PianoKey) => {
    if (!key || pressedKeys.has(key)) return;
    piano.keyDown(key)
    pressedKeys.add(key)
}

export const releaseKey = (key: PianoKey) => {
    if (!key || !pressedKeys.has(key)) return;
    piano.keyUp(key)
    pressedKeys.delete(key)
}