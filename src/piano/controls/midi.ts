import webmidi from "webmidi";
import { Key } from "../../types/key";
import { pressKey, releaseKey } from './controller';

webmidi.enable((err) => {
    if (err) {
        console.log("WebMIDI not available");
    } else {
        console.log("WebMIDI available");
        const input = webmidi.inputs[0];
        input.addListener('noteon', 'all', (e) => {
            const key: Key = { note: e.note.name, octave: e.note.octave }
            pressKey(key, e.velocity);
        });

        input.addListener('noteoff', 'all', (e) => {
            const key: Key = { note: e.note.name, octave: e.note.octave }
            releaseKey(key);
        });
    }
});