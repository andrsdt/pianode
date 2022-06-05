import { BoxGeometry, MeshStandardMaterial } from "three";
import { PianoKey } from "./piano-key";

const WHITE_KEY_X_SIZE = 13
const WHITE_KEY_Y_SIZE = 3
const WHITE_KEY_Z_SIZE = 3

export class WhiteKey extends PianoKey {
    constructor(note: string, octave: number) {
        super(note, octave);
        this.model.geometry = new BoxGeometry(WHITE_KEY_X_SIZE, WHITE_KEY_Y_SIZE, WHITE_KEY_Z_SIZE)
        this.model.material = new MeshStandardMaterial({ color: '#fff' })
        this.baseY = 0
    }
}
