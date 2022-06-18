import { Mesh } from "three";
import { PianoKey } from "../../piano-key";

export class WhiteKeyBlender extends PianoKey {
    constructor(note: string, octave: number, model: Mesh) {
        super(note, octave, model);
        this.baseY = 0.6;
        this.keyDownAnimationTo = { yPos: this.baseY, zRot: 0.06 }
    }
}
