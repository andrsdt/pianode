import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";
import { PianoKey } from "../../piano-key";

const BLACK_KEY_X_SIZE = 9
const BLACK_KEY_Y_SIZE = 3
const BLACK_KEY_Z_SIZE = 1.5

export class BlackKeyThreeJs extends PianoKey {
    constructor(note: string, octave: number) {
        super(note, octave, new Mesh());

        this.baseY = 1
        this.keyDownAnimationTo = { yPos: 0.5, zRot: 0.08 }

        this.model.geometry = new BoxGeometry(BLACK_KEY_X_SIZE, BLACK_KEY_Y_SIZE, BLACK_KEY_Z_SIZE);
        this.model.material = new MeshStandardMaterial({ color: '#222' });
    }
}
