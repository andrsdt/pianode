import { PianoKey } from "../core/piano-key";

export class BlackKey extends PianoKey {
    constructor(note: string, octave: number) {
        super(note, octave);
    }
}
