import webmidi from "webmidi";
import { Key } from "../../types/key";
import { pressKey, pressPedal, releaseKey, releasePedal } from './controller';

const setupWebmidi = () => {
    const input = webmidi.inputs[0];

    input.addListener('noteon', 'all', (e) => {
        const key: Key = { note: e.note.name, octave: e.note.octave }
        pressKey(key, e.velocity);
    });

    input.addListener('noteoff', 'all', (e) => {
        const key: Key = { note: e.note.name, octave: e.note.octave }
        releaseKey(key);
    });

    // Handle pedal events. not supported by the webmidi library
    input.addListener('midimessage', 'all', (e) => {
        const firstByte = e.data[0]
        // Ignore no-op midi codes
        if ([0xF8, 0xFE].includes(firstByte)) return;

        const secondByte = e.data[1]
        // Sustain pedal messages look like [0xB0, 0x40, 0x00]
        if (firstByte === 0xB0 && secondByte === 0x40) {
            // Third byte determines the pedal state (0 = up, 127 = down)
            const thirdByte = e.data[2]
            if (thirdByte == 0x7F) pressPedal();
            if (thirdByte == 0x00) releasePedal();
        }
    })
}

webmidi.enable((err) => {
    if (err) {
        console.log("WebMIDI not available");
    } else {
        setupWebmidi();
    }
})
