import { Mesh } from "three";

export abstract class PianoKey {
    note: string;
    octave: number;
    model: Mesh;

    constructor(note: string, octave: number) {
        this.note = note;
        this.octave = octave;
        this.model = new Mesh();
    }
}
