
import { Mesh } from "three";
import { piano } from "./tone";

export abstract class PianoKey {
    uuid: string;
    note: string;
    octave: number;
    pressed: boolean;
    model: Mesh;

    constructor(note: string, octave: number) {
        this.note = note;
        this.octave = octave;
        this.pressed = false;
        this.model = new Mesh();
        this.uuid = this.model.uuid;
    }

    keyDown = () => {
        if (this.pressed) return;

        piano.keyDown({ note: `${this.note}${this.octave}` })

        this.model.translateY(-0.5)
        this.model.rotateZ(0.08);
        this.pressed = true;
    }

    keyUp = () => {
        if (!this.pressed) return;

        piano.keyUp({ note: `${this.note}${this.octave}` })

        this.model.rotateZ(-0.08);
        this.model.translateY(0.5)
        this.pressed = false;
    }
}
