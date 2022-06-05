import { BoxGeometry, Group, Mesh, MeshBasicMaterial } from 'three';
import { Key } from '../types/key';
import { BlackKey } from './black-key';
import { PianoKey } from './piano-key';
import { WhiteKey } from './white-key';

const SPACE_BETWEEN_WHITE_KEYS = 2.25

class Piano {
    keys: PianoKey[]
    model: Group;
    private whiteKeyOffset;

    constructor({ from, to }: { from: Key, to: Key }) {
        this.keys = [];
        this.model = new Group();
        this.model.translateZ(-80)
        this.whiteKeyOffset = 0;

        const keys = this.getKeyRange(from, to);
        for (const key of keys) {
            this.isWhiteNote(key.note) ?
                this.generateWhiteKey(key) :
                this.generateBlackKey(key);
        }

        this.generateRedFeltStrip();
    }

    getKeyRange = (fromKey: Key, toKey: Key): Key[] => {
        const result = []
        let currentKey = fromKey;
        while (currentKey.note !== toKey.note || currentKey.octave !== toKey.octave) {
            result.push(currentKey)
            currentKey = this.getNextKey(currentKey);
        }
        result.push(currentKey);
        return result;
    }

    private getNextKey = (key: Key): Key => {
        const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        if (key.note === "B") {
            return { note: "C", octave: key.octave + 1 }
        } else {
            return { note: notes[notes.indexOf(key.note) + 1], octave: key.octave }
        }
    }

    isWhiteNote = (note: string) => note.length === 1;

    generateWhiteKey = (k: Key) => {
        const { note, octave } = k
        const key = new WhiteKey(note, octave);
        const offset = key.model.scale.z + SPACE_BETWEEN_WHITE_KEYS;
        key.model.translateZ(this.whiteKeyOffset + offset)
        this.whiteKeyOffset += offset;
        this.keys.push(key);
        this.model.add(key.model);
    }

    generateBlackKey = (k: Key) => {
        const { note, octave } = k
        const key = new BlackKey(note, octave);
        key.model.translateX(key.model.scale.x * 2.5);
        key.model.translateY(key.model.scale.y);
        key.model.translateZ(this.whiteKeyOffset + 1.5)
        this.keys.push(key);
        this.model.add(key.model);
    }

    generateRedFeltStrip() {
        const firstKey = this.keys[0].model;
        const lastKey = this.keys[this.keys.length - 1].model;
        console.log(firstKey.position, lastKey.position)
        const strip = new Mesh(
            new BoxGeometry(lastKey.position.z, 0.5, 0.5),
            new MeshBasicMaterial({ color: 0x990000 })
        )
        strip.position.set(firstKey.position.z * 2, 1.8, (firstKey.position.z + lastKey.position.z) / 2);
        strip.rotateY(Math.PI / 2);
        this.model.add(strip);

    }
}

export const piano = new Piano({ from: { note: "A", octave: 1 }, to: { note: "C", octave: 7 } });
