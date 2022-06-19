import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";
import { PianoKey } from "../../piano-key";

const WHITE_KEY_X_SIZE = 19
const WHITE_KEY_Y_SIZE = 3
const WHITE_KEY_Z_SIZE = 3

export class WhiteKeyThreeJs extends PianoKey {
    constructor(note: string, octave: number) {
        super(note, octave, new Mesh());

        this.baseY = 0
        this.keyDownAnimationTo = { yPos: -0.5, zRot: 0.08 }

        this.model.geometry = new BoxGeometry(WHITE_KEY_X_SIZE, WHITE_KEY_Y_SIZE, WHITE_KEY_Z_SIZE);
        this.model.material = new MeshStandardMaterial({ color: '#fff' });

    }
}
