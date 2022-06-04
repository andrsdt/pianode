// https://threejs.org/docs/#api/en/core/Raycaster
import { Raycaster, Vector2 } from "three";
import { scene } from "../scene/scene";
import { camera } from "./camera";
import { piano as pianoModel } from '../piano/piano'
import { PianoKey } from "../piano/piano-key";

export const raycaster = new Raycaster();
export const pointer = new Vector2();

let selected: PianoKey | undefined = undefined;

export const handleMouseMove = (event: MouseEvent) => {

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        let intersected = intersects[0].object
        const newSelected = pianoModel.keys.find(k => k.uuid === intersected.uuid);
        if (selected !== newSelected) selected?.keyUp()
        selected = newSelected
    } else {
        selected = undefined
    }
}

window.addEventListener('mousedown', () => selected?.keyDown())
window.addEventListener('mouseup', () => selected?.keyUp())