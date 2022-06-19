import { Key } from '../../types/key';
import { pressKey, releaseKey } from './controller';

export const bindings: any = {
    'a': { note: 'C', octave: 4 },
    'w': { note: 'C#', octave: 4 },
    's': { note: 'D', octave: 4 },
    'e': { note: 'D#', octave: 4 },
    'd': { note: 'E', octave: 4 },
    'f': { note: 'F', octave: 4 },
    't': { note: 'F#', octave: 4 },
    'g': { note: 'G', octave: 4 },
    'y': { note: 'G#', octave: 4 },
    'h': { note: 'A', octave: 4 },
    'u': { note: 'A#', octave: 4 },
    'j': { note: 'B', octave: 4 },
    'A': { note: 'C', octave: 5 },
    'W': { note: 'C#', octave: 5 },
    'S': { note: 'D', octave: 5 },
    'E': { note: 'D#', octave: 5 },
    'D': { note: 'E', octave: 5 },
    'F': { note: 'F', octave: 5 },
    'T': { note: 'F#', octave: 5 },
    'G': { note: 'G', octave: 5 },
    'Y': { note: 'G#', octave: 5 },
    'H': { note: 'A', octave: 5 },
    'U': { note: 'A#', octave: 5 },
    'J': { note: 'B', octave: 5 }
}
// TODO: handle sustain with spacebar too

window.addEventListener('keydown', (event: KeyboardEvent) => {
    const key: Key = bindings[event.key];
    pressKey(key)
});

window.addEventListener('keyup', (event: KeyboardEvent) => {
    const key: Key = bindings[event.key];
    releaseKey(key)
});
