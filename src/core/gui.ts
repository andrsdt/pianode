import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import { Pane } from 'tweakpane';

export const gui = new Pane();
gui.registerPlugin(EssentialsPlugin);

export const fpsGraph = gui.addBlade({
    view: 'fpsgraph',
    label: 'FPS',
})
