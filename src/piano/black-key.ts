import { BoxGeometry, MeshStandardMaterial } from "three";
import { PianoKey } from "./piano-key";

const BLACK_KEY_X_SIZE = 7
const BLACK_KEY_Y_SIZE = 3
const BLACK_KEY_Z_SIZE = 1.5

export class BlackKey extends PianoKey {
    constructor(note: string, octave: number) {
        super(note, octave);
        this.model.geometry = new BoxGeometry(BLACK_KEY_X_SIZE, BLACK_KEY_Y_SIZE, BLACK_KEY_Z_SIZE);
        this.model.material = new MeshStandardMaterial({ color: '#222' });
        this.baseY = 1;
    }
}