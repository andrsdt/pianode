import { Group } from 'three';
import { BlackKey } from './black-key';
import { PianoKey } from './piano-key';
import { WhiteKey } from './white-key';

const SPACE_BETWEEN_WHITE_KEYS = 2.25

class Piano {
    keys: PianoKey[]
    model: Group;
    private whiteKeyOffset;

    constructor() {
        this.keys = [];
        this.model = new Group();
        this.model.translateZ(-80)
        this.whiteKeyOffset = 0;

        let notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
        const allNotes = [...notes, ...notes, ...notes, ...notes, ...notes, ...notes, ...notes, ...notes].slice(0, 88);

        let octave = 1;
        for (const note of allNotes) {
            if (note === "C") octave++;
            this.isWhiteNote(note) ?
                this.generateWhiteKey(note, octave) :
                this.generateBlackKey(note, octave);
        }
    }

    isWhiteNote = (note: string) => note.length === 1;

    generateWhiteKey = (note: string, octave: number) => {
        const key = new WhiteKey(note, octave);
        const offset = key.model.scale.z + SPACE_BETWEEN_WHITE_KEYS;
        key.model.translateZ(this.whiteKeyOffset + offset)
        this.whiteKeyOffset += offset;
        this.keys.push(key);
        this.model.add(key.model);
    }

    generateBlackKey = (note: string, octave: number) => {
        const key = new BlackKey(note, octave);
        key.model.translateX(key.model.scale.x * 2.5);
        key.model.translateY(key.model.scale.y);
        key.model.translateZ(this.whiteKeyOffset + 1.5)
        this.keys.push(key);
        this.model.add(key.model);
    }
}

export const piano = new Piano();
