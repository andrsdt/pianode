import { PianoKey } from "../core/piano-key";

export class WhiteKey extends PianoKey {
    constructor(note: string, octave: number) {
        super(note, octave);
    }
}
