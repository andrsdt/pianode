import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import { Key } from "../../../types/key";
import { Piano } from "../../piano";
import { BlackKeyThreeJs } from "./black-key-three-js";
import { WhiteKeyThreeJs } from "./white-key-three-js";

const SPACE_BETWEEN_WHITE_KEYS = 2.25

export class PianoThreeJs extends Piano {
    private whiteKeyOffset;

    constructor({ from, to }: { from: Key, to: Key }) {
        super();
        this.whiteKeyOffset = 0;
        this.createKeys(from, to);
        this.generateRedFeltStrip();
    }

    createKeys(from: Key, to: Key) {
        const keys = this.getKeyRange(from, to);
        for (const key of keys) {
            this.isBlackNote(key.note) ?
                this.generateBlackKey(key) :
                this.generateWhiteKey(key);
        }
    }

    generateWhiteKey = (k: Key) => {
        const { note, octave } = k;
        const key = new WhiteKeyThreeJs(note, octave);
        const offset = key.model.scale.z + SPACE_BETWEEN_WHITE_KEYS;

        key.model.translateZ(this.whiteKeyOffset + offset);
        this.whiteKeyOffset += offset;

        this.keys.push(key);
        this.model.add(key.model);
    }

    generateBlackKey = (k: Key) => {
        const { note, octave } = k
        const key = new BlackKeyThreeJs(note, octave);

        key.model.translateX(key.model.scale.x * 2.5);
        key.model.translateY(key.model.scale.y);
        key.model.translateZ(this.whiteKeyOffset + 1.5);

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

export const pianoThreeJs = new PianoThreeJs({ from: { note: 'A', octave: 0 }, to: { note: 'C', octave: 8 } })