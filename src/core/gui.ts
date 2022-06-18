import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import { Pane } from 'tweakpane';
import { changeActiveCamera } from './camera';

export const gui = new Pane();
gui.registerPlugin(EssentialsPlugin);

export const fpsGraph = gui.addBlade({
    view: 'fpsgraph',
    label: 'FPS',
})

// export const pianoFolder = gui.addFolder({
//     title: 'Piano',
// });

// pianoFolder.addButton({
//     title: 'Low-poly piano'
// }).on('click', () => changeActivePiano('threeJs'));

// pianoFolder.addButton({
//     title: 'Realistic piano'
// }).on('click', () => changeActivePiano('blender'));

export const cameraFolder = gui.addFolder({
    title: 'Camera',
});

cameraFolder.addButton({
    title: 'Perspective camera (top)'
}).on('click', () => changeActiveCamera('perspectiveCameraTop'));

cameraFolder.addButton({
    title: 'Perspective camera (tilted)'
}).on('click', () => changeActiveCamera('perspectiveCameraTilted'));

cameraFolder.addButton({
    title: 'Ortographic camera'
}).on('click', () => changeActiveCamera('ortographicCamera'));

