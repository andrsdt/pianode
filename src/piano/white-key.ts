import { Mesh } from "three";
import { PianoKey } from "./piano-key";

export class WhiteKey extends PianoKey {
    constructor(note: string, octave: number, model: Mesh) {
        super(note, octave, model);
    }
}
