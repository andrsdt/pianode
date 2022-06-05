// https://threejs.org/docs/#api/en/core/Raycaster
import { Raycaster, Vector2 } from "three";
import { scene } from "../../scene/scene";
import { camera } from "../../core/camera";
import { piano as pianoModel } from '../piano'
import { PianoKey } from "../model/piano-key";

const raycaster = new Raycaster();
const pointer = new Vector2();

let selected: PianoKey | undefined = undefined;

const handleMouseMove = (event: MouseEvent) => {
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

window.addEventListener('mousemove', handleMouseMove)
window.addEventListener('mousedown', () => selected?.keyDown())
window.addEventListener('mouseup', () => selected?.keyUp())