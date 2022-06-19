import { Piano } from '@tonejs/piano';

export const piano = new Piano({
    velocities: 3
    // Increase for more precision when using a MIDI device with weighted keys.
    // Keyboard and mouse controls will only use one velocity
})

piano.toDestination()

// TODO: show loading screen until the sound is loaded
piano.load()