import webmidi from "webmidi";
import { Key } from "../../types/key";
import { pressKey, releaseKey } from './controller';

const setupWebmidi = () => {
    const input = webmidi.inputs[0];
    if (!input) return;
    input.addListener('noteon', 'all', (e) => {
        const key: Key = { note: e.note.name, octave: e.note.octave }
        pressKey(key, e.velocity);
    });

    input.addListener('noteoff', 'all', (e) => {
        const key: Key = { note: e.note.name, octave: e.note.octave }
        releaseKey(key);
    });
}

webmidi.enable((err) => {
    if (err) {
        console.log("WebMIDI not available");
    } else {
        setupWebmidi();
    }
})
