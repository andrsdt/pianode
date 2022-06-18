import { EventDispatcher, Group } from 'three';
import { Key } from '../types/key';
import { PianoKey } from './piano-key';

export abstract class Piano extends EventDispatcher {
    keys: PianoKey[]
    model: Group;

    public constructor() {
        super();
        this.keys = [];
        this.model = new Group();
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

    isBlackNote = (note: string) => note.endsWith("#");

    getCenterPosition = () => {
        const firstKey = this.keys[0].model;
        const lastKey = this.keys[this.keys.length - 1].model;
        return firstKey.position.clone().add(lastKey.position).multiplyScalar(0.5);
    }

    keyDown = (key: Key, velocity = 1) => {
        const keyToPress = this.keys.find(k => k.key.note === key.note && k.key.octave === key.octave);
        if (keyToPress) {
            this.dispatchEvent({ type: "keydown", key: keyToPress });
            keyToPress.keyDown(velocity);
        }
    }

    keyUp = (key: Key) => {
        const keyToRelease = this.keys.find(k => k.key.note === key.note && k.key.octave === key.octave);
        if (keyToRelease) {
            this.dispatchEvent({ type: "keyup", key: keyToRelease });
            keyToRelease.keyUp();
        }
    }
}
