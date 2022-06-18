import { Piano } from "../piano/piano"
import { scene } from "../scene/scene"
import { pianoBlender } from "./model/blender/piano-blender"
import { pianoThreeJs } from "./model/three-js/piano-three-js"

const availablePianos = { pianoThreeJs, pianoBlender }
export let piano: Piano = pianoThreeJs
scene.add(piano.model)

export const changeActivePiano = (p: 'pianoThreeJs' | 'pianoBlender') => {

    scene.remove(piano.model) // Remove old piano
    piano = availablePianos[p];
    scene.add(piano.model) // Add the new one
    // TODO: create piano on demand here if not existing
}
