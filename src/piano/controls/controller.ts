import { Key } from "../../types/key";
import { PianoKey } from "../model/piano-key";
import { piano } from "../piano";

export const pressedKeys = new Set<string>(); // {A3, B#4, C9}...

export const pressKey = (k: Key | PianoKey | undefined, velocity = 1) => {
    if (k instanceof PianoKey) k = k.key
    const kStr = `${k?.note}${k?.octave}`;
    if (!k || pressedKeys.has(kStr)) return;

    piano.keyDown(k, velocity)
    pressedKeys.add(kStr)
}

export const releaseKey = (k: Key | PianoKey | undefined) => {
    if (k instanceof PianoKey) k = k.key
    const kStr = `${k?.note}${k?.octave}`;
    if (!k || !pressedKeys.has(kStr)) return;

    piano.keyUp(k)
    pressedKeys.delete(kStr)
}
