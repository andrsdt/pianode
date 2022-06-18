import { Piano } from '@tonejs/piano';

export const piano = new Piano({
    velocities: 5
})

piano.toDestination()

// TODO: show loading screen until the sound is loaded
await piano.load()