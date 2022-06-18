import { Mesh } from "three";
import { PianoKey } from "../../piano-key";

export class BlackKeyBlender extends PianoKey {
    constructor(note: string, octave: number, model: Mesh) {
        super(note, octave, model);
        this.baseY = 3
        this.keyDownAnimationTo = { yPos: this.baseY - 0.7, zRot: -0.05 }
    }
}
