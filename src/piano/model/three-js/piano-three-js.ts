import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";
import { Key } from "../../../types/key";
import { BlackKey } from "../../black-key";
import { Piano } from "../../piano";
import { WhiteKey } from "../../white-key";

const SPACE_BETWEEN_WHITE_KEYS = 2.25

const WHITE_KEY_X_SIZE = 13
const WHITE_KEY_Y_SIZE = 3
const WHITE_KEY_Z_SIZE = 3

const BLACK_KEY_X_SIZE = 7
const BLACK_KEY_Y_SIZE = 3
const BLACK_KEY_Z_SIZE = 1.5

export class PianoThreeJs extends Piano {
    private whiteKeyOffset;

    constructor({ from, to }: { from: Key, to: Key }) {
        super();
        this.whiteKeyOffset = 0;
        this.createKeys(from, to);
    }

    createKeys(from: Key, to: Key) {
        const keys = this.getKeyRange(from, to);
        for (const key of keys) {
            this.isBlackNote(key.note) ?
                this.generateBlackKey(key) :
                this.generateWhiteKey(key);
        }
        this.generateRedFeltStrip();
    }

    generateWhiteKey = (k: Key) => {
        const { note, octave } = k;
        const key = new WhiteKey(note, octave);
        const offset = key.model.scale.z + SPACE_BETWEEN_WHITE_KEYS;
        key.model.geometry = new BoxGeometry(WHITE_KEY_X_SIZE, WHITE_KEY_Y_SIZE, WHITE_KEY_Z_SIZE);
        key.model.material = new MeshStandardMaterial({ color: '#fff' });
        key.model.translateZ(this.whiteKeyOffset + offset);
        key.baseY = 0;

        this.whiteKeyOffset += offset;
        this.keys.push(key);
        this.model.add(key.model);
    }

    generateBlackKey = (k: Key) => {
        const { note, octave } = k
        const key = new BlackKey(note, octave);
        key.model.geometry = new BoxGeometry(BLACK_KEY_X_SIZE, BLACK_KEY_Y_SIZE, BLACK_KEY_Z_SIZE);
        key.model.material = new MeshStandardMaterial({ color: '#222' });
        key.model.translateX(key.model.scale.x * 2.5);
        key.model.translateY(key.model.scale.y);
        key.model.translateZ(this.whiteKeyOffset + 1.5);
        key.baseY = 1;

        this.keys.push(key);
        this.model.add(key.model);
    }

    generateRedFeltStrip = () => {
        const firstKey = this.keys[0].model;
        const lastKey = this.keys[this.keys.length - 1].model;
        const strip = new Mesh(
            new BoxGeometry(lastKey.position.z * .998, 0.5, 0.5),
            new MeshBasicMaterial({ color: 0x880000 })
        )
        strip.position.set(firstKey.position.z * 1.925, 1.75, this.getCenterPosition().z);
        strip.rotateY(Math.PI / 2);
        this.model.add(strip);
    }
}
