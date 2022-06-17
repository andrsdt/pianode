import { Piano } from '@tonejs/piano';

export const piano = new Piano({
    velocities: 5
})

piano.toDestination()

piano.load().then(() => {
    console.log('loaded toneJs')
});