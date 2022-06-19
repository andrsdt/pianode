import { Pane } from 'tweakpane';
import { changeActivePiano } from '../piano/active-piano-handler';
import { cameraControls, changeToCamera } from './camera';

const gui = new Pane();

export const pianoFolder = gui.addFolder({
    title: 'Piano',
});

pianoFolder.addButton({
    title: 'Realistic piano'
}).on('click', () => changeActivePiano('pianoBlender'));

pianoFolder.addButton({
    title: 'Low-poly piano'
}).on('click', () => changeActivePiano('pianoThreeJs'));


export const cameraFolder = gui.addFolder({
    title: 'Camera',
});

cameraFolder.addButton({
    title: 'Free camera'
}).on('click', () => cameraControls.enabled = true);

cameraFolder.addButton({
    title: 'Perspective camera (top)'
}).on('click', () => changeToCamera('top'));

cameraFolder.addButton({
    title: 'Perspective camera (tilted)'
}).on('click', () => changeToCamera('tilted'));

cameraFolder.addButton({
    title: 'Perspective camera (side)'
}).on('click', () => changeToCamera('side'));

export default gui;